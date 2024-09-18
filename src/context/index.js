
import React, { useContext, createContext, useState, useEffect } from "react";
import { Web3 } from 'web3';
import naftyAbi from '../abis/nafty.json'
import profileAbi from '../abis/naftyUser.json'
import socialAbi from '../abis/naftySocial.json'
import CreateProfile from '../components/Profile/CreateProfile';

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [account, setAccount] = useState(null)
    const [nftName, setNftName] = useState('')
    const [nftDesc, setNftDesc] = useState('')
    const [metaUri, setMetaUri] = useState('')
    const [allPost, setAllPost] = useState([])
    const [userPosts, setUserPosts] = useState([])
    const [allComments, setAllComments] = useState([])
    const [userData, setUserData] = useState()
    const [isProfilExists, setIsProfileExists] = useState(false)
    const [loading, setLoading] = useState(false)

    const naftyAddress='0x584A56E405b3608eFAAAa0936d35cD4f6eEEdba4'
    const naftyUserAddress='0xced1E591D3230415Eb1C4E0c45e7Bc76BaB45D35'
    const naftySocialAddress='0x5D9a52D9a9Be8fF749c99274115cb0B2403c8142'

    const web3 = new Web3(window.ethereum)

    const contract = new web3.eth.Contract(naftyAbi, naftyAddress)
    const profileContract = new web3.eth.Contract(profileAbi, naftyUserAddress)
    const socialContract=new web3.eth.Contract(socialAbi,naftySocialAddress)

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
                getAllNftPost()
                await checkProfile();



            } else {
                console.log("No web3 provider  detected")
            }
        } catch (err) {
            console.log(err)
        }

    }

    const createNftPost = async (e) => {
        e.preventDefault()
        try {

            if (nftName.length > 0 && nftDesc.length > 0) {
                setLoading(true)
                const accounts = await web3.eth.getAccounts()

                await socialContract.methods.mintShare(nftName, nftDesc, metaUri).send({ from: accounts[0] })
                setLoading(false)
                setNftName('')
                setNftDesc('')
                setMetaUri('')


                await getAllUserNft(account)

            } else {
                alert('NFT post name & description cannot be empty.')
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }
    const getAllNftPost = async () => {
        try {

            const allNfts = await socialContract.methods.getAllNftPosts().call()
            setAllPost(allNfts)

        } catch (err) {
            console.log(err)
        }
    }
    const getAllUserNft = async (userAddress) => {
        try {

            const allNfts = await socialContract.methods.getAllPostsByUser(userAddress).call()
            setUserPosts(allNfts)

        } catch (err) {
            console.log(err)
        }
    }


    const listNft = async (tokenId, price) => {
        try {
            const accounts = await web3.eth.getAccounts()
            await contract.methods.listNftForSale(tokenId, price).send({ from: accounts[0] })
            alert('Successfully listed Nft')

        } catch (err) {
            console.log(err)
        }
    }
    const unlistNft = async (tokenId) => {
        try {
            const accounts = await web3.eth.getAccounts()
            await contract.methods.unlistNft(tokenId).send({ from: accounts[0] })
            alert('Successfully unlisted Nft')

        } catch (err) {
            console.log(err)
        }
    }
    const buyNft = async (tokenId) => {
        try {
            const accounts = await web3.eth.getAccounts()
            const allNfts = await contract.methods.buyNft(tokenId).send({ from: accounts[0] })
            setUserPosts(allNfts)

        } catch (err) {
            console.log(err)
        }
    }

    const likePost = async (tokenId) => {
        try {
            const accounts = await web3.eth.getAccounts()

            await socialContract.methods.likeNFT(tokenId).send({ from: accounts[0] })

        } catch (err) {
            console.log(err)
        }
    }
    const unlikePost = async (tokenId) => {
        try {
            const accounts = await web3.eth.getAccounts()

            await socialContract.methods.unlikeNFT(tokenId).send({ from: accounts[0] })

        } catch (err) {
            console.log(err)
        }
    }
    const commentOnNft = async (tokenId, comment) => {
        try {
            const accounts = await web3.eth.getAccounts()

            await socialContract.methods.commentOnNFT(tokenId, comment).send({ from: accounts[0] })

        } catch (err) {
            console.log(err)
        }
    }
    const getAllNftComments = async (tokenId) => {
        try {

            const allComments = await socialContract.methods.getComments(tokenId).call()
            setAllComments(allComments)

        } catch (err) {
            console.log(err)
        }
    }
    function shortAddress(address, startLength = 6, endLength = 4) {
        return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
    }

    const checkProfile = async () => {

        const isProfile = await getProfile(account)
        console.log(isProfile, 'user profile')

        setIsProfileExists(isProfile)

    }
    const setProfile = async (name, bio, username, age, image) => {
        try {
            const accounts = await web3.eth.getAccounts()

            await profileContract.methods.setProfile(name, bio, username, age, image).send({ from: accounts[0] })


        } catch (err) {
            console.log(err)
        }
    }
    const editProfile = async (name, bio, username, age, image) => {
        try {
            const accounts = await web3.eth.getAccounts()

            await profileContract.methods.editProfile(name, bio, username, age, image).send({ from: accounts[0] })


        } catch (err) {
            console.log(err)
        }
    }
    const getProfile = async (account) => {
        if (!web3 || !contract || !profileContract) {
            console.error("Web3 or contract not initialized.");
            return;
        }
        try {
            const userProfile = await profileContract.methods.getProfile(account).call()
            setUserData(userProfile)
            return userProfile.displayName;
        } catch (err) {
            console.log(err)
        }
    }

    const followUser = async (userAddress) => {
        try {
            const accounts = await web3.eth.getAccounts()

            await profileContract.methods.followUser(userAddress).send({ from: accounts[0] })


        } catch (err) {
            console.log(err)
        }
    }

    const unfollowUser = async (userAddress) => {
        try {
            const accounts = await web3.eth.getAccounts()

            await profileContract.methods.unfollowUser(userAddress).send({ from: accounts[0] })


        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (contract && account) {
            getAllNftPost()
        }
    }, [contract, account])

    return (
        <StateContext.Provider
            value={{
                connectWallet,
                createNftPost,
                getAllNftPost,
                getAllUserNft,
                getProfile,
                checkProfile,
                account,
                isProfilExists,
                contract,
                profileContract,
                shortAddress,
                allPost,
                setAllPost,
                allComments,
                userPosts,
                nftName,
                nftDesc,
                metaUri,
                setNftName,
                setNftDesc,
                setMetaUri,
                loading,
                listNft,
                unlistNft,
                buyNft,
                likePost,
                unlikePost,
                commentOnNft,
                getAllNftComments,
                setProfile,
                editProfile,
                followUser,
                unfollowUser
            }}
        >
            {children}
        </StateContext.Provider>
    )

}

export const useStateContext = () => useContext(StateContext)