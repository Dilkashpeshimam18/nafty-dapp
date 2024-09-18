import React from 'react'
import thirdweb from '../../assets/thirdweb.png'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const NftPost = () => {
    return (
        <div className="sm:w-[288px] w-full rounded-[15px] bg-white cursor-pointer m-[10px] cursor-pointer" >
            <img src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg" alt="fund" className="w-full h-[158px] object-cover rounded-[15px]" />

            <div className="flex flex-col p-4">

                <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                    <div className="block">
                        <h3 className="font-epilogue font-semibold text-[16px] text-black text-left leading-[26px] truncate">Monkey NFT</h3>
                        <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">Best NFT</p>
                    </div>
                    <div className="flex ">
                       <FavoriteBorderIcon sx={{color:'#808191', fontSize:'16px',cursor:'pointer',marginTop:"4px"}} />
                        <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-black sm:max-w-[120px] truncate">10</p>
                    </div>
                </div>


                <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                    <div className="flex flex-col">
                        <h4 className="font-epilogue font-semibold text-[14px] text-black leading-[22px]">Price - 1 ETH</h4>
                        <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">@dilkash18</p>
                    </div>

                </div>

                <div className="flex items-center mt-[20px] gap-[12px]">
                    <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
                        <img src={thirdweb} alt="user" className="w-1/2 h-1/2 object-contain" />
                    </div>
                    <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-black">0x1dA36a86d6e891366d65c5B0BDb3D1a446D3540D</span></p>
                </div>
            </div>
        </div>
    )
}

export default NftPost