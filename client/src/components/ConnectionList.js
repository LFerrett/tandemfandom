import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

import { REMOVE_MATCH } from "../utils/mutations";

export default function ConnectionList({ users, me }) {
    // console.log({ users }, { me });
    const [matches, setMatches] = useState(me.matches);
    // const [matches, setMatches] = useState(me.matches);
    const [removeMatch] = useMutation(REMOVE_MATCH);
  
    const handleRemoveClick = async (matchId) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        const { data } = await removeMatch({
          variables: { _id: matchId },
        });
  
        setMatches([...matches.filter((match) => match._id !== matchId)]);
  
        Auth.login(data.users.token);
        
        window.location.reload();
      } catch (err) {
        console.error(JSON.parse(JSON.stringify(err)));
      }
    };
    
  
    if (!Auth.loggedIn()) {
      return <Redirect to="/login" />
    };
  
    return (
      <div>
        <h1>Your Connections</h1>
        <div className="row">
          {matches.map((user, index) => {
            return (
              <div className="col my-4" key={user._id}>
                <div className="card" style={{ width: `18rem` }}>
                  <img
                    className="card-img-top"
                    src={`${user.image}`}
                    alt="users profile"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {user.firstName} {user.lastName}
                    </h5>
                    <h6 className="card-text">Fandoms:</h6>
                    {user.fandoms.map((fandom) => {
                      return (
                        <p className="card-text" key={fandom._id}>
                          {fandom.name}
                        </p>
                      );
                    })}
                    <div className="text-center">
                      <button
                        className="btn-block btn-removematch"
                        type="button"
                        onClick={() => handleRemoveClick(user._id)}
                      >
                        Remove Match
                      </button>
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