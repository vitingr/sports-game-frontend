"use client";

import { io, Socket } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { InviteProps, UserProps } from "@/types";
import ToastMessage from "@/components/config/ToastMessage";
import { infoUser } from "./UserContext";
import { toast } from "react-toastify";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_PLAYERS,
  GET_USER_FRIENDS,
  GET_USER_PENDING_FRIENDS,
} from "@/graphql/queries";
import { useRouter } from "next/navigation";

export const socket = io("http://localhost:3030");
export const WebSocketContext = createContext<Socket | any>(socket);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = infoUser();
  const router = useRouter();

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Successfully connected to the WebSocket API, ${socket.id}`);
    });

    socket.on("onInvite", async (invite: any) => {
      console.log(invite);

      if (
        user.id === invite.content.friendId &&
        socket.id === invite.content.socketId
      ) {
        console.log(`${user.id} | ${invite.friendId}`);
        console.log(`${socket.id} | ${invite.socketId}`);
        toast.info("Convite de Amizade Recebido");
      }
    });

    socket.on("matchFound", ({ msg, userId, matchId }) => {
      console.log(matchId);
      router.push(`/match/${matchId}`);
    });

    socket.on("matchAccepted", ({ msg, userId, matchId }) => {
      console.log(matchId);
      router.push(`/match/accepted/${matchId}`);
    });

    return () => {
      socket.off("connect");
      socket.off("onInvite");
      socket.off("matchFound");
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        socket,
      }}
    >
      <ToastMessage />
      {children}
    </WebSocketContext.Provider>
  );
};

export const socketProvider = () => useContext(WebSocketContext);
