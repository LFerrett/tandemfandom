import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import './assets/Profileform.css';

import { ADD_FANDOM } from "../utils/mutations";
import { REMOVE_FANDOM } from "../utils/mutations";

export default function ProfileForm({ me, fandoms }) {
  const [addFandom] = useMutation(ADD_FANDOM);
  const [removeFandom] = useMutation(REMOVE_FANDOM);

  const [userFandoms, setUserFandoms] = useState(me.fandoms);
  const [selectedFandoms, setSelectedFandoms] = useState([]);
  const [filteredFandoms, setFilteredFandoms] = useState([]);

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
  };

  const handleClick = async (fandomId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeFandom({
        variables: { _id: fandomId },
      });
      console.log(data);

      window.location.reload();

      setSelectedFandoms([...data.fandoms]);
      Auth.login(data.users.token);
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  // const loadFilteredFandoms = () => {
  //   let filteredFandom = [];
  //   let oneFilter
  //   for (let i = 0; i < userFandoms.length; i++) {
  //     const oneFandom = userFandoms[i];
  //     console.log(oneFandom._id)
  //     oneFilter = fandoms.filter((banana) => banana._id !== oneFandom._id);
  //     filteredFandom.concat(oneFilter)
  //   }
  //   console.log({filteredFandom})

  //   setFilteredFandoms([...filteredFandom]);
  // };

  const handleAddSubmit = async (event) => {
    event.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    let fandomsToSubmit;
    if (userFandoms.length) {
      fandomsToSubmit = userFandoms.map((fandom) => fandom._id || fandom);
    }

    try {
      const { data } = await addFandom({
        variables: { fandomsArray: [...fandomsToSubmit] },
      });
      console.log(data);

      window.location.reload();
      Auth.login(data.users.token);
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  useEffect(() => {
    // loadFilteredFandoms();
    // setFilteredFandoms(fandoms);
    let tempFilter;
    let tempArray = userFandoms.map((remainingFandom, index) => {
      if (index === 0) {
        tempFilter = fandoms.filter(
          (fandom) => fandom._id !== remainingFandom._id
        );
        console.log({ tempFilter });
      } else {
        tempFilter = tempFilter.filter(
          (fandom) => fandom._id !== remainingFandom._id
        );
        console.log({ tempFilter });
        setFilteredFandoms(tempFilter);
      }
    });
    // tempArray = tempArray.flat();
    // console.log(tempArray);
    console.log(tempFilter);
    // setFilteredFandoms(fandoms.filter(remainingFandom => remainingFandom._id !== userFandoms.map(fandom => fandom._id)))
  }, []);

  if (!Auth.loggedIn()) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          {userFandoms.map((fandom, index) => {
            return (
              <div
                className="card col-lg-2 col-md-3 col-sm-12 col-xs-12 m-2"
                style={{ width: "100px" }}
                key={fandom._id}
              >
                <img
                  className="card-img-top"
                  src={`${fandom.image}`}
                  alt={`${fandom.name} logo`}
                />
                <div className="card-body">
                  <div className="text-center">
                    <button
                      key={fandom._id}
                      className="btn-block btn-removefandom"
                      type="button"
                      onClick={() => handleClick(fandom._id)}
                    >
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <hr></hr>
          <h1>Add Your Fandoms:</h1>
        </div>
        <form onSubmit={handleAddSubmit}>
        {me.fandoms.length ? (
            <div className="row">
              {filteredFandoms.map((fandom, index) => {
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
          ) : (
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
          )}
          <div className="text-center">
            <button className="btn-addfandom btn-lg px-5 mt-5" 
            type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
