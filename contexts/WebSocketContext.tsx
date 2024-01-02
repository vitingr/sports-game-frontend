"use client";

import { io, Socket } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { InviteProps } from "@/types";

export const socket = io("http://localhost:3030");
export const WebSocketContext = createContext<Socket | any>(socket);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  
  const socket = io("http://localhost:3030");

  useEffect(() => {
    
    socket.on('connect', () => {
      console.log("Successfully connected to the WebSocket API")
    })

    socket.on('inviteUser', (invite: InviteProps) => {
      console.log("Convite aconteceu")
      console.log(invite)
    })

    return () => {
      console.log('Unregistering Events...')
      socket.off('connect')
      socket.off('onMessage')
    }
  }, [socket])

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  )
};

export const socketProvider = () => useContext(WebSocketContext)