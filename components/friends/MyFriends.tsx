"use client";

import { infoUser } from "@/contexts/UserContext";
import { socket, socketProvider } from "@/contexts/WebSocketContext";
import { UserProps } from "@/types";
import Image from "next/image";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import ToastMessage from "../config/ToastMessage";
import { GET_USER_FRIENDS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";

const MyFriends = () => {
  const { user } = infoUser();
  const {
    data: myFriendsData,
    loading: myFriendsDataLoading,
    refetch: refetchMyFriendsData,
  } = useQuery(GET_USER_FRIENDS, {
    variables: {
      friends: user.friends,
    },
    skip: !user.friends,
  });

  const handleRemoveFriend = async (friend: UserProps) => {
    try {
      socket.emit("removeFriend", {
        userId: user.id as string,
        friendId: friend.id as string,
      });
      await refetchMyFriendsData().then(() => {
        toast.success("O amigo foi removido da sua lista");
      });
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível remover o amigo da sua lista");
    }
  };

  return myFriendsData && myFriendsData?.getUserFriends ? (
    <>
      <ToastMessage />
      <h1 className="text-2xl font-bold mb-10 transition-all duration-300 hover:text-[#5BB5A2] cursor-default">
        Meus Amigos
      </h1>
      <div className="flex flex-wrap w-full gap-10">
        {myFriendsData.getUserFriends.map(
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
              <BsTrash
                size={25}
                className="gray-icon cursor-pointer"
                onClick={() => handleRemoveFriend(player)}
              />
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
