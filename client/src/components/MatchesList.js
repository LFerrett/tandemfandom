import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

import { ADD_MATCH } from "../utils/mutations";
import { REMOVE_MATCH } from "../utils/mutations";

export default function MatchesList({ users, me }) {
  console.log({ users }, { me });
  const [unMatches, setUnMatches] = useState([]);
  const [matches, setMatches] = useState(me.matches);
  // const [matches, setMatches] = useState(me.matches);

  const [addMatch, { error }] = useMutation(ADD_MATCH);
  // const [removeMatch] = useMutation(REMOVE_MATCH);

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
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  // const handleRemoveClick = async (matchId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const { data } = await removeMatch({
  //       variables: { _id: matchId },
  //     });

  //     setMatches([...matches.filter((match) => match._id !== matchId)]);

  //     Auth.login(data.users.token);
  //   } catch (err) {
  //     console.error(JSON.parse(JSON.stringify(err)));
  //   }
  // };

  useEffect(() => {
    loadMatches();
  }, []);
  
  function loadMatches() {
    const notMeUsers = users.filter((user) => user._id !== me._id);
    console.log(notMeUsers);

    const meMatches = me.matches.map((match) => match._id);
    console.log(meMatches);

    const unmatchedUsers = notMeUsers.filter((user, index) => {
      console.log(meMatches[index]);
      if (meMatches[index] === undefined) {
        return true;
      } else {
        return false;
      }

      
    });
    setUnMatches(unmatchedUsers);
  }
  

  // if (!Auth.loggedIn()) {
  //   return <Redirect to="/login" />
  // };

  return (
    <div>
      <h1>Matches</h1>
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
                  {/* {user.matches.fandoms.map((fandom) => {
                    return (
                      <p className="card-text" key={fandom._id}>
                        {fandom.name}
                      </p>
                    );
                  })} */}
                  <div className="text-center">
                    <button
                      className="btn-block btn-warning"
                      type="button"
                      onClick={() => handleClick(user._id)}
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
      <h1>UnMatches</h1>
      <div className="row">
        {unMatches.map((user, index) => {
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
                      className="btn-block btn-success"
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
