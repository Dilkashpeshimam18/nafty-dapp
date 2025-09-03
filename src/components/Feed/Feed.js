import {
  Image as ImageIcon,
  MapPin,
  Smile,
  Link as LinkIcon,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

export default function Feed() {
  return (
    <section className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto scrollbar-hide">
      {/* Post Input */}
      <div className="bg-gray-900 rounded-2xl p-4">
        <div className="flex items-start space-x-3">
          <img
            src="https://i.pravatar.cc/40?img=1"
            className="w-10 h-10 rounded-full"
            alt="profile"
          />
          <textarea
            placeholder="What's on your mind ..."
            className="flex-1 bg-gray-800 text-sm text-gray-200 resize-none border-none"
          />
        </div>
        {/* Actions */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex space-x-4 text-gray-400">
            <ImageIcon size={18} className="cursor-pointer hover:text-purple-400" />
            <MapPin size={18} className="cursor-pointer hover:text-purple-400" />
            <Smile size={18} className="cursor-pointer hover:text-purple-400" />
            <LinkIcon size={18} className="cursor-pointer hover:text-purple-400" />
          </div>
          <div className="flex space-x-2">
            <button className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-xs">
              Generate with AI ✨
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-xs">
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Post Card */}
      <div className="bg-gray-900 rounded-2xl p-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <img
              src="https://i.pravatar.cc/40?img=11"
              className="w-10 h-10 rounded-full"
              alt="author"
            />
            <div>
              <h4 className="font-semibold">Mahdi Gharib</h4>
              <p className="text-[10px] text-gray-400">Thu, Feb 26 – 05:34 PM</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-pink-600 hover:bg-pink-700 text-[11px] px-4 py-1 rounded-lg">
              Buy Nft
            </button>
            <button className="text-gray-400 hover:text-white">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Post Content */}
        <div className="mt-3">
          <p className="text-sm text-gray-200 text-white mb-3">
            <span className="font-semibold block mb-1">
              The Digitalization Alphabet
            </span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper
            eu felis morbi fringilla est fames fusce. Tristique nulla diam elit
            volutpat dui.
          </p>
          <div className="bg-gradient-to-r from-blue-400 to-pink-500 rounded-xl p-20 text-center text-black font-bold text-2xl">
            The Digitalization Alphabet
          </div>
        </div>

        {/* Reactions */}
        <div className="flex justify-between items-center text-sm text-gray-400 mt-4">
          <div className="flex items-center space-x-2">
            <span>❤️ 2k</span>
            <span>💬 23 Comments</span>
            <span>🔄 81 Shares</span>
          </div>
        </div>

        {/* Comment Box */}
        <div className="flex items-center mt-4 space-x-3">
          <img
            src="https://i.pravatar.cc/40?img=22"
            className="w-9 h-9 rounded-full"
            alt="user"
          />
          <input
            type="text"
            placeholder="Write your comment ..."
            className="flex-1 bg-gray-800 text-sm text-gray-300 px-3 py-2 rounded-lg outline-none"
          />
        </div>
      </div>
    </section>
  );
}
