//SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;


contract Profile{
    struct UserProfile{
        string displayName;
        string bio;
    }

    mapping (address=>UserProfile) public profiles;

    function setProfile(string memory name, string memory bio) public {
       profiles[msg.sender]= UserProfile(name,bio);
       
    }

    function getProfile(address user) public view returns (UserProfile memory) {
       return profiles[user];
    }
}