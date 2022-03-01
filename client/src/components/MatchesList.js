import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import "./assets/Matches.css";

import { ADD_MATCH } from "../utils/mutations";

export default function MatchesList({ users, me, refetch }) {
  // console.log({ users }, { me });
  const [unMatches, setUnMatches] = useState([]);

  const [addMatch] = useMutation(ADD_MATCH);

  const handleClick = async (matchId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addMatch({
        variables: { _id: matchId },
      });

      setUnMatches([...unMatches.filter((match) => match._id !== matchId)]);

      Auth.login(data.users.token);

      refetch()
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };


  useEffect(() => {
    loadUnMatches();
  }, []);
  
  function loadUnMatches() {
    const notMeUsers = users.filter((user) => user._id !== me._id);
    // console.log(notMeUsers);

    const meMatches = me.matches.map((match) => match._id);
    // console.log(meMatches);

    const unmatchedUsers = notMeUsers.filter((user, index) => {
      // console.log(meMatches[index]);
      if (meMatches[index] === undefined) {
        return true;
      } else {
        return false;
      }

      
    });
    setUnMatches(unmatchedUsers);
  }
  

  if (!Auth.loggedIn()) {
    return <Redirect to="/login" />
  };

  return (
    <div>
      <h1>Potential Matches</h1>
      <div className="row">
        {unMatches.map((user, index) => {
          return (
            <div className="m-3 d-flex flex-row"key={user._id}>
              <div className="card" style={{ width: `18rem`}}>
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
                      className="btn-block btn-addmatch"
                      type="button"
                      onClick={() => handleClick(user._id)}
                    >
                      Add Match
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
