import { gql } from "@apollo/client";

export const GET_PLAYER = gql`
  query getUser($uuid: String!) {
    getUser(uuid: $uuid) {
      id
      uuid
      name
      firstname
      lastname
      clubname
      email
      password
      currency
      cards
      qtdCards
      badges
      badge
      friends
      pendingFriends
      qtdFriends
      driverMenu
      driverHome
      driverLineup
      driverProfile
      newUser
      lineups
      futpoints
      points
      victories
      draws
      loses
    }
  }
`;

export const GET_ALL_PLAYERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      uuid
      name
      clubname
      email
      password
      currency
      cards
      qtdCards
      badge
      friends
      pendingFriends
      qtdFriends
      newUser
      lineups
      points
      victories
      draws
      loses
    }
  }
`;

export const GET_USER_FRIENDS = gql`
  query getUserFriends($friends: [String!]!) {
    getUserFriends(friends: $friends) {
      id
      uuid
      name
      clubname
      email
      password
      currency
      cards
      qtdCards
      badge
      friends
      pendingFriends
      qtdFriends
      newUser
      lineups
      points
      victories
      draws
      loses
    }
  }
`;

export const GET_USER_PENDING_FRIENDS = gql`
  query getUserPendingFriends($playersId: [String!]!) {
    getUserPendingFriends(playersId: $playersId) {
      id
      uuid
      name
      clubname
      email
      password
      currency
      cards
      qtdCards
      badge
      friends
      pendingFriends
      qtdFriends
      newUser
      lineups
      points
      victories
      draws
      loses
    }
  }
`;
