import React from "react";
import { useQuery } from "@apollo/client";
import ConnectionList from "../ConnectionList";

import { GET_USERS } from "../../utils/queries";
import { GET_ME } from "../../utils/queries";

export default function Matches() {
  const { data } = useQuery(GET_USERS);
  const users = data?.users || [];

  const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
  const me = dataMe?.me || {};
  // console.log({ users }, { me });

  return (
    <div>
      {loadingMe ? (
        <div>Loading...</div>
      ) : (
        <ConnectionList users={users} me={me} />
      )}
    </div>
  );
}