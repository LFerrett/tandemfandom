import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            firstName
            lastName
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
            name
            description
            image
        }
    }
`;
