import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import "./../assets/Profile.css";
import ImageUploading from "react-images-uploading";
import ReactDom from "react-dom";
import SimpleFileUpload from 'react-simple-file-upload'

import { GET_ME } from "../../utils/queries";
import { GET_FANDOMS } from "../../utils/queries";
import { ADD_FANDOM } from "../../utils/mutations";

export default function Profile() {
  // Daniel's edits
  const [uploadedImages, setUploadedImages] = useState([])

  function handleFile(url) {
    setUploadedImages([...uploadedImages, url])
    console.log('The URL of the file is ' + url)
  }
  // Jose's edits
  const { load, pdata } = useQuery(GET_ME);
  const profile = pdata?.me || {};

  const { loading, data } = useQuery(GET_FANDOMS);
  const fandoms = data?.fandoms || [];

  const [userData, setUserData] = useState({});
  const [checked, setChecked] = useState({});

  // function toggle(index) {
  //   const newData = [...userData];
  //   newData.splice(index, 1, {
  //     label: data[index].label,
  //     checked: !data[index].checked
  //   });
  //   setData(newData);
  //   onChange(newData.filter(x => x.checked));
  // };

  const userDataLength = Object.keys(userData).length;

  const [updatedUser, { error }] = useMutation(ADD_FANDOM);
  const handleAddFandom = async (fandomId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await updatedUser({
        variables: { ...userData },
      });

      setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      // need to make in local storage js in utils
      // addFandom(fandomId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <h1>Profile Page</h1>
        <p>Profile Page goes here</p>
  
          <SimpleFileUpload
            apiKey="a576e70cb4dce38730545ffcbe16a477"
            onSuccess={handleFile}
          />
        </div>
        <div className='upload-wrapper'>
          <div className="img-landing">
          <ul className="image-grid">
            {uploadedImages.length ? (
              uploadedImages.map((image) => (
                <li>
                  <img className="img-fluid profile-img" src={image} alt="profile images" />
                </li>
              ))
            ) : (
              <p>Uploaded images will appear here</p>
            )}
          </ul>
        </div>
      </div>
      <div>
        <h1>{`${profile.name}'s`} Profile Page</h1>
        <form action="">
          {fandoms.map((fandom, index) => {
            return (
              <div className="card" style={{ width: `18rem` }} key={fandom._id}>
                <img
                  className="card-img-top"
                  src={`${fandom.image}`}
                  alt="fandom logo"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">{fandom.name}</h5>
                  <p className="card-text">{fandom.description}</p>
                  <div className="text-center">
                    <input
                      type="checkbox"
                      value={`${fandom._id}`}
                      className="btn-check"
                      id="btn-check-outlined"
                      autoComplete="off"
                    // onChange={toggle}
                    />
                    <label
                      id="label"
                      className="btn btn-outline-primary"
                      htmlFor="btn-check-outlined"
                    >
                      Add
                    </label>
                    <br></br>
                  </div>
                </div>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );
}
