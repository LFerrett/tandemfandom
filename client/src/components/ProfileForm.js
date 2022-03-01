import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import { ADD_FANDOM } from "../utils/mutations";

export default function ProfileForm({ me, fandoms }) {
  const [addFandom] = useMutation(ADD_FANDOM);

  const [userFandoms, setUserFandoms] = useState(me.fandoms);
  //   const [checked, setChecked] = useState({});

  // function toggle(index) {
  //   const newData = [...userData];
  //   newData.splice(index, 1, {
  //     label: data[index].label,
  //     checked: !data[index].checked
  //   });
  //   setData(newData);
  //   onChange(newData.filter(x => x.checked));
  // };

  //   handleInputChange({ target }) ;{
  //     const value = target.type === 'checkbox' ? target.checked : target.value;
  //     this.setState({ [target.name]: value });
  // }

  //   const userDataLength = Object.keys(userData).length;

  const handleAddSubmit = async (fandomId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addFandom({
        variables: { _id: fandomId },
      });

      setUserFandoms(...userFandoms);

      Auth.login(data.users.token);
    } catch (err) {
      console.error(err);
    }
  };

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
                        type="checkbox"
                        class="btn-check"
                        id="btn-check-outlined"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
