import React, { useState } from 'react'

const CreateProfile = ({ checkProfile, profileContract, account }) => {
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const createProfile = async (e) => {
    e.preventDefault()
    try {
      if (username.length != 0 && bio.length != 0) {
        setLoading(true)

        await profileContract.methods.setProfile(username, bio).send({ from: account })
        checkProfile();
      } else {
        alert('Please add the username & bio!')
      }

    } catch (err) {
      console.log(err)
    }

  }
  return (
    <div className="container">
      <div className='bg-[#f5f5f5] p-3 rounded-md'>
        <h1 className='text-black'> Welcome to Nafty a NFT Social Media Platform where you can mint, buy, sell & share your Nfts</h1>

      </div>
      {
        account ? <div className="userAddress">Connected: {account}</div>
          : <div className="connectMessage">Please connect your wallet to tweet.</div>
      }
      <h2>Create your profile</h2>
      <form onSubmit={createProfile}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="profile-input"
          />
        </label>
        <label>
          Bio:
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="profile-input"
          />
        </label>
        <button type="submit" className="profile-submit">
          {loading ? <div className="spinner"></div> : <>Create Profile</>}
        </button>
      </form>
    </div>
  )
}

export default CreateProfile