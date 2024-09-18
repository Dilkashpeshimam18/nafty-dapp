//SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract NaftyUser {
    struct UserProfile {
        string displayName;
        string userName;
        string bio;
        string image;
        uint256 follower;
        uint256 following;
        uint256 postLength;
    }

    mapping(address => UserProfile) public profiles;

    // Mapping to keep track of which addresses follow which users
    mapping(address => mapping(address => bool)) public followers;

    function setProfile(
        string memory displayname,
        string memory bio,
        string memory username,
        string memory image
    ) public {
        profiles[msg.sender] = UserProfile(
            displayname,
            username,
            bio,
            image,
            0,
            0,
            0
        );
    }

    function editProfile(
        string memory name,
        string memory username,
        string memory bio,
        string memory image
    ) public {
        UserProfile storage profile = profiles[msg.sender];
        if (bytes(name).length > 0) {
            profile.displayName = name;
        }
        if (bytes(username).length > 0) {
            profile.userName = username;
        }
        if (bytes(bio).length > 0) {
            profile.bio = bio;
        }
        if (bytes(image).length > 0) {
            profile.image = image;
        }
    }

    function getProfile(address user) public view returns (UserProfile memory) {
        return profiles[user];
    }

    function followUser(address _userToFollow) public {
        require(_userToFollow != msg.sender, "You cannot follow yourself");
        require(
            !followers[msg.sender][_userToFollow],
            "You're already following this user"
        );

        profiles[_userToFollow].follower += 1;
        profiles[msg.sender].following += 1;

        followers[msg.sender][_userToFollow] = true;
    }

    function unfollowUser(address _userToUnfollow) public {
        require(_userToUnfollow != msg.sender, "You cannot unfollow yourself");
        require(
            followers[msg.sender][_userToUnfollow],
            "You're not following this user"
        );

        profiles[_userToUnfollow].follower -= 1;
        profiles[msg.sender].following -= 1;

        followers[msg.sender][_userToUnfollow] = false;
    }
}
