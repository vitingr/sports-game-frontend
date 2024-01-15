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
      <p>{user.id} user</p>
      <p>{winner} winner</p>
      <p>{loser} loser</p>

      <div className="w-full flex flex-col items-center justify-center mt-10">
        {user.id === loser ? (
          <h1 className="text-3xl text-center">Você perdeu...</h1>
        ) : (
          <h1 className="text-3xl text-center">Parabéns! Você ganhou</h1>
        )}
        <p className="text-xl text-center mt-2">
          Resultado Final: {player1Score} X {player2Score}
        </p>
        <div className="w-full">
          {user.id === loser ? (
            <div>
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
              <p>- 50 pontos</p>
            </div>
          ) : (
            <div>
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
              <p>+ 100 pontos</p>
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
};

export default Result;
