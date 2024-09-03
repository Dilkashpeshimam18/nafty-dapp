import React, { useState, useEffect, useRef } from "react";
import "./Register.css";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";

const Register = ({useraddress}) => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [bio, setBio] = useState("");

  const [email, setEmail] = useState("");
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const inputRef = useRef(null);
 
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };




  return (
    <div style={{ backgroundColor: "white" }} className="editProfile">
   
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
          style={{ display: "none" }}
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
                value={name}
                onChange={handleName}
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

                <div className="form__content">
                  <h4 style={{ color: "black" }} className="form__text">
                    Email
                  </h4>
                  <input
                    style={{ backgroundColor: "#e6e6e6", color: "black" }}
                    value={email}
                    onChange={handleEmail}
                    className="form__input"
                    required
                  />
                </div>
               
              </form>

              <div className="form__verification">
                <button className="editProfile__button">
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