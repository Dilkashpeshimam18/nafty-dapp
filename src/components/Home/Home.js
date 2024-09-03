import React, { useState, useEffect } from 'react'
import './Home.css'
import { Web3 } from 'web3';
import contractAbi from '../../abis/abi.json'
import profileAbi from '../../abis/profileAbi.json'
import CreateProfile from '../Profile/CreateProfile';

const Home = () => {
    const [account, setAccount] = useState(null)
    const [tweet, setTweet] = useState('')
    const [allTweets, setAllTweets] = useState([])
    const [isProfilExists, setIsProfileExists] = useState(false)
    const [loading, setLoading] = useState(false)
    const contractAddress = '0xf3B33AD280Ca6C28600377c144D60DeEf9DA9066'
    const profileContractAddress = '0x13e96BE213F3eBDEAaCED9eeaDB1e34795aEA2F5'

    const web3 = new Web3(window.ethereum)

    const contract = new web3.eth.Contract(contractAbi, contractAddress)
    const profileContract = new web3.eth.Contract(profileAbi, profileContractAddress)

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                }).catch((err) => {
                    if (err.code == 4001) {
                        console.log('Please connect to Metamask')
                    } else {
                        console.log(err)
                    }
                })
                setAccount(accounts[0])
                getAllUserTweets(accounts[0])
                await checkProfile();



            } else {
                console.log("No web3 provider  detected")
            }
        } catch (err) {
            console.log(err)
        }

    }

    const createTweet = async (e) => {
        e.preventDefault()
        try {

            if (tweet.length > 0) {
                setLoading(true)
                const accounts = await web3.eth.getAccounts()

                await contract.methods.createTweet(tweet).send({ from: accounts[0] })
                setLoading(false)
                setTweet('')

                await getAllUserTweets(account)

            } else {
                alert('Please write a tweet first!')
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

    const getAllUserTweets = async (userAddress) => {
        try {

            const allTweets = await contract.methods.getAllUserTweets(userAddress).call()
            setAllTweets(allTweets)

        } catch (err) {
            console.log(err)
        }
    }

    const likeTweet = async (id, author) => {
        try {
            const accounts = await web3.eth.getAccounts()

            await contract.methods.likeTweet(id, author).send({ from: accounts[0] })

        } catch (err) {
            console.log(err)
        }
    }
    function shortAddress(address, startLength = 6, endLength = 4) {
        return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
    }

    const checkProfile = async () => {

        const isProfile = await getProfile(account)
        console.log(isProfile,'user profile')

        setIsProfileExists(isProfile)

    }

    const getProfile = async (account) => {
        if (!web3 || !contract || !profileContract) {
            console.error("Web3 or contract not initialized.");
            return;
        }
        try {
            const userProfile = await profileContract.methods.getProfile(account).call()

            return userProfile.displayName;
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (contract && account) {
            if (isProfilExists) {
                getAllUserTweets(account)

            } else {
                checkProfile()
            }
        }
    }, [contract,account,isProfilExists])
    return (
        <div className="container">
            <h1>Twitter DAPP</h1>
            <div className="connect">
                <button onClick={connectWallet} className="connectWalletBtn">Connect Wallet</button>
            </div>
            {
                account ? <div className="userAddress">Connected: {account}</div>
                    : <div className="connectMessage">Please connect your wallet to tweet.</div>
            }

            {
                account &&
                (
                    isProfilExists ? <>
                        <form onSubmit={createTweet} className="tweetForm" >
                            <textarea
                                className="tweetContent"
                                rows="4"
                                placeholder="What's happening?"
                                onChange={(e) => setTweet(e.target.value)}
                            ></textarea
                            ><br />
                            <button className="tweetSubmitBtn" type="submit">{loading ? <div className="spinner"></div> : <>Tweet</>}
                            </button>
                        </form>
                        <div className="tweetsContainer">
                            {
                                allTweets.length != 0 && allTweets?.map((tweet, i) => {
                                    return (
                                        <div key={i} className='tweet'>
                                            <img className='user-icon' src={`https://avatars.dicebear.com/api/human/${tweet.author}.svg`} alt='User Icon' />
                                            <div className='tweet-inner'>
                                                <div class="author">{shortAddress(tweet.author)}</div>
                                                <div class="content">{tweet.content}</div>

                                            </div>
                                            <button className='like-button'>
                                                <i class="far fa-heart"></i>
                                                <span class="likes-count">{tweet.likes}</span>
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </> : <>
                        <CreateProfile checkProfile={checkProfile} profileContract={profileContract} account={account} />
                    </>
                )
            }

        </div>
    )
}

export default Home