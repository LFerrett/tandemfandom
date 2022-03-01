import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import { ADD_FANDOM } from "../utils/mutations";
import { REMOVE_FANDOM } from "../utils/mutations";

export default function ProfileForm({ me, fandoms }) {
  const [addFandom] = useMutation(ADD_FANDOM);
  const [removeFandom] = useMutation(REMOVE_FANDOM);

  const [userFandoms, setUserFandoms] = useState(me.fandoms);
  // const [selectedFandoms, setSelectedFandoms] = useState([]);

  //   const handleToggle = ({ target }) =>
  //   setUserFandoms(s => ({ ...s, [target.name]: !s[target.name] }));

  const handleToggle = (e) => {
    const { value } = e.currentTarget;

    let fandomArray;
    // If the existing array includes the ID of the song clicked on, remove it
    // Otherwise, add it to the array
    userFandoms.includes(value)
      ? (fandomArray = userFandoms.filter((fandom) => fandom !== value))
      : (fandomArray = [...userFandoms, value]);
    // Set the array of song IDs in state
    setUserFandoms(fandomArray);

    // this.setUserFandoms(prevState => ({
    // fandoms: {
    //     ...prevState.fandoms,
    //     [name]: !prevState.fandoms[name]
    // }
    // }));
  };

  // const isSelected = (fandomId) => {
  //     if (userFandoms.includes(fandomId)) {
  //         return "false"
  //     } else {
  //         return "true"
  //     }
  // }

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addFandom({
        variables: { fandomsArray: [...userFandoms] },
      });
      console.log(data)

      Auth.login(data.users.token);
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  if (!Auth.loggedIn()) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div className="container">
        <form onSubmit={handleAddSubmit}>
          <div className="row">
            {fandoms.map((fandom, index) => {
              return (
                <div
                  className="card col-lg-4 col-md-6 col-sm-12"
                  style={{ width: `18rem` }}
                  key={fandom._id}
                >
                  <img
                    className="card-img-top"
                    src={`${fandom.image}`}
                    alt={`${fandom.name} logo`}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{fandom.name}</h5>
                    <p className="card-text">{fandom.description}</p>
                    <div className="text-center">
                      <input
                        key={fandom._id}
                        value={fandom._id}
                        type="checkbox"
                        onChange={handleToggle}
                        className="btn-check"
                        checked={userFandoms.includes(fandom._id)}
                        id="btn-check-outlined"
                        autoComplete="off"
                      />
                      {/* <button
                            // type="checkbox"
                            className="btn-check"
                            id="btn-check-outlined"
                            autoComplete="off"
                            onclick="clicked()"
                        />
                        <label id="label" class="btn btn-outline-primary" for="btn-check-outlined"
                            >Add</label> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn-success" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
