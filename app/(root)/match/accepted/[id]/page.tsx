"use client";

import { infoUser } from "@/contexts/UserContext";
import { socket, socketProvider } from "@/contexts/WebSocketContext";
import { GET_USER_CURRENT_LINEUP } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user } = infoUser();

  // Match States
  const { players } = socketProvider();
  const [roundCount, setRoundCount] = useState<number>(0);
  // const [avaliableCards, setAvaliableCards] = useState<GeneratedCardProps[]>([])
  const [avaliableCards, setAvaliableCards] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);
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
      setRoundCount(roundCount);
      setChosenCard(null);
    });

    socket.on("avaliableCards", (cards: number[]) => {
      setAvaliableCards(cards);
    });

    socket.on("roundWinner", ({ winner, card1, card2 }) => {
      console.log(
        `Round ${roundCount} - Winner: ${winner} {Cards: ${card1} | ${card2}}`
      );
    });

    return () => {
      socket.off("startRound");
      socket.off("availableCards");
      socket.off("roundWinner");
    };
  }, [roundCount]);

  const handleChooseCard = (cardValue: number) => {
    socket.emit("chooseCard", cardValue);
    setChosenCard(cardValue);
  };

  return (
    currentLineup &&
    currentLineup.findUserCurrentLineup && (
      <>
        {/* {"" && <>lineup</>}

        {"" && <>chooseCard</>}

        {"" && <>wait</>}

        {"" && <>roundWinner</>}

        {"" && <>matchWinner</>} */}
        <div>
          <h1>Game</h1>

          {players.length < 2 ? (
            <div>{JSON.stringify(players)}</div>
          ) : (
            <div>
              {JSON.stringify(players)}
              <p>Round {roundCount}</p>

              {chosenCard !== null ? (
                <p>You chose card: {chosenCard}</p>
              ) : (
                <div>
                  <p>Choose a card:</p>
                  {avaliableCards.map((card) => (
                    <button key={card} onClick={() => handleChooseCard(card)}>
                      {card}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </>
    )
  );
};

export default page;
