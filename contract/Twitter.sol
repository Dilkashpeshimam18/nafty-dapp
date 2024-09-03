//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/access/Ownable.sol";
pragma solidity >=0.8.2 <0.9.0;

//interface is a blueprint for profile contract
interface IProfile {
     struct UserProfile{
        string displayName;
        string bio;
    }

    function getProfile(address user) external  view returns (UserProfile memory);
}

contract Twitter is Ownable{

    struct Tweet{
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }
    mapping (address=>Tweet[]) public tweets;
        address[] public allAuthor;

    uint16 public MAX_TWEET_LENGTH=280;

        IProfile profileContract;

    event TweetCreated(uint256 id, address author, string content, uint256 timestamp);
    event TweetLiked(address liker, address tweetAuthor,uint256 tweetId,uint256 newLikesCount);
    event TweetUnliked(address liker, address tweetAuthor,uint256 tweetId,uint256 newLikesCount);

  
  modifier onlyRegistered(){
    IProfile.UserProfile memory user=profileContract.getProfile(msg.sender);
    require(bytes(user.displayName).length > 0, "User not registered!");
    _;

  }
    constructor(address _profileContract) Ownable(msg.sender){
     profileContract= IProfile(_profileContract);
      }

    function createTweet(string memory _tweet) public onlyRegistered{

        require(bytes(_tweet).length<=MAX_TWEET_LENGTH,"Tweet should be less than 280 character");

        Tweet memory newTweet=Tweet({
            id:tweets[msg.sender].length,
            author:msg.sender,
            content:_tweet,
            timestamp:block.timestamp,
            likes:0
        });
        if(tweets[msg.sender].length==0){
             allAuthor.push(msg.sender);
        }
       tweets[msg.sender].push(newTweet);

        emit TweetCreated(tweets[msg.sender].length, msg.sender, _tweet, block.timestamp);
    }

    function getTweet(address _owner,uint _i) public view returns(Tweet memory){
       return tweets[_owner][_i];
    }

    function getAllUserTweets(address _owner) public view returns (Tweet[] memory){
        return tweets[_owner];
    }

     function getAllTweet() public view returns (Tweet[] memory) {

    uint256 totalTweet=0;

    for(uint256 i=0;i<allAuthor.length;i++){
      totalTweet += tweets[allAuthor[i]].length;
    }

    Tweet[] memory allTweets=new Tweet[](totalTweet);

    uint currIdx=0;

    for(uint i=0; i<allAuthor.length;i++){
      Tweet[] memory userTweet=tweets[allAuthor[i]];

      for(uint j=0;j<userTweet.length;j++){
        allTweets[currIdx] =userTweet[j];
        currIdx++;
      }
    }

    return allTweets;

   }

    function changeTweetLength(uint16 _newTweetLength) public onlyOwner {
        MAX_TWEET_LENGTH=_newTweetLength;
    }

    function likeTweet(uint256 id,address author) external onlyRegistered {
        require(tweets[author][id].id==id,"Tweet does not exists!");
        tweets[author][id].likes++;
        emit TweetLiked(msg.sender, author, id, tweets[author][id].likes);

    }
     function unlikeTweet(uint256 id,address author) external onlyRegistered{
        require(tweets[author][id].id==id,"Tweet does not exists!");
        uint256 totalLike=tweets[author][id].likes;
        require(totalLike>0,"Tweer has no likes");
        tweets[author][id].likes--;

    emit TweetUnliked(msg.sender, author , id, tweets[author][id].likes);
    }

    function getTotalLikes(address author) external view  returns (uint){
      uint totalLikes;

      for (uint i=0;i<tweets[author].length;i++){
        totalLikes +=tweets[author][i].likes;
      }
      return totalLikes;
    }

}