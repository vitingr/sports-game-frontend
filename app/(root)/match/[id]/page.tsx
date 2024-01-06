"use client";

import { infoUser } from "@/contexts/UserContext";
import { socket } from "@/contexts/WebSocketContext";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const page = () => {
  const { user } = infoUser();

  const pathname = usePathname().split("/");
  const query = pathname[2];

  const handleAcceptMatch = async () => {
    try {
      socket.emit("acceptMatch", {
        userId: user.id as string,
        matchId: query as string,
        cancel: false,
      });
      toast.success("Aceitou partida");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {query}

      <h1 onClick={() => handleAcceptMatch()}>Aceitar partida</h1>
    </div>
  );
};

export default page;
