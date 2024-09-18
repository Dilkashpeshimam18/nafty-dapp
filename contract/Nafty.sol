//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

pragma solidity >=0.8.2 <0.9.0;

//interface is a blueprint for profile contract
interface IProfile {
    struct UserProfile {
        string displayName;
        string userName;
        string bio;
        string image;
        uint256 follower;
        uint256 following;
        uint256 postLength;
    }

    function getProfile(address user)
        external
        view
        returns (UserProfile memory);
}

interface ISocial {
    struct NftPost {
        uint256 tokenId;
        address payable owner;
        string nftName;
        string nftDesc;
        uint256 price;
        bool isListed;
        string metadataURI;
        uint256 timestamp;
        uint256 likes;
    }

    function ownerOf(uint256 tokenId) external view returns (address);

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function _getPostByTokenId(address owner, uint256 tokenId)
        external
        view
        returns (NftPost memory);

    function getAllPostsByUser(address user)
        external
        view
        returns (NftPost[] memory);

    function addPost(address newOwner, NftPost memory post) external;

    function removePost(address owner, uint256 tokenId) external;

    function _updatePostListing(
        uint256 tokenId,
        bool isListed,
        uint256 price,
        address owner
    ) external;
}

contract Nafty is ERC721, Ownable {
    IProfile profileContract;
    ISocial socialContract;

    event NFTSold(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );

    modifier onlyRegistered() {
        IProfile.UserProfile memory user = profileContract.getProfile(
            msg.sender
        );
        require(bytes(user.displayName).length > 0, "User not registered!");
        _;
    }

    constructor(address _profileContract, address _socialContract)
        payable
        ERC721("Nafty", "Nafty")
        Ownable(msg.sender)
    {
        profileContract = IProfile(_profileContract);
        socialContract = ISocial(_socialContract);
    }

    function listNftForSale(uint256 tokenId, uint256 price)
        public
        onlyRegistered
    {
        require(socialContract.ownerOf(tokenId) == msg.sender, "Not owner");
        require(price > 0, "Price > 0");
        address owner = msg.sender;

        socialContract._updatePostListing(tokenId, true, price, owner);
    }

    function unlistNft(uint256 tokenId) public {
        require(socialContract.ownerOf(tokenId) == msg.sender, "Not owner");
        address owner = msg.sender;

        socialContract._updatePostListing(tokenId, false, 0, owner);
    }

    function buyNft(uint256 tokenId) public payable onlyRegistered {
        address seller = socialContract.ownerOf(tokenId);
        require(seller != msg.sender, "Cannot buy own NFT");

        require(
            socialContract.isApprovedForAll(seller, address(this)),
            "Nafty contract not approved to transfer this token"
        );

        ISocial.NftPost memory nft = socialContract._getPostByTokenId(
            seller,
            tokenId
        );
        require(nft.isListed, "NFT not listed");
        require(msg.value >= nft.price, "Insufficient funds");
        address buyer = msg.sender;

        nft.owner.transfer(msg.value);
        socialContract.transferFrom(seller, buyer, tokenId);
        _finalizePurchase(seller, buyer, tokenId);

        emit NFTSold(tokenId, buyer, msg.value);
    }

    function _finalizePurchase(
        address seller,
        address buyer,
        uint256 tokenId
    ) internal {
        ISocial.NftPost memory nft = socialContract._getPostByTokenId(
            seller,
            tokenId
        );
        nft.owner = payable(buyer);
        nft.isListed = false;
        socialContract.addPost(buyer, nft);
        socialContract.removePost(seller, tokenId);
    }
}
