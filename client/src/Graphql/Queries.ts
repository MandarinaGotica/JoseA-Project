import { gql } from '@apollo/client';

//Queries utilizadas dentro de la aplicación.
export const GET_ALL_USERS = gql`
query getAllUsers{
    getAllUsers{
        id
        name
        username
        email
        role
    }
}
`;

export const GET_USER = gql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      username
    }
  }
`;

