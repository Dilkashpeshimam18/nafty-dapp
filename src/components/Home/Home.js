import React, { useEffect } from 'react'
import './Home.css'

import { useStateContext } from '../../context';
import NftPost from '../NFTPost/NftPost';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const { account, isProfilExists,
        contract,

        getAllUserTweets,
        checkProfile,

    } = useStateContext()

    useEffect(() => {
        if (contract && account) {
            if (isProfilExists) {
                getAllUserTweets(account);
            } else {
                checkProfile();
                navigate('/create-profile'); // Navigate to /create-profile if profile does not exist
            }
        }
    }, [contract, account, isProfilExists, checkProfile, getAllUserTweets, navigate]);
    return (
        <div >
            {
                account && isProfilExists && <div className='flex'>
                    <NftPost />
                    <NftPost />
                    <NftPost />
                    <NftPost />


                </div>
            }

        </div>
    )
}

export default Home