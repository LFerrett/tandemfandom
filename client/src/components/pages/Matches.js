import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";

import { GET_USERS } from "../../utils/queries";
import { ADD_MATCH } from "../../utils/mutations";


export default function Matches() {
  const { loading, data } = useQuery(GET_USERS);
  const users = data?.users || [];

  const [match] = useMutation(ADD_MATCH)
  
  // const handleAddMatch = async (userId) => {
  //   const token = Auth.loggedIn() ? Auth.getToken() : null;

  //   if (!token) {
  //     return false;
  //   }

  //   try {
  //     const { data } = await updatedUser({
  //       variables: { ...userData },
  //     });

  //     setUserData(updatedUser);
  //     // upon success, remove book's id from localStorage
  //     removeBookId(bookId);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


  return (
    <div>
      <h1>Matches</h1>
      {users.map((user, index) => {
        return (
          <div className="card" style={{ width: `18rem` }} key={user._id}>
            <img
              className="card-img-top"
              src={`${user.image}`}
              alt="users profile"
            />
            <div className="card-body">
              <h5 className="card-title text-center">{user.firstName} {user.lastName}</h5>
              <p className="card-text">{user.fandoms.name}</p>
              <div className="text-center">
                <button className='btn-block btn-success'>Add Match</button>
              </div>
            </div>
          </div>
        );
      })}
      ;
    </div>
  );
}

// onClick={() => handleAddMatch(user._id)}