"use client";

import { io, Socket } from "socket.io-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import ToastMessage from "@/components/config/ToastMessage";
import { infoUser } from "./UserContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const socket = io("https://pifa-nest-api.onrender.com");
export const WebSocketContext = createContext<Socket | any>(socket);

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = infoUser();
  const router = useRouter();

  // Match States
  const [players, setPlayers] = useState<string[]>([])
  const [availableCards, setAvailableCards] = useState<any>();
  const [matchCurrentTurn, setMatchCurrentTurn] = useState<string>("");
  const [currentStat, setCurrentStat] = useState<string>("")
  const [showMatchResults, setShowMatchResults] = useState<boolean>(false)
  const [matchWinner, setMatchWinner] = useState<string>("")
  const [matchLoser, setMatchLoser] = useState<string>("")

  const [matchUsedCards, setMatchUsedCards] = useState<string[]>([])

  const [player1Score, setPlayer1Score] = useState<number>(0);
  const [player2Score, setPlayer2Score] = useState<number>(0);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Successfully connected to the WebSocket API, ${socket.id}`);
    });

    socket.on("onInvite", async (invite: any) => {
      if (
        user.id === invite.content.friendId &&
        socket.id === invite.content.socketId
      ) {
        toast.info("Convite de Amizade Recebido");
      }
    });

    socket.on("matchFound", ({ msg, userId, matchId }) => {
      router.push(`/match/${matchId}`);
    });

    socket.on("gameJoined", ({players, matchId}: any) => {
      setPlayers(players);
      router.push(`/match/accepted/${matchId}`)
    });

    socket.on("availableCards", (userLineupAvaliableCards: any) => {
      setAvailableCards(userLineupAvaliableCards);
    });

    socket.on("matchWinner", ({winner, loser}: any) => {
      setShowMatchResults(true)
      setMatchWinner(winner)
      setMatchLoser(loser)
      router.push("/home");
    });

    socket.on("currentTurn", ({turn, currentStat}: {turn: string, currentStat: string}) => {
      console.log(`É a vez do usuário: ${turn}`)
      console.log(`atributo da vez: ${currentStat} ${typeof currentStat}`)
      setMatchCurrentTurn(turn);
      setCurrentStat(currentStat)
    });

    socket.on(
      "roundWinner",
      ({ winner, card1, card2, player1Score, player2Score, usedCards }: any) => {
        console.log(`player1score = ${player1Score} || player2score = ${player2Score}`)
        setPlayer1Score(player1Score);
        setPlayer2Score(player2Score);
        setMatchUsedCards(usedCards)
      }
    );

    return () => {
      socket.off("connect");
      socket.off("onInvite");
      socket.off("matchFound");
      socket.off("gameJoined")
      socket.off("availableCards")
      socket.off("currentTurn");
      socket.off("roundWinner")
      socket.off("matchWinner");
    };
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        players,
        availableCards,
        matchCurrentTurn,
        player1Score,
        player2Score,
        matchUsedCards,
        currentStat,
        showMatchResults,
        setShowMatchResults,
        matchWinner,
        matchLoser,
      }}
    >
      <ToastMessage />
      {children}
    </WebSocketContext.Provider>
  );
};

export const socketProvider = () => useContext(WebSocketContext);
