"use client";

import { infoUser } from "@/contexts/UserContext";
import { UserProps } from "@/types";
import Image from "next/image";
import React from "react";
import ToastMessage from "../config/ToastMessage";
import { toast } from "react-toastify";
import { socket, socketProvider } from "@/contexts/WebSocketContext";
import { useQuery } from "@apollo/client";
import { GET_ALL_PLAYERS } from "@/graphql/queries";
import AddFriend from "./AddFriend";

const SearchFriends = () => {
  const { user } = infoUser();
  const {
    data: playersData,
    loading: playersDataLoading,
    refetch: refetchPlayersData,
  } = useQuery(GET_ALL_PLAYERS);

  // Configurações Sockets
  const handleInviteFriend = async (friend: UserProps) => {
    if (
      !friend.friends.includes(user.id) &&
      !friend.pendingFriends.includes(user.id)
    ) {
      socket.emit("inviteUser", {
        userId: user.id as string,
        friendId: friend.id as string,
        socketId: socket.id,
      });
      await refetchPlayersData().then(() => {
        toast.success("Convite de amizade enviado com successo!");
      });
    } else {
      toast.error("Não é possível adicionar o mesmo amigo duas vezes");
    }
  };

  return playersData ? (
    <>
      <ToastMessage />
      <h1 className="text-2xl font-bold mb-10 transition-all duration-300 hover:text-indigo-600 cursor-default">
        Encontrar Amigos
      </h1>
      <div className="flex flex-wrap w-full gap-10">
        {playersData.getAllUsers.map((player: UserProps, index: number) => (
          <AddFriend
            key={index}
            friends={player.friends}
            pendingFriends={player.pendingFriends}
            player={player}
            handleFunction={handleInviteFriend}
          />
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
