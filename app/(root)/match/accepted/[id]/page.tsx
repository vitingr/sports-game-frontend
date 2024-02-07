"use client";

import MatchLineup from "@/components/MatchComponents/MatchLineup";
import Lineup from "@/components/lineups/Lineup";
import { infoUser } from "@/contexts/UserContext";
import { socket, socketProvider } from "@/contexts/WebSocketContext";
import { GET_USER_CURRENT_LINEUP } from "@/graphql/queries";
import { GeneratedCardProps, LineupProps } from "@/types";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user } = infoUser();
  const router = useRouter();
  const {
    players,
    availableCards,
    matchCurrentTurn,
    player1,
    player2,
    player1Score,
    player2Score,
    currentStat,
  } = socketProvider();

  // Match States
  const [chosenCard, setChosenCard] = useState<GeneratedCardProps | null>();
  const [roundCount, setRoundCount] = useState<number>(1);

  const { data: currentLineup, loading: currentLineupLoading } = useQuery(
    GET_USER_CURRENT_LINEUP,
    {
      variables: {
        userId: user.id,
      },
      skip: !user.id,
    }
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Successfully connected to the WebSocket API, ${socket.id}`);
    });

    socket.on("startRound", (roundCount: number) => {
      setRoundCount(roundCount);
      setChosenCard(null);
    });

    return () => {
      socket.off("startRound");
    };
  }, [roundCount]);

  const handleChooseCard = async (card: GeneratedCardProps, stat: string) => {
    socket.emit("chooseCard", {
      card: card,
      stat: stat,
    });
    setChosenCard(card);
  };

  return (
    currentLineup &&
    currentLineup.findUserCurrentLineup &&
    availableCards && (
      <div className="w-full flex flex-col items-center max-w-[1250px] mt-[50px]">
        <div className="w-full p-6 border border-neutral-200 rounded-xl shadow-sm shadow-neutral-100 bg-white mt-[150px] sm:mt-0">
          <div className="w-full flex justify-between">
            <div className="w-full flex justify-between items-center">
              <div className="w-full flex justify-start">
                {user.id === player1 ? (
                  <h1 className="text-2xl font-semibold">{user.clubname}</h1>
                ) : (
                  <h1 className="text-2xl font-semibold">Time Adversário</h1>
                )}
              </div>
              <div className="w-[100px] flex justify-center text-2xl">
                {user.id === player1 ? (
                  <span>{player1Score ? `${player1Score}` : "0"}</span>
                ) : (
                  <span>{player2Score ? `${player2Score}` : "0"}</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center text-2xl">X</div>
            <div className="w-full flex justify-between items-center">
              <div className="w-[100px] flex justify-center text-2xl">
                {user.id === player2 ? (
                  <span>{player1Score ? `${player1Score}` : "0"}</span>
                ) : (
                  <span>{player2Score ? `${player2Score}` : "0"}</span>
                )}
              </div>
              <div className="w-full flex justify-end">
                {user.id === player2 ? (
                  <h1 className="text-2xl font-semibold">{user.clubname}</h1>
                ) : (
                  <h1 className="text-2xl font-semibold">Time Adversário</h1>
                )}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center pt-4 mt-4 border-t border-neutral-200">
            <h1 className="text-2xl">Round {roundCount}</h1>
          </div>
          <div className="w-full flex justify-center items-center pt-4 mt-4 gap-2 border-t border-neutral-200">
            <h1 className="text-2xl">
              Atributo em Jogo
              <span className="text-2xl text-[#5BB5A2] uppercase ml-2">
                {currentStat === "free" || !currentStat
                  ? "Livre"
                  : `${currentStat}`}
              </span>
            </h1>
          </div>
        </div>

        <div>
          {matchCurrentTurn !== user.id ? (
            <h1 className="mt-20 text-2xl">Espere o usuário escolher a carta dele</h1>
          ) : (
            <div>
              <p>Escolha uma carta:</p>
              {JSON.parse(availableCards).map(
                (lineupContent: LineupProps, index: number) => (
                  <MatchLineup
                    lineup={lineupContent}
                    key={index}
                    handleChooseCard={handleChooseCard}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default page;
