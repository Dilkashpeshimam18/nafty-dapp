import React, { useEffect, useState, useCallback } from 'react';
import { X, Heart } from 'lucide-react';
import { useStateContext } from '../../context/index';

const PostDetailModal = ({ isOpen, onClose, owner, tokenId }) => {
  const {
    fetchPostDetails,
    post,
    commentOnNft,
    getAllNftComments,
    allComments,
    likePost,
    unlikePost,
    getProfile,
    checkOwnership,
    listNft,
    unlistNft,
  } = useStateContext();
  const [newComment, setNewComment] = useState('');
  const [profile, setProfile] = useState();
  const [price, setPrice] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingUnlist, setLoadingUnlist] = useState(false);

  const getUserProfile = useCallback(async () => {
    try {
      const res = await getProfile(owner);
      setProfile(res);
    } catch (err) {
      console.log(err);
    }
  }, [getProfile, owner]);

  const handleOwnership = useCallback(async () => {
    const ownershipResult = await checkOwnership(owner);
    setIsOwner(ownershipResult);
  }, [checkOwnership, owner]);

  useEffect(() => {
    if (isOpen && tokenId && owner) {
      fetchPostDetails(owner, tokenId);
      getAllNftComments(tokenId);
      getUserProfile();
      handleOwnership();
    }
  }, [isOpen, tokenId, owner, fetchPostDetails, getAllNftComments, getUserProfile, handleOwnership]);

  const handleLike = async () => {
    try {
      setLoadingLike(true);

      if (post.liked) {
        await unlikePost(post.tokenId);
        fetchPostDetails(owner, tokenId);
      } else {
        await likePost(post.tokenId);
        fetchPostDetails(owner, tokenId);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingLike(false);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      if (!newComment.trim()) return;
      setLoadingComment(true);

      await commentOnNft(tokenId, newComment);
      setNewComment('');

      await getAllNftComments(tokenId);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingComment(false);
    }
  };


  const handleListNft = async () => {
    try {
      setLoadingList(true);

      await listNft(tokenId, price);
      fetchPostDetails(owner, tokenId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingList(false);
    }
  };

  const handleUnlistNft = async () => {
    try {
      setLoadingUnlist(true);

      await unlistNft(tokenId);
      fetchPostDetails(owner, tokenId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUnlist(false);
    }
  };
  if (!isOpen) return null;
  if (!post) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
        <div className="bg-gray-900 w-[500px] rounded-2xl p-6 text-center text-gray-300">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-gray-900 w-[500px] rounded-2xl p-6 relative">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        {/* Post Header */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={profile?.image || 'https://i.pravatar.cc/40?img=22'}
            alt="author"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-semibold">{post.nftName}</h4>
            <p className="text-xs text-gray-400">{new Date(post.timestamp * 1000).toLocaleString()}</p>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-gray-300 mb-4">{post.nftDesc}</p>

        {/* Likes */}
        <button
          onClick={handleLike}
          disabled={loadingLike}
          className={`flex items-center space-x-1 mb-4 ${
            post.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          } ${loadingLike ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Heart size={18} fill={post.liked ? 'red' : 'none'} stroke={post.liked ? 'red' : 'currentColor'} />{' '}
          <span>{loadingLike ? 'Loading...' : `${post.likes} Likes`}</span>
        </button>
        {isOwner && (
          <div className="mb-4">
            {post?.isListed ? (
              <button onClick={handleUnlistNft} className="bg-pink-600 px-4 py-2 rounded-lg text-white  text-sm">
                {loadingUnlist ? 'Unlisting...' : 'Unlist NFT'}
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Price in ETH"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={0}
                  step="0.01"
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-gray-200 outline-none"
                />
                <button onClick={handleListNft} className="bg-[#1da1f2]  px-4 py-2 rounded-lg text-white text-sm">
                  {loadingList ? 'Listing...' : 'List NFT'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Comments */}
        <div className="max-h-40 overflow-y-auto mb-3">
          {allComments.length > 0 ? (
            allComments.map((c, i) => (
              <div key={i} className="bg-gray-800 p-2 rounded-lg mb-2 text-sm text-gray-200">
                <span className="font-semibold">{c.commenterProfile.displayName}...</span>: {c.comment}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet</p>
          )}
        </div>

        {/* Add Comment */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-gray-200 outline-none"
          />
          <button onClick={handleCommentSubmit} className="bg-purple-600 px-4 py-2 rounded-lg text-white text-sm">
            {loadingComment ? 'Posting...' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
