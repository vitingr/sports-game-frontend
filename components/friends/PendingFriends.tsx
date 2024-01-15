"use client";

import { infoUser } from "@/contexts/UserContext";
import { socket, socketProvider } from "@/contexts/WebSocketContext";
import { UserProps } from "@/types";
import Image from "next/image";
import React from "react";
import ToastMessage from "../config/ToastMessage";
import { toast } from "react-toastify";
import { GET_USER_PENDING_FRIENDS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

const PendingFriends = () => {
  const { user } = infoUser();
  const {
    data: pendingFriends,
    loading: pendingFriendsLoading,
    refetch: refetchPendingFriends,
  } = useQuery(GET_USER_PENDING_FRIENDS, {
    variables: {
      playersId: user.pendingFriends,
    },
    skip: !user.pendingFriends,
  });

  const handleAcceptInvite = async (friend: UserProps) => {
    if (!friend.friends.includes(user.id)) {
      try {
        socket.emit("acceptInvite", {
          userId: user.id as string,
          friendId: friend.id as string,
        })
        await refetchPendingFriends().then(() => {
          toast.success("O convite de amizade foi aceito com sucesso!");
        });
      } catch (error) {
        throw new Error("Não foi possível aceitar o convite de amizade");
      }
    } else {
      toast.error("Não é possível aceitar o mesmo convite duas vezes");
    }
  };

  const handleCancelInvite = async (friend: UserProps) => {
    if (!friend.friends.includes(user.id)) {
      try {
        socket.emit("cancelInvite", {
          userId: user.id as string,
          friendId: friend.id as string,
        });
        toast.success("O convite de amizade foi removido com sucesso!");
        await refetchPendingFriends();
      } catch (error) {
        throw new Error("Não foi possível cancelar o convite de amizade");
      }
    } else {
      toast.error("Não é possível aceitar o mesmo convite duas vezes");
    }
  };

  return pendingFriends && pendingFriends?.getUserPendingFriends ? (
    <>
      <ToastMessage />
      <h1 className="text-2xl font-bold mb-10 transition-all duration-300 hover:text-indigo-600 cursor-default">
        Amigos Pendentes
      </h1>
      <div className="flex flex-wrap w-full gap-10">
        {pendingFriends.getUserPendingFriends.map(
          (player: UserProps, index: number) => (
            <div
              className="max-w-[450px] w-full flex justify-between gap-3 py-2 mb-2 border-b border-neutral-100 items-center"
              key={index}
            >
              <Image
                src={player.badgeImage || "/assets/undefinedTeam.png"}
                alt="Team Badge"
                width={45}
                height={45}
                className="rounded-full"
              />
              <div className="w-full flex flex-col justify-center">
                <h1 className="font-semibold">{player.clubname}</h1>
                <span className="text-sm text-[#717171]">{player.name}</span>
              </div>
              <span
                className="bg-indigo-600 text-white rounded-xl text-center px-2 py-2 w-full text-sm cursor-pointer max-w-[85px]"
                onClick={async (e: React.SyntheticEvent) => {
                  e.preventDefault();
                  await handleAcceptInvite(player);
                }}
              >
                Confirmar
              </span>
              <span
                className="text-indigo-600 border border-indigo-600 rounded-xl text-center px-2 py-2 w-full text-sm cursor-pointer max-w-[85px]"
                onClick={async (e: React.SyntheticEvent) => {
                  e.preventDefault();
                  await handleCancelInvite(player);
                }}
              >
                Cancelar
              </span>
            </div>
          )
        )}
      </div>
    </>
  ) : (
    <>
      <h1 className="text-2xl font-bold mb-10">Amigos Pendentes</h1>
      <div className="w-full flex justify-center items-center">
        <span className="text-center text-xl text-[#717171]">
          Você não possui nenhum convite pendente...
        </span>
      </div>
    </>
  );
};

export default PendingFriends;
