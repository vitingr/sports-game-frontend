import { gql } from "@apollo/client";
import { GeneratedCardProps } from "@/types";

export const CREATE_PLAYER = gql`
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
`;

export const SEND_FRIEND_INVITE = gql`
  mutation ($userId: String!, $friendId: String!) {
    sendFriendInvite(
      sendFriendInvite: { userId: $userId, friendId: $friendId }
    ) {
      id
    }
  }
`;

export const CREATE_CARD = gql`
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
`;

export const EDIT_CLUB_NAME = gql`
  mutation ($userId: String!, $clubname: String!) {
    changeClubName(changeClubName: { userId: $userId, clubname: $clubname }) {
      id
      clubname
    }
  }
`;

export const CREATE_LINEUP = gql`
  mutation ($name: String!, $owner: String!) {
    createLineup(createLineupInput: { name: $name, owner: $owner }) {
      id
    }
  }
`;

export const SELL_CARD = gql`
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
`;

export const BUY_CARD = gql`
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
`;

export const DELETE_USER_LINEUP = gql`
  mutation ($id: String!) {
    deleteUserLineup(id: $id) {
      name
    }
  }
`;

export const UPDATE_LINEUP_CARD = gql`
  mutation (
    $lineupId: String!
    $playerId: String!
    $playerData: String!
    $index: Int!
  ) {
    updateLineupCard(
      updateLineupCard: {
        lineupId: $lineupId
        playerId: $playerId
        playerData: $playerData
        index: $index
      }
    ) {
      id
    }
  }
`;

export const HOME_DRIVER = gql`
  mutation ($id: String!) {
    useHomeDriver(id: $id) {
      id
    }
  }
`;

export const LINEUP_DRIVER = gql`
  mutation ($id: String!) {
    useLineupDriver(id: $id) {
      id
    }
  }
`;

export const MENU_DRIVER = gql`
  mutation ($id: String!) {
    useMenuDriver(id: $id) {
      id
    }
  }
`;

export const PROFILE_DRIVER = gql`
  mutation ($id: String!) {
    useProfileDriver(id: $id) {
      id
    }
  }
`;

export const SELECT_LINEUP = gql`
  mutation ($userId: String!, $lineupId: String!) {
    selectLineup(selectLineup: { userId: $userId, lineupId: $lineupId }) {
      id
    }
  }
`;

export const OPEN_PLAYERS_PACK = gql`
  mutation ($userId: String!, $method: String!) {
    openPlayersPack(openPack: { userId: $userId, method: $method }) {
      cardImage
      name
      club
      league
      type
      overall
      minValue
      maxValue
      quickSellValue
      position
      badgeImage
      clubname
    }
  }
`;

export const OPEN_RARE_GOLD_PACK = gql`
  mutation ($userId: String!, $method: String!) {
    openRareGoldPack(openPack: { userId: $userId, method: $method }) {
      cardImage
      name
      club
      league
      type
      overall
      minValue
      maxValue
      quickSellValue
      position
      badgeImage
      clubname
    }
  }
`;

export const OPEN_GOLD_PACK = gql`
  mutation ($userId: String!, $method: String!) {
    openGoldPack(openPack: { userId: $userId, method: $method }) {
      cardImage
      name
      club
      league
      type
      overall
      minValue
      maxValue
      quickSellValue
      position
      badgeImage
      clubname
    }
  }
`;

export const OPEN_RARE_SILVER_PACK = gql`
  mutation ($userId: String!, $method: String!) {
    openRareSilverPack(openPack: { userId: $userId, method: $method }) {
      cardImage
      name
      club
      league
      type
      overall
      minValue
      maxValue
      quickSellValue
      position
      badgeImage
      clubname
    }
  }
`;

export const OPEN_SILVER_PACK = gql`
  mutation ($userId: String!, $method: String!) {
    openSilverPack(openPack: { userId: $userId, method: $method }) {
      cardImage
      name
      club
      league
      type
      overall
      minValue
      maxValue
      quickSellValue
      position
      badgeImage
      clubname
    }
  }
`;

export const OPEN_BRONZE_PACK = gql`
  mutation ($userId: String!, $method: String!) {
    openBronzePack(openPack: { userId: $userId, method: $method }) {
      cardImage
      name
      club
      league
      type
      overall
      minValue
      maxValue
      quickSellValue
      position
      badgeImage
      clubname
    }
  }
`;

export const CREATE_BADGE = gql`
  mutation (
    $badgeImage: String!
    $clubname: String!
    $maxValue: Float!
    $minValue: Float!
    $quickSellValue: Float!
  ) {
    createBadge(
      createBadgeInput: {
        badgeImage: $badgeImage
        clubname: $clubname
        maxValue: $maxValue
        minValue: $minValue
        quickSellValue: $quickSellValue
      }
    ) {
      id
    }
  }
`;

export const CHANGE_CLUB_BADGE = gql`
  mutation ($userId: String!, $clubBadge: String!, $badgeImage: String!) {
    changeClubBadge(
      changeClubBadge: {
        userId: $userId
        clubBadge: $clubBadge
        badgeImage: $badgeImage
      }
    ) {
      id
    }
  }
`;

export const SELL_BADGE = gql`
  mutation ($id: String!, $price: Float!, $ownerId: String!) {
    sellBadge(sellBadge: { id: $id, price: $price, ownerId: $ownerId }) {
      id
    }
  }
`;

export const BUY_BADGE = gql`
  mutation (
    $id: String!
    $ownerId: String!
    $newOwnerId: String!
    $price: Float!
  ) {
    buyBadge(
      buyBadge: {
        id: $id
        ownerId: $ownerId
        newOwnerId: $newOwnerId
        price: $price
      }
    ) {
      id
    }
  }
`;

export const QUICK_SELL_CARD = gql`
  mutation ($ownerId: String!, $cardId: String!, $price: Float!) {
    quickSellCard(
      quickSellCard: { ownerId: $ownerId, cardId: $cardId, price: $price }
    ) {
      id
      currency
    }
  }
`;

export const PICK_STARTER_PACK = gql`
  mutation ($userId: String!, $league: String!) {
    pickStarterTeam(pickStarterTeam: { userId: $userId, type: $league }) {
      cardImage
      name
      club
      league
      type
      overall
      minValue
      maxValue
      quickSellValue
      position
    }
  }
`;

export const FINISH_CLUB_SETUP = gql`
  mutation ($id: String!, $clubname: String!) {
    finishClubSetup(clubSetup: { id: $id, clubname: $clubname }) {
      id
    }
  }
`;

export const REMOVE_LINEUP_PLAYER = gql`
  mutation ($lineupId: String!, $position: String!) {
    removeLineupPlayer(
      removeLineupPlayer: { lineupId: $lineupId, position: $position }
    ) {
      id
    }
  }
`;
