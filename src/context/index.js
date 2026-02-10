import React, { useContext, createContext, useState, useEffect } from 'react';
import { Web3 } from 'web3';
import naftyAbi from '../abis/nafty.json';
import profileAbi from '../abis/naftyUser.json';
import socialAbi from '../abis/naftySocial.json';
import CreateProfile from '../components/Profile/CreateProfile';
import MetaMaskModal from '../components/Modal/MetaMaskModal';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [nftName, setNftName] = useState('');
  const [nftDesc, setNftDesc] = useState('');
  const [metaUri, setMetaUri] = useState('');
  const [allPost, setAllPost] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [userData, setUserData] = useState();
  const [isProfilExists, setIsProfileExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [showMetaMaskModal, setShowMetaMaskModal] = useState(false);
  const [isOnCorrectNetwork, setIsOnCorrectNetwork] = useState(false);
  const [networkChecked, setNetworkChecked] = useState(false);

  const naftyAddress = '0xE3bAF9963C7985B3AF72d5Ef27bE7F26f78082Bc';
  const naftyUserAddress = '0x0674A4E225fB87605330610D029e679952333261';
  const naftySocialAddress = '0x64DE3f5347897Ecd175e30Ff6E6a4EefaC6f2694';
  const SEPOLIA_CHAIN_ID = '0xaa36a7';

  let web3 = null;
  let contract = null;
  let profileContract = null;
  let socialContract = null;

  // Initialize web3 and contracts only if ethereum is available
  if (typeof window !== 'undefined' && window.ethereum) {
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(naftyAbi, naftyAddress);
    profileContract = new web3.eth.Contract(profileAbi, naftyUserAddress);
    socialContract = new web3.eth.Contract(socialAbi, naftySocialAddress);
  }

  // Check for MetaMask and network on initial load
  useEffect(() => {
    const initializeProvider = async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        setIsMetaMaskInstalled(true);

        // Check current network
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setIsOnCorrectNetwork(chainId === SEPOLIA_CHAIN_ID);
        } catch (err) {
          console.warn('Error checking network:', err);
          setIsOnCorrectNetwork(false);
        }

        // Listen for chain changes
        const handleChainChanged = (chainId) => {
          setIsOnCorrectNetwork(chainId === SEPOLIA_CHAIN_ID);
          // Reload the page to reinitialize contracts with new network
          if (chainId === SEPOLIA_CHAIN_ID) {
            window.location.reload();
          }
        };

        // Listen for account changes
        const handleAccountsChanged = (accounts) => {
          if (accounts.length === 0) {
            setAccount(null);
          } else {
            setAccount(accounts[0]);
          }
        };

        window.ethereum.on('chainChanged', handleChainChanged);
        window.ethereum.on('accountsChanged', handleAccountsChanged);

        // Cleanup listeners on unmount
        return () => {
          window.ethereum.removeListener('chainChanged', handleChainChanged);
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        };
      } else {
        setIsMetaMaskInstalled(false);
      }
      setNetworkChecked(true);
    };

    initializeProvider();
  }, []);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleOpenProfile = async (wallet) => {
    if (!web3 || !contract || !profileContract) {
      return;
    }

    if (!wallet) {
      console.error('No wallet address provided');
      return;
    }

    // Don't attempt contract calls if not on correct network
    if (!isOnCorrectNetwork) {
      console.warn('Please switch to Sepolia network.');
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const activeAccount = account || accounts[0];

      const profile = await profileContract.methods.getProfile(wallet).call();
      let userProfile = null;

      if (profile && (profile.displayName !== '' || profile[0] !== '')) {
        const cleanProfile = {
          displayName: profile.displayName || profile[0],
          userName: profile.userName || profile[1],
          bio: profile.bio || profile[2],
          image: profile.image || profile[3],
          follower: Number(profile.follower || profile[4]),
          following: Number(profile.following || profile[5]),
          postLength: Number(profile.postLength || profile[6]),
          wallet: wallet,
        };

        userProfile = cleanProfile;
      } else {
        console.warn('Profile not found for:', wallet);
      }

      const posts = await getAllUserNft(wallet); // fetch user's NFTs
      setSelectedUser({
        ...userProfile,
        wallet,
        posts,
      });
    } catch (err) {
      console.error('Error loading user profile:', err);
      // Suppress detailed error logging for network/ABI issues
      if (!err.message?.includes('AbiError')) {
        console.error('Make sure you are connected to Sepolia testnet and the contracts are deployed.');
      }
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window !== 'undefined' && window.ethereum) {
        const accounts = await window.ethereum
          .request({
            method: 'eth_requestAccounts',
          })
          .catch((err) => {
            if (err.code == 4001) {
              console.log('Please connect to Metamask');
            } else {
              console.log(err);
            }
          });
        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } else {
        // MetaMask is not installed, show modal
        setShowMetaMaskModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const switchToSepolia = async () => {
    if (!window.ethereum) {
      console.error('No Ethereum provider detected');
      return;
    }
    try {
      // Sepolia Chain ID = 11155111 (hex: 0xaa36a7)
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }],
      });
    } catch (switchError) {
      // If Sepolia is not added in MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xaa36a7',
                chainName: 'Ethereum Sepolia Testnet',
                rpcUrls: ['https://sepolia.infura.io/v3/YOUR_INFURA_KEY'], // Replace with Infura/Alchemy RPC
                nativeCurrency: {
                  name: 'SepoliaETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });
        } catch (addError) {
          console.error('❌ Failed to add Sepolia:', addError);
        }
      } else {
        console.error('❌ Failed to switch network:', switchError);
      }
    }
  };
  const isOnSepolia = async () => {
    if (!window.ethereum) return false;
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return chainId === '0xaa36a7';
    } catch {
      return false;
    }
  };

  const ensureSepoliaNetwork = async () => {
    if (!window.ethereum) {
      console.error('No Ethereum provider detected');
      return false;
    }
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0xaa36a7') {
        await switchToSepolia();
        // Wait a bit for the network switch to complete
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Verify the switch was successful
        const newChainId = await window.ethereum.request({ method: 'eth_chainId' });
        return newChainId === '0xaa36a7';
      }
      return true;
    } catch (err) {
      console.error('Error ensuring Sepolia network:', err);
      return false;
    }
  };
  const uploadToIPFS = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PUBLIC_PINATA_JWT}`, // create JWT key in Pinata
      },
      body: formData,
    });

    const data = await res.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  };
  const uploadMetadata = async (imageUrl, name, desc) => {
    const metadata = {
      name,
      description: desc,
      image: imageUrl,
    };

    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.REACT_APP_PUBLIC_PINATA_JWT}`,
      },
      body: JSON.stringify(metadata),
    });

    const data = await res.json();
    return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
  };

  const createNftPost = async (e) => {
    e.preventDefault();
    if (!web3 || !socialContract) {
      alert('Please connect your wallet first.');
      return;
    }
    if (!isOnCorrectNetwork) {
      alert('Please switch to Sepolia network to create posts.');
      return;
    }
    try {
      if (nftName.length > 0 && nftDesc.length > 0) {
        setLoading(true);
        const accounts = await web3.eth.getAccounts();
        const dummyMeta = 'https://my-json-server.typicode.com/demo/nft/1';
        let imageUrl = '';
        if (selectedImage) {
          imageUrl = await uploadToIPFS(selectedImage);
        }
        const metadataURI = await uploadMetadata(imageUrl, nftName, nftDesc);
        await socialContract.methods
          .mintShare(nftName, nftDesc, metadataURI)
          .send({ from: accounts[0] })
          .on('transactionHash', (hash) => {
            console.log('Tx hash:', hash);
          })
          .on('receipt', (receipt) => {
            console.log('Tx success:', receipt);
          })
          .on('error', (err) => {
            console.error('Tx error:', err);
          });
        setLoading(false);
        setNftName('');
        setNftDesc('');
        setMetaUri('');
        setSelectedImage(null);

        await getAllUserNft(account);
        await getAllNftPost();
      } else {
        alert('NFT post name & description cannot be empty.');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  const getAllNftPost = async () => {
    if (!web3 || !socialContract || !profileContract) {
      return;
    }

    // Don't attempt contract calls if not on correct network
    if (!isOnCorrectNetwork) {
      console.warn('Please switch to Sepolia network to view posts.');
      setAllPost([]);
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      if (!accounts || accounts.length === 0) {
        console.warn('No account connected');
        return;
      }

      const allNfts = await socialContract.methods.getAllNftPosts().call();

      // Handle empty response
      if (!allNfts || allNfts.length === 0) {
        setAllPost([]);
        return;
      }

      const formatted = await Promise.all(
        allNfts.map(async (nft) => {
          try {
            const profile = await getUserProfile(nft.owner);
            const liked = await socialContract.methods.hasLiked(nft.tokenId, accounts[0]).call();

            return {
              tokenId: Number(nft.tokenId ?? nft[0]?.toString()),
              owner: nft.owner ?? nft[1],
              nftName: nft.nftName ?? nft[2],
              nftDesc: nft.nftDesc ?? nft[3],
              price: Number(nft.price ?? nft[4]?.toString()),
              isListed: nft.isListed ?? nft[5],
              metadataURI: nft.metadataURI ?? nft[6],
              timestamp: Number(nft.timestamp ?? nft[7]?.toString()),
              likes: Number(nft.likes ?? nft[8]?.toString()),
              profile,
              liked,
            };
          } catch (mapErr) {
            console.warn('Error processing NFT:', mapErr);
            return null;
          }
        })
      );

      // Filter out any null entries from failed processing
      const validPosts = formatted.filter((post) => post !== null);
      const sorted = validPosts.sort((a, b) => b.timestamp - a.timestamp);

      setAllPost(sorted);
    } catch (err) {
      console.error('getAllNftPost error:', err);
      // Don't show error in console for ABI errors when not on correct network
      if (err.message?.includes('AbiError') || err.message?.includes('decoding error')) {
        console.warn('Please ensure you are connected to Sepolia testnet.');
      }
      setAllPost([]);
    }
  };

  const getAllUserNft = async (userAddress) => {
    if (!socialContract) {
      console.warn('Social contract not initialized');
      return [];
    }
    try {
      const allNfts = await socialContract.methods.getAllPostsByUser(userAddress).call();
      setUserPosts(allNfts);
      return allNfts;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const listNft = async (tokenId, price) => {
    if (!web3 || !contract) {
      alert('Please connect your wallet first.');
      return;
    }
    try {
      if (!price || parseFloat(price) <= 0) {
        alert('Price must be greater than 0 ETH');
        return;
      }
      await ensureApproval();

      const accounts = await web3.eth.getAccounts();
      await contract.methods.listNftForSale(tokenId, web3.utils.toWei(price, 'ether')).send({ from: accounts[0] });
      alert('Successfully listed Nft');
    } catch (err) {
      console.log(err);
    }
  };
  const unlistNft = async (tokenId) => {
    if (!web3 || !contract) {
      alert('Please connect your wallet first.');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.unlistNft(tokenId).send({ from: accounts[0] });
      alert('Successfully unlisted Nft');
    } catch (err) {
      console.log(err);
    }
  };
  const buyNft = async (tokenId, price) => {
    if (!web3 || !contract) {
      alert('Please connect your wallet first.');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      const valueInWei = web3.utils.toWei(price.toString(), 'ether');

      const allNfts = await contract.methods.buyNft(tokenId).send({ from: accounts[0], value: valueInWei });
      alert('NFT purchased successfully!');

      setUserPosts(allNfts);
    } catch (err) {
      console.log(err);
    }
  };
  const ensureApproval = async () => {
    if (!web3 || !socialContract || !contract) {
      console.warn('Web3 or contracts not initialized');
      return;
    }
    const accounts = await web3.eth.getAccounts();
    const isApproved = await socialContract.methods
      .isApprovedForAll(accounts[0], contract.options.address)
      .call();

    if (!isApproved) {
      await socialContract.methods
        .setApprovalForAll(contract.options.address, true)
        .send({ from: accounts[0] });
      alert('Marketplace approved to transfer your NFTs');
    }
  };

  const checkOwnership = async (owner) => {
    if (!web3) {
      return false;
    }
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]?.toLowerCase() === owner?.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  };

  const likePost = async (tokenId) => {
    if (!web3 || !socialContract) {
      alert('Please connect your wallet first.');
      return;
    }
    try {
      console.log(tokenId);
      const accounts = await web3.eth.getAccounts();

      await socialContract.methods
        .likeNFT(tokenId)
        .send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
          console.log('Tx hash:', hash);
        })
        .on('receipt', (receipt) => {
          console.log('Tx success:', receipt);
        })
        .on('error', (err) => {
          console.error('Tx error:', err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const unlikePost = async (tokenId) => {
    if (!web3 || !socialContract) {
      alert('Please connect your wallet first.');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();

      await socialContract.methods
        .unlikeNFT(tokenId)
        .send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
          console.log('Tx hash:', hash);
        })
        .on('receipt', (receipt) => {
          console.log('Tx success:', receipt);
        })
        .on('error', (err) => {
          console.error('Tx error:', err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchPostDetails = async (owner, tokenId) => {
    if (!web3 || !socialContract) {
      console.warn('Web3 or social contract not initialized');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();

      const nft = await socialContract.methods._getPostByTokenId(owner, tokenId).call();

      const liked = await socialContract.methods.hasLiked(nft.tokenId, accounts[0]).call();

      const formatted = {
        tokenId: Number(nft.tokenId ?? nft[0]?.toString()),
        owner: nft.owner ?? nft[1],
        nftName: nft.nftName ?? nft[2],
        nftDesc: nft.nftDesc ?? nft[3],
        price: Number(nft.price ?? nft[4]?.toString()),
        isListed: nft.isListed ?? nft[5],
        metadataURI: nft.metadataURI ?? nft[6],
        timestamp: Number(nft.timestamp ?? nft[7]?.toString()),
        likes: Number(nft.likes ?? nft[8]?.toString()),
        liked,
      };

      setPost(formatted);
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  const commentOnNft = async (tokenId, comment) => {
    if (!web3 || !socialContract) {
      alert('Please connect your wallet first.');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();

      await socialContract.methods.commentOnNFT(tokenId, comment).send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  };
  const getAllNftComments = async (tokenId) => {
    if (!socialContract) {
      console.warn('Social contract not initialized');
      return;
    }
    try {
      const allComments = await socialContract.methods.getComments(tokenId).call();

      const formatted = await Promise.all(
        allComments.map(async (comment) => {
          const profile = await getUserProfile(comment.commenter); // fetch profile

          return {
            ...comment,
            commenterProfile: profile,
          };
        })
      );

      setAllComments(formatted);
    } catch (err) {
      console.log(err);
    }
  };
  function shortAddress(address, startLength = 6, endLength = 4) {
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  }

  const checkProfile = async () => {
    if (!web3 || !isOnCorrectNetwork) {
      setIsProfileExists(false);
      return false;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      const profile = await getProfile(accounts[0]);

      // if contract returns `undefined` or an empty profile
      if (!profile || !profile.displayName || profile.displayName === '') {
        setIsProfileExists(false);
        return false;
      } else {
        setIsProfileExists(true);
        return true;
      }
    } catch (err) {
      setIsProfileExists(false);
      return false;
    }
  };

  const setProfile = async (name, bio, username, image) => {
    if (!web3 || !profileContract) {
      alert('Please connect your wallet first.');
      return;
    }
    if (!isOnCorrectNetwork) {
      alert('Please switch to Sepolia network.');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      const res = await profileContract.methods.setProfile(name, bio, username, image).send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  };
  const editProfile = async (name, username, bio, image) => {
    if (!web3 || !profileContract) {
      alert('Please connect your wallet first.');
      return;
    }
    if (!isOnCorrectNetwork) {
      alert('Please switch to Sepolia network.');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();
      const res = await profileContract.methods.editProfile(name, username, bio, image).send({ from: accounts[0] });
      getProfile();
    } catch (err) {
      console.log(err);
    }
  };
  const getProfile = async (account) => {
    if (!web3 || !contract || !profileContract) {
      return null;
    }

    // Don't attempt contract calls if not on correct network
    if (!isOnCorrectNetwork) {
      return null;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const activeAccount = account || accounts[0];

      if (!activeAccount) {
        console.warn('No account provided');
        return null;
      }

      const profile = await profileContract.methods.getProfile(activeAccount).call();

      if (profile.displayName !== '' || profile[0] !== '') {
        const cleanProfile = {
          displayName: profile.displayName || profile[0],
          userName: profile.userName || profile[1],
          bio: profile.bio || profile[2],
          image: profile.image || profile[3],
          follower: Number(profile.follower || profile[4]),
          following: Number(profile.following || profile[5]),
          postLength: Number(profile.postLength || profile[6]),
          wallet: activeAccount,
        };

        setUserData(cleanProfile);
        return cleanProfile;
      } else {
        console.warn('Profile not found for:', activeAccount);
        return null;
      }
    } catch (err) {
      // Silently handle errors when on wrong network or contract issues
      return null;
    }
  };

  const getUserProfile = async (address) => {
    if (!profileContract) {
      return null;
    }

    if (!address) {
      return null;
    }

    // Don't attempt contract calls if not on correct network
    if (!isOnCorrectNetwork) {
      return null;
    }

    try {
      const profile = await profileContract.methods.getProfile(address).call();

      // Check if profile has valid data
      if (profile && (profile.displayName || profile[0])) {
        return profile;
      }

      // Return null if profile is empty (user hasn't created profile yet)
      return null;
    } catch (err) {
      // Silently handle errors when on wrong network or contract issues
      return null;
    }
  };

  const followUser = async (userAddress) => {
    if (!web3 || !profileContract) {
      alert('Please connect your wallet first.');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();

      await profileContract.methods.followUser(userAddress).send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  };

  const unfollowUser = async (userAddress) => {
    if (!web3 || !profileContract) {
      alert('Please connect your wallet first.');
      return;
    }
    try {
      const accounts = await web3.eth.getAccounts();

      await profileContract.methods.unfollowUser(userAddress).send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (account && web3 && socialContract && profileContract && isOnCorrectNetwork) {
      getAllNftPost();
    }
  }, [account, isOnCorrectNetwork]);

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
        unfollowUser,
        profileContract,
        userData,
        fetchPostDetails,
        post,
        setPost,
        checkOwnership,
        web3,
        selectedImage,
        setSelectedImage,
        handleOpenProfile,
        selectedUser,
        isMetaMaskInstalled,
        isOnCorrectNetwork,
        ensureSepoliaNetwork,
      }}
    >
      {children}
      <MetaMaskModal
        isOpen={showMetaMaskModal}
        onClose={() => setShowMetaMaskModal(false)}
      />
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
