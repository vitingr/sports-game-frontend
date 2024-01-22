"use client";

import { infoUser } from "@/contexts/UserContext";
import { socket } from "@/contexts/WebSocketContext";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const page = () => {
  const { user } = infoUser();

  const pathname = usePathname().split("/");
  const query = pathname[2];

  const handleAcceptMatch = async () => {
    try {
      socket.emit("joinGame", {
        username: user.id as string,
        matchId: query
      });
      toast.success("Aceitou partida");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl border-neutral-100 shadow-sm shadow-neutral-200 p-10 flex flex-col items-center mt-[3m] max-w-[800px] w-full">
      <h1 className="text-3xl font-bold w-full transition-all duration-300 hover:text-[#5BB5A2] cursor-default mt-4">
        Encontramos uma partida para você!
      </h1>
      <p className="text-[#717171]">
        Para disputar essa partida, clique abaixo para aceita-la, você também
        cancelar a mesma, caso não deseje disputar a partida. Abaixo é possível
        consultar as recompensas em caso de vitória ou derrota
      </p>

      <div className="w-full mt-8">
        <h2 className="text-2xl">Seus Pontos</h2>
        <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 to-slate-600 uppercase">
          {user.points}
        </span>

        <div className="mt-6 pb-2 mb-2 border-b border-neutral-200">
          <h3 className="font-semibold">Recompensas em caso de vitória</h3>
          <p>+ 100 pontos</p>
          <span className="flex gap-2 items-center">
            <p>+ 500</p>
            <Image
              src={"/assets/coins.png"}
              alt="Currency Icon"
              width={12.5}
              height={12.5}
              className="w-[12.5px] h-[12.5px]"
            />
          </span>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Recompensas em caso de derrota</h3>
          <p>- 50 pontos</p>
          <span className="flex gap-2 items-center">
            <p>+ 250</p>
            <Image
              src={"/assets/coins.png"}
              alt="Currency Icon"
              width={12.5}
              height={12.5}
              className="w-[12.5px] h-[12.5px]"
            />
          </span>
        </div>
      </div>

      <button
        className="w-full mt-10 bg-[#5BB5A2] py-3 text-white rounded-xl"
        onClick={() => handleAcceptMatch()}
      >
        Aceitar partida
      </button>
      <button className="w-full mt-6 text-[#5BB5A2] border border-[#5BB5A2] py-3 rounded-xl">
        Cancelar partida
      </button>
    </div>
  );
};

export default page;
