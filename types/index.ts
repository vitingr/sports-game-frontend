import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export interface getInterface {
  request?: Request;
  params: Params;
}

export interface UserContextProps {
  data: object;
  setData: React.Dispatch<React.SetStateAction<Object>>;
  getInfo: () => Promise<void>;
}

export interface PopupProps {
  children: React.ReactNode;
  title: string;
  state?: any;
  handleSubmit?: () => void;
}

export interface UserProps {
  id: string;
  uuid: string;
  name: string;
  firstname: string;
  lastname: string;
  clubname: string;
  email: string;
  password?: string;
  currency: number;
  cards: string[];
  qtdCards?: number;
  badges: string[];
  badge?: string;
  friends: string[];
  qtdFriends?: number;
  pendingFriends: string[];
  driverMenu: boolean;
  driverHome: boolean;
  driverLineup: boolean;
  driverProfile: boolean;
  newUser: boolean;
  lineups: string[];
  futpoints: number;
  points: number;
  victories: number;
  draws: number;
  loses: number;
}

export interface InviteProps {
  userId: string;
  friendId: string;
}

export interface PlayerCardProps {
  id: string;
  name: string;
  club: string;
  league: string;
  overall: number;
  type: string;
  pace: number;
  finalization: number;
  pass: number;
  drible: number;
  defense: number;
  physic: number;
  maxValue: number;
  minValue: number;
  quickSellValue: number;
}

export interface UploadProps {
  setState: (value: string) => void;
  currentFoto: string;
  text?: string;
  show?: any;
}