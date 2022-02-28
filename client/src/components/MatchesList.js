import React, { useContext, useState } from 'react';
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth'

import { ADD_MATCH } from "../utils/mutations";

export default function MatchesList({ users, me }) {
  console.log({users}, {me})
  // const [savedUserIds, setSavedUserIds] = useState(getSavedUserIds());
  const [userId, setUserId] = useState();
  
  const [addMatch, {error}] = useMutation(ADD_MATCH)
  
  
  const handleClick = async (matchId) => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addMatch({
        variables: { _id: matchId },
      });

      Auth.login(data.users.token);
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  const unmatchedUsers = users.filter(user => me.matches.map((match, index) => user._id !== match._id ))
  console.log(unmatchedUsers)

  return (
    <div>
      <h1>Matches</h1>
      <div className="row" >
      
      {users.map((user, index) => {
        return (
          <div className="col my-4" key={user._id}>
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
                <button className='btn-block btn-success' type="button" onClick={() => handleClick(user._id)}>Add Match</button>
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
