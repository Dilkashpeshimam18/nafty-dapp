import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { sidebarLinks } from "../../constant";
import { Loader } from "../Loader/Loader";
import { Edit, Copy } from "lucide-react";


const LeftSidebar = () => {
 
return (
   <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col p-6 overflow-y-auto scrollbar-hide">
      {/* Profile Card */}
      <div className="bg-purple-800/40 h-28 p-4 rounded-2xl mb-6 relative">
        <div className="flex items-center space-x-3">
          <img
            src="https://i.pravatar.cc/60"
            alt="profile"
            className="w-[60px] h-[60px] rounded-full border-2 border-white"
          />
          <div>
            <h2 className="font-bold">Ali Barin</h2>
            <p className="text-[10px] text-gray-200">@alibarin.ir</p>
            <span className="bg-purple-700 text-[10px] px-4 py-1 rounded-md mt-2">
              Wallet: 2k
            </span>
          </div>
        </div>
        <button className="absolute top-3 right-3 bg-black/30 p-2 rounded-lg">
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
          I work as a designer, but in my free time I like to make funny
          pictures and videos.
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
          <div className="bg-gray-800 p-2 rounded-xl">
            <img
              src="https://i.pravatar.cc/100?img=12"
              alt="nft"
              className="rounded-lg"
            />
            <p className="text-xs mt-2">NFT name</p>
            <p className="text-[10px] text-gray-400 mt-1">Author name</p>
          </div>
          <div className="bg-gray-800 p-2 rounded-xl">
            <img
              src="https://i.pravatar.cc/100?img=20"
              alt="nft"
              className="rounded-lg"
            />
            <p className="text-xs mt-2">NFT name</p>
            <p className="text-[10px] text-gray-400 mt-1">Author name</p>
          </div>
          <div className="bg-gray-800 p-2 rounded-xl">
            <img
              src="https://i.pravatar.cc/100?img=30"
              alt="nft"
              className="rounded-lg"
            />
            <p className="text-xs mt-2">NFT name</p>
            <p className="text-[10px] text-gray-400 mt-1">Author name</p>
          </div>
          <div className="bg-gray-800 p-2 rounded-xl">
            <img
              src="https://i.pravatar.cc/100?img=40"
              alt="nft"
              className="rounded-lg"
            />
            <p className="text-xs mt-2">NFT name</p>
            <p className="text-[10px] text-gray-400 mt-1">Author name</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
