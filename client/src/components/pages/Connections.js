// import React, { useState } from "react";
// import { useMutation, useQuery } from "@apollo/client";
// import Auth from "../../utils/auth";
// // import "./../assets/YourMatches.css";
// import ReactDom from "react-dom";

// import { GET_ME } from "../../utils/queries";
// import { ADD_MATCH } from "../../utils/mutations";
// import { REMOVE_MATCH } from "../../utils/mutations";

// // export default function Connections({ users, me }) {
  
// //   const { load, pdata } = useQuery(GET_ME);
// //   const profile = pdata?.me || {};

// //   const { loading, data } = useQuery(GET_ME);
// //   const matches = data?.matches || [];

// //   const [userData, setUserData] = useState({});

// //   const [updatedMatch, { error }] = useMutation(ADD_MATCH);
// //   const removedMatch = useMutation(REMOVE_MATCH);

// //   const handleAddMatch = async (matchId) => {
// //   const token = Auth.loggedIn() ? Auth.getToken() : null;
// //     if (!token) {
// //       return false;
// //     }
// //     try {
// //       const { data } = await updatedMatch({
// //         variables: { ...userData },
// //       });
// //       setUserData(updatedMatch);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div>
// //         <h1>Your Connections Page</h1>
// //       </div>
// //       <div className="container">
// //         <h1>{`${profile.name}'s`} Matches Page</h1>
// //         <div className="container">
// //           <form action="">
// //             <div className="row">
// //               {matches.map((matches, index) => {
// //                 return (
// //                   <div className="card col-lg-4 col-md-6 col-sm-12" style={{ width: `18rem` }} key={profile.matches._id}>
// //                     <img
// //                       className="card-img-top"
// //                       src={`${profile.matches.image}`}
// //                       alt={`${profile.matches.firstName}`}
// //                     />
// //                     <div className="card-body">
// //                       <h5 className="card-title text-center">{profile.matches.firstName} {profile.matches.lastName}</h5>
// //                       <div className="text-center card-footer">
// //                       <button 
// //                       onClick={() => removedMatch(profile.match._id)}
// //                       type="button" className="btn btn-danger">Remove Match</button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </form>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }











// // %%%%%%%%^&^%$%^&^&&&&&&&&&**(*^^)))*&^$@%%%%%%%%%%%%%%%%%%

// export default function Connections({ users, me }) {
//   console.log({users}, {me})
//   // const [savedUserIds, setSavedUserIds] = useState(getSavedUserIds());
//   const [userId, setUserId] = useState();
  
//   const [seeMatches, {error}] = useQuery(GET_ME)
  
//   const removedMatch = useMutation(REMOVE_MATCH);
  
//   const handleClick = async (matchId) => {

//     const token = Auth.loggedIn() ? Auth.getToken() : null;

//     if (!token) {
//       return false;
//     }

//     try {
//       const { data } = await seeMatches({
//         variables: { _id: matchId },
//       });

//       Auth.login(data.users.token);
//     } catch (err) {
//       console.error(JSON.parse(JSON.stringify(err)));
//     }
//   };

//   return (
//     <div>
//       <h1>Your Connections</h1>
//       <div className="row" >
//       {users.map((user, index) => {
//         return (
//           <div className="col my-4" key={me.matches._id}>
//           <div className="card" style={{ width: `18rem` }}>
//             <img
//               className="card-img-top"
//               src={`${me.matches.image}`}
//               alt="users profile"
//             />
//             <div className="card-body">
//               <h5 className="card-title text-center">{user.firstName} {user.lastName}</h5>
//               <h6 className="card-text">Fandoms:</h6>
//               {user.fandoms.map((fandom) => {
//                 return (
//                   <p className="card-text" key={fandom._id}>{fandom.name}</p>
//                 );
//               })}
//               <div className="text-center">
//                 <button className='btn-block btn-success' type="button" onClick={() => removedMatch(me.matches._id)}>Remove Match</button>
//               </div>
//             </div>
//           </div>
//           </div>
          
//         );
//       })}
//       </div>
//     </div>
//   );
// }