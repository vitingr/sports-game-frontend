"use client";

import { infoUser } from "@/contexts/UserContext";
import { LineupProps } from "@/types";
import Image from "next/image";
import React, { useEffect } from "react";
import MatchCard from "./MatchCard";
import { socketProvider } from "@/contexts/WebSocketContext";

type MatchLineupProps = {
  lineup: LineupProps, 
  handleChooseCard: any,
}

const MatchLineup = ({ lineup, handleChooseCard }: MatchLineupProps) => {
  const { user } = infoUser();

  return (
    lineup.owner === user.id && (
      <div className="flex flex-col w-full items-center max-w-[1050px] mt-[2em] p-10 h-full">
        <Image
          src={"/assets/lineup.png"}
          alt="Lineup Image"
          width={900}
          height={750}
          className="w-[900px] h-[750px] mt-[5em]"
        />
        <div className="absolute h-full w-full flex flex-col items-center gap-6 max-w-[800px] max-h-[650px] mt-[3em]">
          <div className="w-full flex justify-around items-center">
            <MatchCard cardData={lineup.player11} handleChooseCard={handleChooseCard} />
            <MatchCard cardData={lineup.player10} handleChooseCard={handleChooseCard} />
            <MatchCard cardData={lineup.player9} handleChooseCard={handleChooseCard} />
          </div>
          <div className="w-full flex justify-around items-center">
            <MatchCard cardData={lineup.player8} handleChooseCard={handleChooseCard} />
            <MatchCard cardData={lineup.player7} handleChooseCard={handleChooseCard} />
            <MatchCard cardData={lineup.player6} handleChooseCard={handleChooseCard} />
          </div>
          <div className="w-full flex justify-around items-center">
            <MatchCard cardData={lineup.player5} handleChooseCard={handleChooseCard} />
            <MatchCard cardData={lineup.player4} handleChooseCard={handleChooseCard} />
            <MatchCard cardData={lineup.player3} handleChooseCard={handleChooseCard} />
            <MatchCard cardData={lineup.player2} handleChooseCard={handleChooseCard} />
          </div>
          <div className="w-full flex justify-around items-center">
            <MatchCard cardData={lineup.player1} handleChooseCard={handleChooseCard} />
          </div>
        </div>
      </div>
    )
  );
};

export default MatchLineup;
