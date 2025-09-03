import React, { useState, useEffect, useRef } from "react";
import "./Register.css";
import Avatar from "@mui/material/Avatar";
import { useStateContext } from "../../context";
import { useNavigate } from 'react-router-dom';

const Register = ({useraddress}) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
 const [username,setUsername]=useState('')
  const [imageAsFile, setImageAsFile] = useState("");
 const inputRef = useRef(null);
 const {setProfile}=useStateContext()
 const navigate = useNavigate()

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const createProfile=async()=>{
    try{
      if(name.length !=0 && bio.length!=0 && username.length!=0 && imageAsFile){
        const image=URL.createObjectURL(imageAsFile)
        await setProfile(name,bio,username,image)
        setName('')
        setBio('')
        setUsername('')
        setImageAsFile('')
        navigate('/')
      }else{
        alert("Please enter the remaining data")
      }
      

    }catch(err){
      console.log(err)
    }
  }

  return (
    <div style={{ backgroundColor: "white", borderRadius:'15px' }} className="editProfile">
   
        <>
        <div className="editProfile__container2">
        <Avatar
          alt="image tag"
          src={imageAsFile ? URL.createObjectURL(imageAsFile) : null}
          className="avatar__img"
          sx={{ width: 250, height: 250 }}
        />

        <input
          className="img__input"
          onChange={handleImageAsFile}
          type="file"
          ref={inputRef}
        />
        <button
          onClick={() => {
            inputRef.current.click();
          }}
          className="profile__button"
        >
          Add profile picture
        </button>
      </div>
          <div className="editProfile__container1">
            <h1 style={{ color: "black" }} className="editProfile__text">
              Create Profile
            </h1>
            <div className="form">
              <form>
              <div className="form__content">
              <h4 style={{ color: "black" }} className="form__text">
                Username
              </h4>
              <input
                style={{ backgroundColor: "#e6e6e6", color: "black" }}
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                className="form__input"
                required
              />
            </div>
                <div className="form__content">
                  <h4 style={{ color: "black" }} className="form__text">
                    Display Name
                  </h4>
                  <input
                    style={{ backgroundColor: "#e6e6e6", color: "black" }}
                    value={name}
                    onChange={handleName}
                    className="form__input"
                    required
                  />
                </div>

                <div className="form__content">
                  <h4 style={{ color: "black" }} className="form__text">
                    Bio
                  </h4>
                  <input
                    style={{ backgroundColor: "#e6e6e6", color: "black" }}
                    value={bio}
                    onChange={handleBio}
                    className="form__input"
                    required
                  />
                </div>
                
              </form>

              <div className="form__verification">
                <button onClick={createProfile} className="editProfile__button">
                   Create
                </button>
              </div>
            </div>
          </div>
      
        </>

    </div>
  );
};

export default Register;