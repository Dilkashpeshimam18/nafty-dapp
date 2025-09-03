import React, { useEffect } from 'react'
import './Home.css'
import { useStateContext } from '../../context';
import NftPost from '../NFTPost/NftPost';

const Home = () => {
    const {
        contract,
        getAllNftPost,
    } = useStateContext()

    // useEffect(() => {
    //     if (contract) {
    //         getAllNftPost()
    //     }
    // }, [contract]);
    return (
        <div >
            {
                contract && <div className='flex'>
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