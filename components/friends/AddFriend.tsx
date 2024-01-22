"use client";

import { infoUser } from "@/contexts/UserContext";
import Image from "next/image";

import React from "react";

type AddFriendProps = {
  friends: any;
  pendingFriends: any;
  handleFunction: any;
  player: any;
};

const AddFriend = ({
  friends,
  pendingFriends,
  handleFunction,
  player,
}: AddFriendProps) => {
  const { user } = infoUser();

  return (
    user.friends === undefined ||
    (!user.friends.includes(player.id) &&
      !user.pendingFriends.includes(player.id) &&
      !friends.includes(user.id) &&
      !pendingFriends.includes(user.id) &&
      player.id !== user.id && (
        <div className="flex justify-between gap-3 py-2 mb-2 border-b border-neutral-100 items-center max-w-[450px] w-full">
          <Image
            src={player.badgeImage || "/assets/undefinedTeam.png"}
            alt="Team Badge"
            width={45}
            height={45}
            className="rounded-full"
          />
          <div className="w-[275px] flex flex-col justify-center">
            <h1 className="font-semibold">{player.clubname}</h1>
            <span className="text-sm text-[#717171]">{player.name}</span>
          </div>
          <span
            className="bg-[#5BB5A2] text-white rounded-xl text-center px-2 py-2 w-full text-sm cursor-pointer max-w-[125px] transition-all duration-300 hover:bg-[#51a190]"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              handleFunction(player);
            }}
          >
            Adicionar Amigo
          </span>
        </div>
      ))
  );
};

export default AddFriend;
