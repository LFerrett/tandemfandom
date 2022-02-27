import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth';

import { GET_ME } from '../../utils/queries';
import { GET_FANDOMS } from '../../utils/queries';
 import { ADD_FANDOM } from '../../utils/mutations';


export default function Profile() {
  
  const { load, pdata } = useQuery(GET_ME);
  const profile = pdata?.me || {};


  const { loading, data } = useQuery(GET_FANDOMS);
  const fandoms = data?.fandoms || []

  const [userData, setUserData] = useState({});
  const [checked, setChecked] = useState({});

  function toggle(index) {
    const newData = [...userData];
    newData.splice(index, 1, {
      label: data[index].label,
      checked: !data[index].checked
    });
    setData(newData);
    onChange(newData.filter(x => x.checked));
  };

  

  
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
  };

  // Add image
  // form with cards of fandoms
  // handle form submit 
 
  
  return (
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
              onChange={toggle}
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
  );
}
