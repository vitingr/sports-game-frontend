"use client";

import { infoUser } from "@/contexts/UserContext";
import { socketProvider } from "@/contexts/WebSocketContext";
import { GET_USER_FRIENDS } from "@/graphql/queries";
import { UserProps } from "@/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React, { useEffect } from "react";

const MyFriends = () => {
  const { user } = infoUser();

  const {myFriendsData} = socketProvider()

  return myFriendsData &&
    myFriendsData?.getUserFriends  ? (
    <>
      <h1 className="text-2xl font-bold mb-10 transition-all duration-300 hover:text-indigo-600 cursor-default">Meus Amigos</h1>
      <div className="flex flex-wrap w-full gap-10">
        {myFriendsData.getUserFriends.map(
          (player: UserProps, index: number) => (
            <div className="max-w-[450px] w-full flex justify-between gap-3 py-2 mb-2 border-b border-neutral-100 items-center" key={index}>
              <Image
                src={"/assets/undefinedTeam.png"}
                alt="Team Badge"
                width={45}
                height={45}
                className="rounded-full"
              />
              <div className="w-full flex flex-col justify-center">
                <h1 className="font-semibold">{player.clubname}</h1>
                <span className="text-sm text-[#717171]">{player.name}</span>
              </div>
              <span className="font-[700] text-transparent  bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-500 w-full flex justify-end">
                35.023 Pontos
              </span>
            </div>
          )
        )}
      </div>
    </>
  ) : (
    <>
      <h1 className="text-2xl font-bold mb-10">Meus amigos</h1>
      <div className="w-full flex justify-center items-center">
        <span className="text-center text-xl text-[#717171]">
          Você não possui amigos até o momento...
        </span>
      </div>
    </>
  );
};

export default MyFriends;
