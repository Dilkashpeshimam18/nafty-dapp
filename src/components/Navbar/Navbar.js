import React from 'react'
import CustomButton from '../Button/Button'
import logo from '../../assets/logo.svg';
import menu from '../../assets/menu.svg';
import search from '../../assets/search.svg';
import thirdweb from '../../assets/thirdweb.png';
import { useStateContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { Bell, Plus } from "lucide-react";

const Navbar = () => {
    const {connectWallet,account}=useStateContext()
    const navigate=useNavigate()

    const handleNavigate=()=>{
        navigate('/create-post')
    }
    return (
         <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-black/40">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg w-1/3 focus:outline-none"
      />

      {/* Right Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full">
          <Plus size={18} />
        </button>
        <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="w-9 h-9 rounded-full border-2 border-purple-600"
        />
      </div>
    </header>
    )
}

export default Navbar