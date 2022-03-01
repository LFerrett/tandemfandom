import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            firstName
            lastName
            image
            matches {
                _id
                username
                email
                firstName
                lastName
                image
                fandoms {
                    _id
                    description
                    name
                }
            }
            fandoms {
                _id
                description
                name
                image
            }
        }
    }
`;

export const GET_USERS = gql`
    query users {
        users {
            _id
            username
            firstName
            lastName
            image
            fandoms {
                _id
                description
                name
            }
        }
    }
`;

export const GET_FANDOMS = gql`
    query fandoms {
        fandoms {
            _id
            name
            description
            image
        }
    }
`;
