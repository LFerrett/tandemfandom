import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import Auth from '../../utils/auth';

import { GET_USERS } from "../../utils/queries";
import { ADD_MATCH } from "../../utils/mutations";


export default function Matches() {
  const { loading, data } = useQuery(GET_USERS);
  const users = data?.users || [];

  // const [savedUserIds, setSavedUserIds] = useState(getSavedUserIds());
  const [addMatch] = useMutation(ADD_MATCH)

  const [userData, setUserData] = useState({});

  const handleAddMatch = async (userId) => {

    const userToSave = users.find((userId) => users._id === userId);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addMatch({
        variables: { ...userData },
      });

      Auth.login(data.users.token);

      setUserData([...userData, userToSave.userId]);
      // upon success, remove book's id from localStorage
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <h1>Matches</h1>
      <div className="row" >
      {users.map((user, index) => {
        return (
          <div className="col" key={user._id}>
          <div className="card" style={{ width: `18rem` }}>
            <img
              className="card-img-top"
              src={`${user.image}`}
              alt="users profile"
            />
            <div className="card-body">
              <h5 className="card-title text-center">{user.firstName} {user.lastName}</h5>
              <h6 className="card-text">Fandoms:</h6>
              {user.fandoms.map((fandom) => {
                return (
                  <p className="card-text" key={fandom._id}>{fandom.name}</p>
                );
              })}
              <div className="text-center">
                <button className='btn-block btn-success' onClick={() => handleAddMatch(user._id)}>Add Match</button>
              </div>
            </div>
          </div>
          </div>
          
        );
      })}
      </div>
    </div>
  );
}
