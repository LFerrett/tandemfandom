const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    firstName:
    lastName:
    interests: [String]!

  }

  type Auth {
    token: ID!
    profile: User
  }

  type Query {
    
  }

  type Mutation {
    
  }
`;

module.exports = typeDefs;
