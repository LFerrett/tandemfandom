import React from 'react';
import { GET_USERS } from '../../utils/queries';
import { useMutation, useQuery } from '@apollo/client';
import Auth from '../../utils/auth';



export default function Matches() {

  const { loading, data } = useQuery(GET_USERS);
  const users = data?.users || []

  return (
    <div>
      <h1>Matches</h1>
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
    </div>
  );
}
