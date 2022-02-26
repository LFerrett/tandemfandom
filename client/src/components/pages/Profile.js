import React from 'react';
import ReactDom from 'react-dom'
import ImageUploading from 'react-images-uploading'

export default function Profile() {

  const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };


  return (
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
  );
}
