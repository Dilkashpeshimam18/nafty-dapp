
import { Edit, Copy } from 'lucide-react';
import { useStateContext } from '../../context/index';
import { useEffect, useState } from 'react';
import EditProfileModal from '../Profile/EditProfile';
import PostDetailModal from '../PostDetail/PostDetail';
const LeftSidebar = () => {
  const { userData, getProfile, getAllUserNft, userPosts,selectedUser } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [parsedPosts, setParsedPosts] = useState([]);

  useEffect(() => {
    if (userData?.wallet) {
      getAllUserNft(userData.wallet);
    }
  }, [userData]);

  useEffect(() => {
    getProfile();
  }, []);
   useEffect(() => {
      const loadMetadata = async () => {
        try {
          const postsWithImages = await Promise.all(
            userPosts.map(async (post) => {
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
  
      if (userPosts?.length > 0) {
        loadMetadata();
      }
    }, [userPosts]);
  return (
    <aside className="hidden md:flex w-72 bg-gray-900 border-r border-gray-800  flex-col p-6 overflow-y-auto scrollbar-hide">
      {/* Profile Card */}
      <div className="bg-purple-800/40 h-28 p-4 rounded-2xl mb-6 relative">
        <div className="flex items-center space-x-3">
          <img
        src={(selectedUser?.image || userData?.image) || 'https://i.pravatar.cc/60'}
            alt="profile"
            className="w-[60px] h-[60px] rounded-full border-2 border-white"
          />
          <div>
            <h2 className="font-bold"> {selectedUser?.displayName || userData?.displayName || 'Ali Barin'}</h2>
            <p className="text-[10px] text-gray-200"> @{selectedUser?.userName || userData?.userName || 'alibarin.ir'}</p>
            <span className="bg-purple-700 text-[10px] px-4 py-1 rounded-md mt-2"> Wallet: {(selectedUser?.wallet || userData?.wallet)?.slice(0, 6)}...
          {(selectedUser?.wallet || userData?.wallet)?.slice(-4)}</span>
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="absolute top-3 right-3 bg-black/30 p-2 rounded-lg">
          <Edit size={14} />
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-center mb-6">
        <div>
          <p className="font-bold">24</p>
          <p className="text-xs text-gray-400">Posts</p>
        </div>
        <div>
          <p className="font-bold">1.5k</p>
          <p className="text-xs text-gray-400">Followers</p>
        </div>
        <div>
          <p className="font-bold">381</p>
          <p className="text-xs text-gray-400">Following</p>
        </div>
      </div>

      {/* About */}
      <div className="mb-6">
        <h3 className="font-semibold mb-1">About</h3>
        <p className="text-[13px] text-gray-300">
          {selectedUser?.bio || userData?.bio || 'I work as a designer, but in my free time I like to make funny pictures and videos.'}{' '}
        </p>
        <div className="mt-2 flex flex-wrap gap-1 text-xs text-purple-400">
          <span>#crypto</span>
          <span>#nfts</span>
          <span>#future</span>
          <span>#arts</span>
        </div>
      </div>

      {/* Wallets */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Wallets</h3>
          <button className="text-purple-400 text-xs">Add New Address</button>
        </div>
        <div className="flex items-center justify-between text-xs mb-2 text-gray-400 mb-1">
          <p className="truncate w-52">0x1234x4fd4dwi42ci_vg</p>
          <Copy size={14} className="cursor-pointer text-gray-500 " />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <p className="truncate w-52">0x1234x4fd4dwi42ci_vg</p>
          <Copy size={14} className="cursor-pointer text-gray-500" />
        </div>
      </div>

      {/* Collections */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">My Collections</h3>
          <button className="text-purple-400 text-xs">View All</button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(selectedUser?.posts || parsedPosts)?.length > 0 ? (
            (selectedUser?.posts || parsedPosts).map((post, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedPost({ owner: post.owner, tokenId: Number(post.tokenId) });
                  setIsModalOpen1(true);
                }}
                className="bg-gray-800 p-2 rounded-xl cursor-pointer"
              >
              {
                post.imageUrl &&  <img
                  src={post.imageUrl || 'https://i.pravatar.cc/100?img=20'}
                  alt={post.nftName}
                  className="rounded-lg w-full h-[100px] object-cover"
                />
              }
               
                <p className="text-xs mt-2 truncate">{post.nftName}</p>
                <p className="text-[10px] text-gray-400 mt-1 truncate">
                  {post.owner.slice(0, 6)}...{post.owner.slice(-4)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-xs col-span-2 ">No NFTs found</p>
          )}
        </div>
      </div>
      <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} userData={userData} />
      <PostDetailModal
        isOpen={isModalOpen1}
        onClose={() => setIsModalOpen1(false)}
        owner={selectedPost?.owner}
        tokenId={selectedPost?.tokenId}
      />
    </aside>
  );
};

export default LeftSidebar;
