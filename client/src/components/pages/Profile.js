import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import ImageUploading from 'react-images-uploading'
import ReactDom from 'react-dom'


import { GET_ME } from '../../utils/queries';
import { GET_FANDOMS } from '../../utils/queries';
import { ADD_FANDOM } from '../../utils/mutations';


export default function Profile() {
  
  // Daniel's edits 

  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
  
  // Jose's edits
  const { load, pdata } = useQuery(GET_ME);
  const profile = pdata?.me || {};


  const { loading, data } = useQuery(GET_FANDOMS);
  const fandoms = data?.fandoms || []

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

  const [updatedUser, { error }] = useMutation(ADD_FANDOM)
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
  }

  return (
    <div>
        <div>
          <h1>Profile Page</h1>
          <p>
            Profile Page goes here
          </p>

          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
            }) => (
              
              <div className="upload__image-wrapper">
                <button
                  onClick={onImageUpload}
                >
                  Upload your image
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>Remove your image</button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image.data_url} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>Update</button>
                      <button onClick={() => onImageRemove(index)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>
        <div>
        <h1>{`${profile.name}'s`} Profile Page</h1>
        <form action="">
        {fandoms.map((fandom, index) => {
          return (
          <div className="card" style={{width: `18rem`}} key={fandom._id}>
            <img className="card-img-top" src={`${fandom.image}`} alt="fandom logo" />
            <div className="card-body">
              <h5 className="card-title text-center">{fandom.name}</h5>
              <p className="card-text">
                {fandom.description}
              </p>
              <div className="text-center">
                <input
                  type="checkbox"
                  value={`${fandom._id}`}
                  className="btn-check"
                  id="btn-check-outlined"
                  autoComplete="off"
                  // onChange={toggle}
                />
                <label id="label" className="btn btn-outline-primary" htmlFor="btn-check-outlined"
                  >Add</label>
                  <br></br>
              </div>
            </div>
          </div>
          )
        })};
        </form>
      </div>
    </div>
  )
}