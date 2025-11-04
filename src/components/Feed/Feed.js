import {
  Image as ImageIcon,
  MapPin,
  Smile,
  Link as LinkIcon,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share2,
  MessageSquare,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getResponseFromGemini } from '../../utils/gemini';
import { useStateContext } from '../../context/index';

export default function Feed() {
  //   const [desc, setDesc] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //   const [nftName, setNftName] = useState('');
  const [isOwner, setIsOwner] = useState(false);
  const [parsedPosts, setParsedPosts] = useState([]);

  const [commentLoading, setCommentLoading] = useState({});
  const [posting, setPosting] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [openComments, setOpenComments] = useState({});
  const {
    createNftPost,
    setNftName,
    nftName,
    nftDesc,
    setNftDesc,
    userData,
    getProfile,
    account,
    getAllNftPost,
    allPost,
    likePost,
    unlikePost,
    commentOnNft,
    getAllNftComments,
    allComments,
    setAllPost,
    checkOwnership,
    web3,
    buyNft,
    selectedImage,
    setSelectedImage,
    handleOpenProfile,
  } = useStateContext();
  const [buyingId, setBuyingId] = useState(null);

  const handleGenerateWithAI = async () => {
    try {
      if (nftDesc != '') {
        setLoading(true);
        setAiResponse('');
        const res = await getResponseFromGemini(nftDesc);
        setNftDesc('');
        setAiResponse(res);
        setLoading(false);
      } else {
        alert('Please enter some text or generate with AI before posting.');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const handleOwnership = async (owner) => {
    const isOwner = await checkOwnership(owner);
    if (isOwner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };
  const handleBuyNft = async (tokenId, price) => {
    try {
      setBuyingId(tokenId); // mark this NFT as buying

      await buyNft(tokenId, price);
    } catch (err) {
      console.error('Error buying NFT:', err);
    } finally {
      setBuyingId(null); // reset after finished
    }
  };
  // Open modal when Post clicked
  const handlePostClick = () => {
    if (aiResponse !== '' || nftDesc !== '') {
      setShowModal(true);
    } else {
      alert('Please enter some text or generate with AI before posting.');
    }
  };

  // Confirm NFT name and call createNftPost
  const handleConfirmPost = async (e) => {
    try {
      setPosting(true);
                    setAiResponse('');

      await createNftPost(e, {
        nftName,
        nftDesc: aiResponse !== '' ? aiResponse : nftDesc,
      });
      setShowModal(false);
      setNftName('');
      setNftDesc('');

    } catch (err) {
      console.log(err);
    } finally {
      setPosting(false); // reset after finished
    }
  };

  const handleLike = async (post) => {
    try {
      if (post.liked) {
        await unlikePost(post.tokenId);
        setAllPost((prev) =>
          prev.map((p) => (p.tokenId === post.tokenId ? { ...p, liked: false, likes: p.likes - 1 } : p))
        );
      } else {
        await likePost(post.tokenId);
        setAllPost((prev) =>
          prev.map((p) => (p.tokenId === post.tokenId ? { ...p, liked: true, likes: p.likes + 1 } : p))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCommentSubmit = async (postId) => {
    if (!commentInputs[postId]) return;
    try {
      setCommentLoading((prev) => ({ ...prev, [postId]: true }));
      await commentOnNft(postId, commentInputs[postId]);
      setCommentInputs({ ...commentInputs, [postId]: '' });
      await getAllNftComments(postId);
    } catch (err) {
      console.log(err);
    } finally {
      setCommentLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const toggleComments = async (postId) => {
    const isOpen = openComments[postId];
    if (!isOpen) {
      await getAllNftComments(postId);
    }
    setOpenComments({ ...openComments, [postId]: !isOpen });
  };

  useEffect(() => {
    getProfile();
    getAllNftPost();
  }, []);
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const postsWithImages = await Promise.all(
          allPost.map(async (post) => {
            let imageUrl = '';

            try {
              if (post.metadataURI) {
                const res = await fetch(post.metadataURI);
                const data = await res.json();

                if (data?.image) {
                  imageUrl = data.image.startsWith('ipfs://')
                    ? `https://gateway.pinata.cloud/ipfs/${data.image.replace('ipfs://', '')}`
                    : data.image;
                }
              }
            } catch (err) {
              console.error('Error fetching metadata for token:', post.tokenId, err);
            }

            return { ...post, imageUrl };
          })
        );

        setParsedPosts(postsWithImages);
      } catch (err) {
        console.error('Error loading metadata:', err);
      }
    };

    if (allPost?.length > 0) {
      loadMetadata();
    }
  }, [allPost]);
  return (
    // <section className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto scrollbar-hide">
    //   {/* Post Input */}
    //   <div className="bg-gray-900 rounded-2xl p-4">
    //     {loading && (
    //       <div className="flex items-start space-x-3">
    //         <p className="text-sm text-gray-200 p-5">Generating response...</p>
    //       </div>
    //     )}
    //     {aiResponse != '' && (
    //       <div className="flex items-start space-x-3">
    //         <p className="text-sm text-gray-200 p-5 rounded-xl">{aiResponse}</p>
    //       </div>
    //     )}
    //     <div className="flex items-start space-x-3">
    //       <img
    //         src={userData?.image || 'https://i.pravatar.cc/40?img=1'}
    //         className="w-10 h-10 rounded-full"
    //         alt="profile"
    //       />
    //       <textarea
    //         placeholder="What's on your mind ..."
    //         value={nftDesc}
    //         onChange={(e) => setNftDesc(e.target.value)}
    //         className="flex-1 bg-gray-800 text-sm text-gray-200 resize-none border-none"
    //       />
    //     </div>
    //     {/* Actions */}
    //     {selectedImage && (
    //       <div className="mt-3">
    //         <img
    //           src={URL.createObjectURL(selectedImage)}
    //           alt="preview"
    //           className="rounded-lg w-full h-40 object-contain"
    //         />
    //       </div>
    //     )}
    //     <div className="flex justify-between items-center mt-3">
    //       <div className="flex space-x-4 text-gray-400">
    //         <label className="cursor-pointer hover:text-purple-400">
    //           <ImageIcon size={18} />
    //           <input
    //             type="file"
    //             accept="image/*"
    //             className="hidden"
    //             onChange={(e) => setSelectedImage(e.target.files[0])}
    //           />
    //         </label>{' '}
    //         <MapPin size={18} className="cursor-pointer hover:text-purple-400" />
    //         <Smile size={18} className="cursor-pointer hover:text-purple-400" />
    //         <LinkIcon size={18} className="cursor-pointer hover:text-purple-400" />
    //       </div>

    //       <div className="flex space-x-2">
    //         <button
    //           onClick={handleGenerateWithAI}
    //           className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xs"
    //         >
    //           {loading ? 'Generating...' : '  Generate with AI ✨'}
    //         </button>
    //         <button
    //           onClick={handlePostClick}
    //           className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-xs"
    //         >
    //           Post
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {showModal && (
    //     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    //       <div className="bg-gray-800 p-6 rounded-2xl w-96 relative">
    //         <button
    //           className="absolute top-3 right-3 text-gray-400 hover:text-white"
    //           onClick={() => setShowModal(false)}
    //         >
    //           <X size={18} />
    //         </button>
    //         <h2 className="text-lg font-semibold mb-1">Add NFT Name</h2>
    //         <p className="text-[11px] mb-2">
    //           Nafty is web3 social media app where every post is a NFT. Please enter a NFT name for your post.{' '}
    //         </p>
    //         <input
    //           type="text"
    //           value={nftName}
    //           onChange={(e) => setNftName(e.target.value)}
    //           placeholder="Enter NFT Name"
    //           className="w-full p-2 rounded-lg bg-gray-700 text-white text-sm mb-4"
    //         />
    //         <button
    //           onClick={handleConfirmPost}
    //           disabled={nftName.trim() === ''}
    //           className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm"
    //         >
    //           Confirm & Post
    //         </button>
    //       </div>
    //     </div>
    //   )}

    //   {/* Post Card */}

    //   <div>
    //     {account ? (
    //       parsedPosts?.length > 0 ? (
    //         parsedPosts.map((post, idx) => (
    //           <div key={idx} className="bg-gray-900 rounded-2xl p-4 mb-4">
    //             {/* Header */}
    //             <div className="flex justify-between items-start">
    //               <div className="flex items-center space-x-3 cursor-pointer">
    //                 <img
    //                   src={post.profile?.image || 'https://i.pravatar.cc/40'}
    //                   className="w-10 h-10 rounded-full"
    //                   alt={post.profile?.displayName || 'author'}
    //                   onClick={() => handleOpenProfile(post.owner)}
    //                 />
    //                 <div>
    //                   <h4 onClick={() => handleOpenProfile(post.owner)} className="font-semibold">
    //                     {post.profile?.displayName || post.owner.slice(0, 6) + '...' + post.owner.slice(-4)}
    //                   </h4>
    //                   <p className="text-[10px] text-gray-400">{new Date(post.timestamp * 1000).toLocaleString()}</p>
    //                 </div>
    //               </div>
    //               <div className="flex space-x-2">
    //                 {post?.owner?.toLowerCase() !== account?.toLowerCase() && (
    //                   <button
    //                     onClick={() => handleBuyNft(post.tokenId, post.price)}
    //                     disabled={!post.isListed || buying}
    //                     className={`px-4 py-1 rounded-lg text-[11px] ${
    //                       post.isListed ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-600 cursor-not-allowed'
    //                     }`}
    //                   >
    //                     {buying
    //                       ? 'Purchasing...'
    //                       : post.isListed
    //                       ? `Purchase NFT (${post.price.toString()} ETH)`
    //                       : 'Not Listed'}{' '}
    //                   </button>
    //                 )}
    //               </div>
    //             </div>

    //             {/* Post Content */}
    //             <div className="mt-3">
    //               {post.imageUrl && (
    //                 <img
    //                   src={post.imageUrl}
    //                   alt={post.nftName}
    //                   className="w-full max-h-max object-cover rounded-xl mb-3"
    //                 />
    //               )}
    //               <p className="text-sm text-gray-200 mb-3">
    //                 <span className="font-semibold block mb-1">{post.nftName}</span>
    //                 {post.nftDesc}
    //               </p>
    //             </div>

    //             {/* Reactions */}
    //             <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
    //               <div className="flex items-center space-x-4">
    //                 <button
    //                   onClick={() => handleLike(post)}
    //                   className={`flex items-center space-x-1 ${
    //                     post.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
    //                   }`}
    //                 >
    //                   <Heart
    //                     size={16}
    //                     fill={post.liked ? 'red' : 'none'}
    //                     stroke={post.liked ? 'red' : 'currentColor'}
    //                   />
    //                   <span>{post.likes}</span>
    //                 </button>
    //                 <button
    //                   onClick={() => toggleComments(post.tokenId)}
    //                   className="flex items-center space-x-1 hover:text-purple-400"
    //                 >
    //                   <MessageSquare size={16} /> <span>Comments</span>
    //                 </button>
    //               </div>
    //             </div>

    //             {/* Comments Section */}
    //             {openComments[post.tokenId] && (
    //               <div className="mt-4 space-y-3">
    //                 {/* Input */}
    //                 <div className="flex items-center space-x-3">
    //                   <img src="https://i.pravatar.cc/40?img=22" className="w-9 h-9 rounded-full" alt="user" />
    //                   <input
    //                     type="text"
    //                     placeholder="Write your comment..."
    //                     value={commentInputs[post.tokenId] || ''}
    //                     onChange={(e) =>
    //                       setCommentInputs({
    //                         ...commentInputs,
    //                         [post.tokenId]: e.target.value,
    //                       })
    //                     }
    //                     className="flex-1 bg-gray-800 text-sm text-gray-300 px-3 py-2 rounded-lg outline-none"
    //                   />
    //                   <button
    //                     onClick={() => handleCommentSubmit(post.tokenId)}
    //                     className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-xs"
    //                   >
    //                     {commentLoading[post.tokenId] ? 'Posting...' : 'Post'}{' '}
    //                   </button>
    //                 </div>

    //                 {/* Existing Comments */}
    //                 <div className="space-y-2">
    //                   {allComments?.map((c, i) => (
    //                     <div
    //                       key={i}
    //                       className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg text-sm text-gray-300"
    //                     >
    //                       <img
    //                         src={c.commenterProfile?.image || 'https://i.pravatar.cc/40?img=22'}
    //                         className="w-9 h-9 rounded-full"
    //                         alt="user"
    //                       />
    //                       <span className="font-semibold">{c.commenterProfile?.displayName}</span>
    //                       <span className="text-gray-400">: {c.comment}</span>
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         ))
    //       ) : (
    //         <p className="text-gray-400 text-center">No NFTs found</p>
    //       )
    //     ) : (
    //       // Dummy posts if wallet not connected
    //       Array.from({ length: 3 }).map((_, idx) => (
    //         <div key={idx} className="bg-gray-900 rounded-2xl p-4 mb-4">
    //           <div className="flex items-center space-x-3">
    //             <img src={`https://i.pravatar.cc/40?img=${idx + 5}`} className="w-10 h-10 rounded-full" alt="dummy" />
    //             <div>
    //               <h4 className="font-semibold">Demo User {idx + 1}</h4>
    //               <p className="text-[10px] text-gray-400">Just now</p>
    //             </div>
    //           </div>
    //           <div className="mt-3">
    //             <p className="text-sm text-gray-200 mb-3">
    //               <span className="font-semibold block mb-1">Demo NFT #{idx + 1}</span>
    //               This is a sample NFT post. Connect your wallet to see real posts!
    //             </p>
    //           </div>
    //         </div>
    //       ))
    //     )}
    //   </div>
    // </section>
    <section className="flex-1 flex flex-col p-3 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto scrollbar-hide">
      {/* Post Input */}
      <div className="bg-gray-900 rounded-2xl p-3 sm:p-4">
        {loading && (
          <div className="flex items-start space-x-3">
            <p className="text-xs sm:text-sm text-gray-200 p-3 sm:p-5">Generating response...</p>
          </div>
        )}
        {aiResponse !== '' && (
          <div className="flex items-start space-x-3">
            <p className="text-xs sm:text-sm text-gray-200 p-3 sm:p-5 rounded-xl">{aiResponse}</p>
          </div>
        )}

        {/* Input Row */}
        <div className="flex items-start space-x-2 sm:space-x-3">
          <img
            src={userData?.image || 'https://i.pravatar.cc/40?img=1'}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            alt="profile"
          />
          <textarea
            placeholder="What's on your mind ..."
            value={nftDesc}
            onChange={(e) => setNftDesc(e.target.value)}
            className="flex-1 bg-gray-800 text-xs sm:text-sm text-gray-200 resize-none border-none p-2 rounded-lg"
          />
        </div>

        {/* Preview */}
        {selectedImage && (
          <div className="mt-2 sm:mt-3">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="preview"
              className="rounded-lg w-full max-h-40 sm:max-h-60 object-contain"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 gap-2 sm:gap-0">
          <div className="flex space-x-3 sm:space-x-4 text-gray-400 text-sm">
            <label className="cursor-pointer hover:text-purple-400">
              <ImageIcon size={18} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </label>
            <MapPin size={18} className="cursor-pointer hover:text-purple-400" />
            <Smile size={18} className="cursor-pointer hover:text-purple-400" />
            <LinkIcon size={18} className="cursor-pointer hover:text-purple-400" />
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleGenerateWithAI}
              className="bg-gray-700 hover:bg-gray-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs"
            >
              {loading ? 'Generating...' : 'Generate with AI ✨'}
            </button>
            <button
              onClick={handlePostClick}
              className="bg-purple-600 hover:bg-purple-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-xs"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-2xl w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              <X size={18} />
            </button>
            <h2 className="text-lg font-semibold mb-1">Add NFT Name</h2>
            <p className="text-[11px] mb-2">
              Nafty is web3 social media app where every post is a NFT. Please enter a NFT name for your post.{' '}
            </p>
            <input
              type="text"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
              placeholder="Enter NFT Name"
              className="w-full p-2 rounded-lg bg-gray-700 text-white text-sm mb-4"
            />
            <button
              onClick={handleConfirmPost}
              disabled={nftName.trim() === ''}
              className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm"
            >
              {posting ? 'Posting...' : 'Confirm & Post'}
            </button>
          </div>
        </div>
      )}

      {/* Post Cards */}
      <div>
        {account ? (
          parsedPosts?.length > 0 ? (
            parsedPosts.map((post, idx) => (
              <div key={idx} className="bg-gray-900 rounded-2xl p-3 sm:p-4 mb-4">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer">
                    <img
                      src={post.profile?.image || 'https://i.pravatar.cc/40'}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                      alt={post.profile?.displayName || 'author'}
                      onClick={() => handleOpenProfile(post.owner)}
                    />
                    <div>
                      <h4 onClick={() => handleOpenProfile(post.owner)} className="font-semibold text-sm sm:text-base">
                        {post.profile?.displayName || post.owner.slice(0, 6) + '...' + post.owner.slice(-4)}
                      </h4>
                      <p className="text-[9px] sm:text-[10px] text-gray-400">
                        {new Date(post.timestamp * 1000).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {post?.owner?.toLowerCase() !== account?.toLowerCase() && (
                      <button
                        onClick={() => handleBuyNft(post.tokenId, post.price)}
                        disabled={!post.isListed || buyingId === post.tokenId}
                        className={`px-2 sm:px-4 py-1 rounded-lg text-[10px] sm:text-[11px] ${
                          post.isListed ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-600 cursor-not-allowed'
                        }`}
                      >
                        {buyingId === post.tokenId
                          ? 'Purchasing...'
                          : post.isListed
                          ? `Purchase ${post.price.toString()} ETH`
                          : 'Not Listed'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <div className="mt-3">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.nftName}
                      className="w-full rounded-xl mb-2 sm:mb-3 max-h-60 object-cover"
                    />
                  )}
                  <p className="text-xs sm:text-sm text-gray-200 mb-2 sm:mb-3">
                    <span className="font-semibold block mb-1">{post.nftName}</span>
                    {post.nftDesc}
                  </p>
                </div>

                {/* Reactions */}
                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400 mt-2 sm:mt-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <button
                      onClick={() => handleLike(post)}
                      className={`flex items-center space-x-1 ${
                        post.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart
                        size={14}
                        fill={post.liked ? 'red' : 'none'}
                        stroke={post.liked ? 'red' : 'currentColor'}
                      />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => toggleComments(post.tokenId)}
                      className="flex items-center space-x-1 hover:text-purple-400"
                    >
                      <MessageSquare size={14} /> <span>Comments</span>
                    </button>
                  </div>
                </div>
                {openComments[post.tokenId] && (
                  <div className="mt-4 space-y-3">
                    {/* Input */}
                    <div className="flex items-center space-x-3">
                      <img
                        src={userData?.image || 'https://i.pravatar.cc/40?img=22'}
                        className="w-9 h-9 rounded-full"
                        alt="user"
                      />
                      <input
                        type="text"
                        placeholder="Write your comment..."
                        value={commentInputs[post.tokenId] || ''}
                        onChange={(e) =>
                          setCommentInputs({
                            ...commentInputs,
                            [post.tokenId]: e.target.value,
                          })
                        }
                        className="flex-1 bg-gray-800 text-sm text-gray-300 px-3 py-2 rounded-lg outline-none"
                      />
                      <button
                        onClick={() => handleCommentSubmit(post.tokenId)}
                        className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-xs"
                      >
                        {commentLoading[post.tokenId] ? 'Posting...' : 'Post'}{' '}
                      </button>
                    </div>

                    {/* Existing Comments */}
                    <div className="space-y-2">
                      {allComments?.map((c, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg text-sm text-gray-300"
                        >
                          <img
                            src={c.commenterProfile?.image || 'https://i.pravatar.cc/40?img=22'}
                            className="w-9 h-9 rounded-full"
                            alt="user"
                          />
                          <span className="font-semibold">{c.commenterProfile?.displayName}</span>
                          <span className="text-gray-400">: {c.comment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center text-sm">No NFTs found</p>
          )
        ) : (
          // Dummy posts
          Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="bg-gray-900 rounded-2xl p-3 sm:p-4 mb-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <img
                  src={`https://i.pravatar.cc/40?img=${idx + 5}`}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                  alt="dummy"
                />
                <div>
                  <h4 className="font-semibold text-sm sm:text-base">Demo User {idx + 1}</h4>
                  <p className="text-[9px] sm:text-[10px] text-gray-400">Just now</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-xs sm:text-sm text-gray-200 mb-2 sm:mb-3">
                  <span className="font-semibold block mb-1">Demo NFT #{idx + 1}</span>
                  This is a sample NFT post. Connect your wallet to see real posts!
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
