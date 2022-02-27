const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    fandoms: [Fandom]
    matches: [User]
  }

  type Fandom {
    _id: ID!
    name: String!
    description: String!
    image: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User 
    fandoms: [Fandom]
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, firstName: String!, lastName: String!): Auth

    addFandom(_id: ID!, fandomId: ID!): User
    removeFandom(_id: ID!, fandomId: ID!): User
    addMatch(_id: ID!, userId: ID!): User
    removeMatch(_id: ID!, userId: ID!): User

  }
`;

module.exports = typeDefs;
