import { gql } from "@apollo/client";

//Mutaciones utilizadas para consulta de datos dentro de la aplicación

export const CREATE_USER = gql`
  mutation createUser($name: String!, $username: String!, $email: String!,$password: String!, $role: Int!) {
    createUser(name: $name, username: $username, email: $email, password: $password, role: $role) {
      id
      name
      username
      email
      password
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $id: ID!
    $name: String!
    $username: String!
  ) {
    updateUser(
      id: $id
      name: $name
      username: $username
    ) {
      name
      username
    }
  }
`;

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            id
            name
            username
            email
            password
            role
        }
    }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;