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

export const GET_USER_LINEUPS = gql`
  query getUserLineups($userId: String!) {
    getUserLineups(id: $userId) {
      id
      name
      overall
      totalOverall
      owner
      player1
      player2
      player3
      player4
      player5
      player6
      player7
      player8
      player9
      player10
      player11
    }
  }
`;

export const GET_USER_CARDS = gql`
  query findUserCards($userId: String!) {
    findUserCards(id: $userId) {
      id
      cardImage
      owner
      selling
      playerId
      name
      club
      league
      type
      overall
      pace
      finalization
      pass
      drible
      defense
      physic
      minValue
      maxValue
      quickSellValue
      position
    }
  }
`;

export const GET_SELLING_CARDS = gql`
  query findSellingCards {
    findSellingCards {
      id
      cardImage
      owner
      selling
      playerId
      name
      club
      league
      type
      overall
      pace   
      finalization
      pass
      drible
      defense
      physic
      minValue
      maxValue
      quickSellValue
      price
      position
    }
  }
`;

export const GET_LINEUP = gql`
  query findLineup($id: String!) {
    findLineup(id: $id) {
      id
      name
      overall
      totalOverall
      owner
      player1
      player2
      player3
      player4
      player5
      player6
      player7
      player8
      player9
      player10
      player11
    }
  }
`
