//SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

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

contract NaftySocial is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
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

    struct Comments {
        address commenter;
        string comment;
        uint256 timestamp;
    }
    IProfile profileContract;

    mapping(uint256 => Comments[]) public comments;
    mapping(address => NftPost[]) public allPost;
    mapping(uint256 => mapping(address => bool)) private _likes;
    uint16 public MAX_DESC_LENGTH = 280;

    event NFTLiked(uint256 indexed tokenId, address indexed liker);
    event NFTUnliked(uint256 indexed tokenId, address indexed unliker);
    event NFTCommented(
        uint256 indexed tokenId,
        address indexed commenter,
        string commentText
    );
    event NFTMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string metadataURI
    );
    event NFTListed(
        uint256 indexed tokenId,
        uint256 price,
        address indexed owner
    );
    event NFTUnlisted(uint256 indexed tokenId, address indexed owner);

    constructor(address _profileContract)
        payable
        ERC721("NaftySocial", "NaftySocial")
        Ownable(msg.sender)
    {
        profileContract = IProfile(_profileContract);
    }

    modifier onlyRegistered() {
        IProfile.UserProfile memory user = profileContract.getProfile(
            msg.sender
        );
        require(bytes(user.displayName).length > 0, "User not registered!");
        _;
    }

    function mintShare(
        string memory nftName,
        string memory nftDesc,
        string memory metadataURI
    ) public onlyRegistered returns (uint256) {
        require(
            bytes(nftDesc).length <= MAX_DESC_LENGTH,
            "NFT Description should be less than 280 character"
        );

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);

        NftPost memory newNftPost = NftPost({
            tokenId: newTokenId,
            owner: payable(msg.sender),
            nftName: nftName,
            nftDesc: nftDesc,
            price: 0,
            isListed: false,
            metadataURI: metadataURI,
            timestamp: block.timestamp,
            likes: 0
        });

        allPost[msg.sender].push(newNftPost);

        emit NFTMinted(newTokenId, msg.sender, metadataURI);

        return newTokenId;
    }

    function getAllPostsByUser(address user)
        public
        view
        returns (NftPost[] memory)
    {
        return allPost[user];
    }

    function _getPostByTokenId(address owner, uint256 tokenId)
        public
        view
        returns (NftPost memory)
    {
        NftPost[] storage userPosts = allPost[owner];
        for (uint256 i = 0; i < userPosts.length; i++) {
            if (userPosts[i].tokenId == tokenId) {
                return userPosts[i];
            }
        }
        revert("NFT not found");
    }

    function getAllNftPosts() public view returns (NftPost[] memory) {
        uint256 totalPosts = _tokenIds.current();
        NftPost[] memory allNftPosts = new NftPost[](totalPosts);
        uint256 currentIndex = 0;
        for (uint256 tokenId = 1; tokenId <= totalPosts; tokenId++) {
            address owner = ownerOf(tokenId);
            NftPost[] memory userPosts = allPost[owner];

            for (uint256 i = 0; i < userPosts.length; i++) {
                if (userPosts[i].tokenId == tokenId) {
                    NftPost memory post = userPosts[i];
                    post.price = post.price / 1 ether;
                    allNftPosts[currentIndex] = post;
                    currentIndex++;
                }
            }
        }

        return allNftPosts;
    }

    function addPost(address newOwner, NftPost memory post) external {
        allPost[newOwner].push(post);
    }

    function removePost(address owner, uint256 tokenId) external {
        NftPost[] storage userPosts = allPost[owner];

        require(userPosts.length > 0, "User has no posts");
        // Iterate through the user's posts to find the tokenId
        for (uint256 i = 0; i < userPosts.length; i++) {
            if (userPosts[i].tokenId == tokenId) {
                userPosts[i] = userPosts[userPosts.length - 1];
                userPosts.pop();
                return;
            }
        }
        revert("Post not found");
    }

    function _updatePostListing(
        uint256 tokenId,
        bool isListed,
        uint256 price,
        address owner
    ) public {
        NftPost[] storage userPosts = allPost[owner];
        bool tokenFound = false;
        for (uint256 i = 0; i < userPosts.length; i++) {
            if (userPosts[i].tokenId == tokenId) {
                tokenFound = true;
                userPosts[i].isListed = isListed;
                if (isListed) {
                    userPosts[i].price = price;
                    emit NFTListed(tokenId, price, msg.sender);
                } else {
                    emit NFTUnlisted(tokenId, msg.sender);
                }
                return;
            }
        }

        if (!tokenFound) {
            revert("NFT not found");
        }
    }

    function likeNFT(uint256 tokenId) external onlyRegistered {
        require(!_likes[tokenId][msg.sender], "Already liked");

        _likes[tokenId][msg.sender] = true;

        address owner = ownerOf(tokenId);
        NftPost[] storage userPosts = allPost[owner];

        for (uint256 i = 0; i < userPosts.length; i++) {
            if (userPosts[i].tokenId == tokenId) {
                userPosts[i].likes++;
                break;
            }
        }

        emit NFTLiked(tokenId, msg.sender);
    }

    function unlikeNFT(uint256 tokenId) external onlyRegistered {
        require(_likes[tokenId][msg.sender], "Not liked");

        _likes[tokenId][msg.sender] = false;

        address owner = ownerOf(tokenId);
        NftPost[] storage userPosts = allPost[owner];

        for (uint256 i = 0; i < userPosts.length; i++) {
            if (userPosts[i].tokenId == tokenId) {
                require(userPosts[i].likes > 0, "No likes");
                userPosts[i].likes--;
                break;
            }
        }

        emit NFTUnliked(tokenId, msg.sender);
    }

    function commentOnNFT(uint256 tokenId, string memory commentText)
        public
        onlyRegistered
    {
        require(bytes(commentText).length > 0, "Empty comment");

        comments[tokenId].push(
            Comments({
                commenter: msg.sender,
                comment: commentText,
                timestamp: block.timestamp
            })
        );

        emit NFTCommented(tokenId, msg.sender, commentText);
    }

    function getComments(uint256 tokenId)
        public
        view
        returns (Comments[] memory)
    {
        return comments[tokenId];
    }
}
