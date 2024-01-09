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
  const { players } = socketProvider();
  const [roundCount, setRoundCount] = useState<number>(1);
  // const [avaliableCards, setAvaliableCards] = useState<any>([
  //   { carta1: "" },
  //   { carta2: "" },
  //   { carta3: "" },
  //   { carta4: "" },
  //   { carta5: "" },
  //   { carta6: "" },
  //   { carta7: "" },
  //   { carta8: "" },
  //   { carta9: "" },
  //   { carta10: "" },
  //   { carta11: "" },
  // ]);
  const [avaliableCards, setAvaliableCards] = useState<number[]>([1, 2, 3, 4, 5])
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

    socket.on("avaliableCards", (userLineupAvaliableCards: any) => {
      console.log(userLineupAvaliableCards)
      // retornou o Array certinho, agora so falta corrigir a questão dos jogadores
      // ao clicar no jogador vai abrir um popup para escolher o atributo do jogador (cardValue dinamico)
      // setAvaliableCards([
      //   { carta1: userLineupAvaliableCards.player1 },
      //   { carta2: userLineupAvaliableCards.player2 },
      //   { carta3: userLineupAvaliableCards.player3 },
      //   { carta4: userLineupAvaliableCards.player4 },
      //   { carta5: userLineupAvaliableCards.player5 },
      //   { carta6: userLineupAvaliableCards.player6 },
      //   { carta7: userLineupAvaliableCards.player7 },
      //   { carta8: userLineupAvaliableCards.player8 },
      //   { carta9: userLineupAvaliableCards.player9 },
      //   { carta10: userLineupAvaliableCards.player10 },
      //   { carta11: userLineupAvaliableCards.player11 },
      // ]);
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
      socket.off("avaliableCards");
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
    avaliableCards !== null && (
      <>
        {/* {"" && <>lineup</>}

        {"" && <>chooseCard</>}

        {"" && <>wait</>}

        {"" && <>roundWinner</>}

        {"" && <>matchWinner</>} */}
        <div>
          <h1>Game</h1>

          {roundCount}
          {avaliableCards}
          {chosenCard}

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
                  {avaliableCards.map((card: any) => (
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
