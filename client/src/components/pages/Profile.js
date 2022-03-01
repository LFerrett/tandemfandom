import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import "./../assets/Profile.css";
import ImageUploading from "react-images-uploading";
import ReactDom from "react-dom";
import SimpleFileUpload from 'react-simple-file-upload'
import ProfileForm from "../ProfileForm";

import { GET_ME } from "../../utils/queries";
import { GET_FANDOMS } from "../../utils/queries";

export default function Profile() {

  const [uploadedImages, setUploadedImages] = useState([])

  function handleFile(url) {
    setUploadedImages([...uploadedImages, url])
    console.log('The URL of the file is ' + url)
  }
  
  const { loading: loadingMe, data: profileData } = useQuery(GET_ME);
  const me = profileData?.me || {};

  const { loading, data } = useQuery(GET_FANDOMS);
  const fandoms = data?.fandoms || [];


  return (
    <div>
      <div>
        <h1>{`${me.firstName}'s`} Profile Page</h1>
        <SimpleFileUpload
          apiKey="a576e70cb4dce38730545ffcbe16a477"
          onSuccess={handleFile}
        />

      </div>
      <div className='upload-wrapper'>
        <div className="img-landing">
          <ul className="image-grid">
            {uploadedImages.length ? (
              uploadedImages.map((image, index) => (index === 0 &&
                <li>
                  <img className="img-fluid profile-img" src={image} alt="profile images" />
                </li>
              ))
            ) : (
              <p></p>
            )}
          </ul>
        </div>
      </div>
      {loadingMe ? (
        <div>Loading...</div>
      ) : (
      <ProfileForm me={me} fandoms={fandoms}/>
      )}
    </div>
  );
}
