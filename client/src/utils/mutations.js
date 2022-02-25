import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login( email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!,       $password: String!, $firstName: String!, $lastName: String!) {
        addUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
            token
            user {
                username 
                email 
                _id
            }
        }
    }
`;

export const ADD_FANDOM = gql`
    mutation addFandom($_id: ID!, $fandomId: ID! ) {
        addFandom(_id: $_id, fandomId: $fandomId) {
            username
            fandoms {
                _id
                name
                description
            }
        }
    }
`;

export const REMOVE_FANDOM = gql`
    mutation removeFandom($_id: ID!, $fandomId: ID! ) {
        removeFandom(_id: $_id, fandomId: $fandomId) {
            fandoms {
                _id
                name
                description
            }
        }
    }
`;

export const ADD_MATCH = gql`
    mutation addMatch($_id: ID!, $userId: ID! ) {
        addMatch(_id: $_id, userId: $userId) {
            _id
            username
            firstName
            lastName
            matches {
                _id
                username
                firstName
                lastName
            }
        }
    }
`;
export const REMOVE_MATCH = gql`
    mutation removeMatch($_id: ID!, $userId: ID! ) {
        removeMatch(_id: $_id, userId: $userId) {
            _id
            username
            firstName
            lastName
            matches {
                _id
                username
                firstName
                lastName
            }
        }
    }
`;