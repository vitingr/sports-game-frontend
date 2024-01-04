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

export const CREATE_CARD = gql `
  mutation (
    $cardImage: String!
    $name: String!
    $club: String!
    $league: String!
    $type: String!
    $position: String!
    $overall: Int!
    $pace: Int!
    $finalization: Int!
    $pass: Int!
    $drible: Int!
    $defense: Int!
    $physic: Int!
    $minValue: Float!
    $maxValue: Float!
    $quickSellValue: Float!
  ) {
    createCard(
      createCardInput: {
        cardImage: $cardImage
        name: $name
        club: $club
        league: $league
        type: $type
        position: $position
        overall: $overall
        pace: $pace
        finalization: $finalization
        pass: $pass
        drible: $drible
        defense: $defense
        physic: $physic
        minValue: $minValue
        maxValue: $maxValue
        quickSellValue: $quickSellValue
      }
    ) {
      id
    }
  }
`

export const EDIT_CLUB_NAME = gql`
  mutation (
    $userId: String!
    $clubname: String!
  ) {
    changeClubName(
      changeClubName: {
        userId: $userId
        clubname: $clubname
      }
    ) {
      id
      clubname
    }
  }
`

export const CREATE_LINEUP = gql`
  mutation (
    $name: String!
    $owner: String!
  ) {
    createLineup(
      createLineupInput: {
        name: $name
        owner: $owner
      }
    ) {
      id
    }
  }
`

export const OPEN_PLAYERS_PACK = gql`
  mutation (
    $userId: String!
  ) {
    openPlayersPack(
      id: $userId
    ) {
      name
    }
  }
`

export const SELL_CARD = gql `
  mutation (
    $ownerId: String!
    $newOwnerId: String!
    $playerId: String!
    $price: Float!
  ) {
    sellCard(
      sellCard: {
        ownerId: $ownerId
        newOwnerId: $newOwnerId
        playerId: $playerId
        price: $price
      }
    ) {
      name
    }
  }
`

export const BUY_CARD = gql `
  mutation (
    $ownerId: String!
    $newOwnerId: String!
    $playerId: String!
    $price: Float!
  ) {
    buyCard(
      sellCard: {
        ownerId: $ownerId
        newOwnerId: $newOwnerId
        playerId: $playerId
        price: $price
      }
    ) {
      name
    }
  }
`

export const DELETE_USER_LINEUP = gql `
  mutation (
    $id: String!
  ) {
    deleteUserLineup(
      id: $id
    ) {
      name
    }
  }
`