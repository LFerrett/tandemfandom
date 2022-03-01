import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from "./components/pages/Landing";
import Main from "./components/pages/Main";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Matches from "./components/pages/Matches";
// import YourMatches from "./components/pages/Connections"
import Profile from "./components/pages/Profile";
import Header from "./components/layout/NavTabs";
import Footer from "./components/layout/Footer";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div
          className="flex-column justify-flex-start min-100-vh main-div"
          style={{
            backgroundColor: "#e6f0ef",
          }}
        >
          <Header />
          <div className="container">
            <Route exact path="/">
              <Landing />
            </Route>

            <Route exact path="/main">
              <Main />
            </Route>

            <Route exact path="/profile">
              <Profile />
            </Route>

            <Route exact path="/matches">
              <Matches />
            </Route>

            {/* <Route exact path="/yourmatches">
              <YourMatches />
            </Route> */}

            <Route exact path="/login">
              <Login />
            </Route>
            

            <Route exact path="/signup">
              <Signup />
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
