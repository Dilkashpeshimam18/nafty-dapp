//SPDX-License-Identifier: MIT

pragma solidity >=0.8.2 <0.9.0;

contract Twitter{

    struct Tweet{
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }
    mapping (address=>Tweet[]) public tweets;
    uint16 public MAX_TWEET_LENGTH=280;
    address public owner;
    event TweetCreated(uint256 id, address author, string content, uint256 timestamp);
    event TweetLiked(address liker, address tweetAuthor,uint256 tweetId,uint256 newLikesCount);
    event TweetUnliked(address liker, address tweetAuthor,uint256 tweetId,uint256 newLikesCount);

    constructor(){
        owner=msg.sender;
    }

    modifier onlyOwner(){
      require(msg.sender==owner, "Only the owner of the tweet can change the length");
      _;
    }

    function createTweet(string memory _tweet) public {

        require(bytes(_tweet).length<=MAX_TWEET_LENGTH,"Tweet should be less than 280 character");

        Tweet memory newTweet=Tweet({
            id:tweets[msg.sender].length,
            author:msg.sender,
            content:_tweet,
            timestamp:block.timestamp,
            likes:0
  });
       tweets[msg.sender].push(newTweet);

       emit TweetCreated(tweets[msg.sender].length, msg.sender, _tweet, block.timestamp);
    }

    function getTweet(address _owner,uint _i) public view returns(Tweet memory){
       return tweets[_owner][_i];
    }

    function getAllUserTweets(address _owner) public view returns (Tweet[] memory){
        return tweets[_owner];
    }

    function changeTweetLength(uint16 _newTweetLength) public onlyOwner {
        MAX_TWEET_LENGTH=_newTweetLength;
    }

    function likeTweet(uint256 id,address author) external {
        require(tweets[author][id].id==id,"Tweet does not exists!");
        tweets[author][id].likes++;
        emit TweetLiked(msg.sender, author, id, tweets[author][id].likes);

    }
     function unlikeTweet(uint256 id,address author) external {
        require(tweets[author][id].id==id,"Tweet does not exists!");
        uint256 totalLike=tweets[author][id].likes;
        require(totalLike>0,"Tweer has no likes");
        tweets[author][id].likes--;

        emit TweetUnliked(msg.sender, author , id, tweets[author][id].likes);
    }

}