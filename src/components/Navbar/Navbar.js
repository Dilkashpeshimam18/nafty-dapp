import React from 'react'
import CustomButton from '../Button/Button'
import logo from '../../assets/logo.svg';
import menu from '../../assets/menu.svg';
import search from '../../assets/search.svg';
import thirdweb from '../../assets/thirdweb.png';
import { useStateContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const {connectWallet,account}=useStateContext()
    const navigate=useNavigate()

    const handleNavigate=()=>{
        navigate('/create-post')
    }
    return (
        <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6 mt-4">
            <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-white rounded-[100px]">
                <input type="text" placeholder="Search by username" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264]-text-white text-black bg-transparent outline-none" />

                <div className="w-[72px] h-full rounded-[20px] bg-[#1da1f2] flex justify-center items-center cursor-pointer">
                    <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
                </div>
            </div>

            <div className="sm:flex hidden flex-row justify-end gap-4">
                <CustomButton
                    btnType="button"
                    title="Create Post"
                    styles='createBtn'
                    handleClick={handleNavigate}
                />
                <CustomButton
                    btnType="button"
                    title={account? "Connected":"Connect Wallet"}
                    styles='btn-grad'
                    handleClick={connectWallet}

                />
                <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                    <img onClick={handleNavigate} src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
                </div>

            </div>

            {/* Small screen navigation */}
            <div className="sm:hidden flex justify-between items-center relative">
                <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
                    <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
                </div>

                <img
                    src={menu}
                    alt="menu"
                    className="w-[34px] h-[34px] object-contain cursor-pointer"

                />

                <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4  transition-all duration-700`}>


                    <div className="flex mx-4">
                        <CustomButton
                            btnType="button"
                            title="Connect Wallet"
                            styles="bg-[#8c6dfd]"

                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar