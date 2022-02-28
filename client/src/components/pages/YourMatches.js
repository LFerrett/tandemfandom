import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import "./../assets/YourMatches.css";
import ReactDom from "react-dom";

import { GET_ME } from "../../utils/queries";
import { ADD_MATCH } from "../../utils/queries";
import { REMOVE_MATCH } from "../../utils/mutations";

export default function YourMatches() {
  
  const { load, pdata } = useQuery(GET_ME);
  const profile = pdata?.me || {};

  const { loading, data } = useQuery(REMOVE_MATCH);

  const [userData, setUserData] = useState({});

  const userDataLength = Object.keys(userData).length;

  const [updatedMatch, { error }] = useMutation(ADD_FANDOM);
  const handleAddMatch = async (matchId) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await updatedMatch({
        variables: { ...userData },
      });
      setUserData(updatedMatch);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div>
        <h1>Your Matches Page</h1>
        <p>Your Matches Page goes here</p>

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
      <div className="container">
        <h1>{`${profile.name}'s`} Matches Page</h1>
        <div className="container">
          <form action="">
            <div className="row">
              {fandoms.map((fandom, index) => {
                return (
                  <div className="card col-lg-4 col-md-6 col-sm-12" style={{ width: `18rem` }} key={fandom._id}>
                    <img
                      className="card-img-top"
                      src={`${fandom.image}`}
                      alt={`${fandom.name} logo`}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">{fandom.name}</h5>
                      <p className="card-text">{fandom.description}</p>
                      <div className="text-center">
                        <br></br>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}