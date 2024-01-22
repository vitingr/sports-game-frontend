"use client";

import { infoUser } from "@/contexts/UserContext";
import { ResultProps } from "@/types";
import React from "react";
import Popup from "../config/Popup";
import Image from "next/image";

const Result = ({
  showState,
  winner,
  loser,
  player1Score,
  player2Score,
}: ResultProps) => {
  const { user } = infoUser();

  return (
    <Popup
      title="Resultado da Partida"
      description="Veja seus prêmios, resultado e seu desempenho na partida na qual foi disputada por você."
      state={showState}
    >

      <div className="w-full flex flex-col items-center justify-center mt-16">
        {user.id === loser ? (
          <h1 className="text-3xl text-center underline underline-offset-4">Você perdeu...</h1>
        ) : (
          <h1 className="text-3xl text-center underline underline-offset-4">Parabéns! Você ganhou</h1>
        )}
        <p className="text-xl text-center mt-1 text-[#717171]">
          Resultado Final: {player1Score} X {player2Score}
        </p>
        <div className="w-full">
          {user.id === loser ? (
            <div className="flex flex-col items-center mt-[5em] ">
              <span className="flex gap-2 items-center">
                <p className="text-2xl">+ 250 moedas</p>
                <Image
                  src={"/assets/coins.png"}
                  alt="Currency Icon"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px]"
                />
              </span>
              <p className="text-2xl mt-2">- 50 pontos</p>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-[5em]">
              <span className="flex gap-2 items-center">
                <p className="text-2xl">+ 500 moedas</p>
                <Image
                  src={"/assets/coins.png"}
                  alt="Currency Icon"
                  width={20}
                  height={20}
                  className="w-[20px] h-[20px]"
                />
              </span>
              <p className="text-2xl mt-2">+ 100 pontos</p>
            </div>
          )}
        </div>
        <div className="mt-12 w-full rounded-xl text-white bg-[#5BB5A2] py-2 text-center cursor-pointer" onClick={() => showState(false)}>
          Fechar 
        </div>
      </div>
    </Popup>
  );
};

export default Result;
