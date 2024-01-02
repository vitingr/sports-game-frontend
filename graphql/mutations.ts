import { gql } from "@apollo/client";

export const CREATE_PLAYER = gql `
  mutation (
      $uuid: String!
      $name: String!
      $firstname: String!
      $lastname: String!
      $clubname: String!
      $email: String!
      $password: String!
  ) {
    createNewUser(
      createUser: {
        uuid: $uuid
        name: $name
        firstname: $firstname
        lastname: $lastname
        clubname: $clubname
        email: $email
        password: $password
      }
    ) {
      id
    }
  }
`

export const SEND_FRIEND_INVITE  = gql`
  mutation (
    $userId: String!
    $friendId: String!
  ) {
    sendFriendInvite(
      sendFriendInvite: {
        userId: $userId
        friendId: $friendId
      }
    ) {
      id
    }
  }
`

