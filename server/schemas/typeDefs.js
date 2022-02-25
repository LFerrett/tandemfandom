const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    fandoms: [ObjectId]
    matches: [ObjectId]
  }

  type Fandom {
    _id: ID
    name: String!
    description: String!
    image: String!
  }

  type Auth {
    token: ID!
    profile: User
  }

  type Query {
    me: User
    // get 
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    // addFandom
    // RemoveFandom
    // saveMatch(userId: String!): User
    // removeMatch(userId: String!): User
  }
`;

module.exports = typeDefs;
