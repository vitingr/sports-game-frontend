"use client";

import { infoUser } from "@/contexts/UserContext";
import { GET_ALL_PLAYERS } from "@/graphql/queries";
import { UserProps } from "@/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import ToastMessage from "../config/ToastMessage";
import { toast } from "react-toastify";
import { socket, socketProvider } from "@/contexts/WebSocketContext";

const SearchFriends = () => {

  const { user } = infoUser();

  const {playersData, refetchPlayersData} = socketProvider()
  
  // Configurações Sockets
  const handleInviteFriend = async (friend: UserProps) => {
    if (
      !friend.friends.includes(user.id) &&
      !friend.pendingFriends.includes(user.id)
    ) {
      socket.emit("inviteUser", {
        userId: user.id as string,
        friendId: friend.id as string,
        socketId: socket.id
      });
      await refetchPlayersData();
      toast.success("Convite de amizade enviado com successo!");
    } else {
      toast.error("Não é possível adicionar o mesmo amigo duas vezes");
    }
  };

  return playersData ? (
    <>
      <ToastMessage />
      <h1 className="text-2xl font-bold mb-10 transition-all duration-300 hover:text-indigo-600 cursor-default">Encontrar Amigos</h1>
      <div className="flex flex-wrap w-full gap-10">
        {playersData.getAllUsers.map((player: UserProps, index: number) => (
          <div key={index}>
            {
              user.friends === undefined ||
              !user.friends.includes(player.id) &&
              !user.pendingFriends.includes(player.id) &&
              !player.friends.includes(user.id) &&
              !player.pendingFriends.includes(user.id) &&
              player.id !== user.id && (
                <div className="w-full flex justify-between gap-3 py-2 mb-2 border-b border-neutral-100 items-center">
                  <Image
                    src={"/assets/undefinedTeam.png"}
                    alt="Team Badge"
                    width={45}
                    height={45}
                    className="rounded-full"
                  />
                  <div className="w-[275px] flex flex-col justify-center">
                    <h1 className="font-semibold">{player.clubname}</h1>
                    <span className="text-sm text-[#717171]">
                      {player.name}
                    </span>
                  </div>
                  <span
                    className="bg-indigo-600 text-white rounded-xl text-center px-2 py-2 w-full text-sm cursor-pointer max-w-[125px]"
                    onClick={(e: React.SyntheticEvent) => {
                      e.preventDefault();
                      handleInviteFriend(player);
                    }}
                  >
                    Adicionar Amigo
                  </span>
                </div>
              )}
          </div>
        ))}
      </div>
    </>
  ) : (
    <>
      <h1 className="text-2xl font-bold mb-10">Encontrar Amigos</h1>
      <div className="w-full flex justify-center items-center">
        <span className="text-center text-xl text-[#717171]">
          Não encontramos ninguém para você fazer amizade...
        </span>
      </div>
    </>
  );
};

export default SearchFriends;
