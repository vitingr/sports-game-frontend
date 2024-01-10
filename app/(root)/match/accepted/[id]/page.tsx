"use client";

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

  // Match States
  const { players, availableCards } = socketProvider();
  const [roundCount, setRoundCount] = useState<number>(1);
  const [chosenCard, setChosenCard] = useState<number | null>(null);

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
      console.log("Round começando");
      setRoundCount(roundCount);
      setChosenCard(null);
    });

    socket.on("roundWinner", ({ winner, card1, card2 }) => {
      console.log(
        `Round ${roundCount} - Winner: ${winner} {Cards: ${card1} | ${card2}}`
      );
    });

    socket.on("matchWinner", (winner: string) => {
      console.log(winner);
      router.push("/home");
    });

    return () => {
      socket.off("startRound");
      socket.off("roundWinner");
    };
  }, [roundCount]);

  const handleChooseCard = (cardValue: number) => {
    console.log(cardValue);
    socket.emit("chooseCard", cardValue);
    setChosenCard(cardValue);
  };

  return (
    currentLineup &&
    currentLineup.findUserCurrentLineup &&
    availableCards && (
      <div>
        <h1>Game</h1>

        {roundCount}
        {chosenCard}

        <div>
          <p>Round {roundCount}</p>

          {chosenCard !== null ? (
            <p>You chose card: {chosenCard}</p>
          ) : (
            <div>
              <p>Choose a card:</p>
              {(JSON.parse(availableCards)).map((line: LineupProps, index: number) => (
                <div key={index}>
                  {line.owner === user.id && (
                    <>
                      {JSON.stringify(line)}
                    </>
                  )}
                </div>
                // <button key={card} onClick={() => handleChooseCard(card)}>
                //   {card}
                // </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default page;
