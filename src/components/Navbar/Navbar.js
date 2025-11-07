import React, { useState } from 'react';

import { useStateContext } from '../../context/index';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus, Menu } from 'lucide-react';
import ProfileModal from '../Profile/CreateProfile';
import EditProfileModal from '../Profile/EditProfile';
const Navbar = ({ onMenuClick }) => {
  const { connectWallet, account, checkProfile, isProfileExists, userData } = useStateContext();
  const navigate = useNavigate();

  const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const handleConnect = async () => {
    await connectWallet();
    const exists = await checkProfile();
    if (!exists) {
      setShowCreateProfileModal(true);
    }
  };
  return (
    <header className="flex items-center px-4 sm:px-6 py-4 border-b border-gray-700 bg-black/40 gap-4">
      {/* Mobile Menu Button & Logo */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
        >
          <Menu size={20} />
        </button>
        <div style={{ fontFamily: 'monospace' }} className="md:hidden text-white font-bold text-lg">
          NAFTY
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="hidden sm:block bg-gray-800 text-gray-300 px-4 py-2 rounded-lg max-w-md flex-1 focus:outline-none"
      />

      {/* Right Section */}
      <div className="flex items-center space-x-3 sm:space-x-4 ml-auto">
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
          onClick={() => setShowEditProfileModal(true)}
        />
      </div>

      {showCreateProfileModal && <ProfileModal onClose={() => setShowCreateProfileModal(false)} />}
      {showEditProfileModal && <EditProfileModal isOpen={showEditProfileModal} onClose={() => setShowEditProfileModal(false)} userData={userData} />}
    </header>
  );
};

export default Navbar;
