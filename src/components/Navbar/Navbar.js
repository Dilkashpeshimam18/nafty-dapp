import React, { useState } from 'react';

import { useStateContext } from '../../context/index';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus } from 'lucide-react';
import ProfileModal from '../Profile/CreateProfile';
const Navbar = () => {
  const { connectWallet, account, checkProfile, isProfileExists, userData } = useStateContext();
  const navigate = useNavigate();

  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleConnect = async () => {
    await connectWallet();
    const exists = await checkProfile();
    if (!exists) {
      setShowProfileModal(true);
    }
  };
  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-4 border-b border-gray-700 bg-black/40">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="hidden sm:block bg-gray-800 text-gray-300 px-4 py-2 rounded-lg w-1/3 focus:outline-none"
      />

      {/* Right Section */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Connect Wallet */}
        <button
          onClick={handleConnect}
          className="px-3 sm:px-4 py-2 bg-purple-600 text-xs sm:text-sm hover:bg-purple-700 rounded-[10px] whitespace-nowrap"
        >
          {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
        </button>

        {/* Notification Bell */}
        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <img
          src={userData?.image || 'https://i.pravatar.cc/40'}
          alt="user"
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-purple-600 cursor-pointer"
          onClick={() => setShowProfileModal(true)}
        />
      </div>

      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
    </header>
  );
};

export default Navbar;
