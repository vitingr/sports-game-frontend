"use client";

import { GeneratedCardProps } from "@/types";
import Image from "next/image";
import React from "react";
import ToastMessage from "../config/ToastMessage";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_LINEUP_CARD } from "@/graphql/mutations";
import { infoUser } from "@/contexts/UserContext";
import PlayerCard from "../PlayerCard";
import { usePathname } from "next/navigation";
import { GET_LINEUP } from "@/graphql/queries";

type ChangeCardProps = {
  cardData: GeneratedCardProps;
  lineupIndex: number;
  positions: string[];
  showState: any;
  indexData: GeneratedCardProps;
  lineupId: string;
  handleRefetch: any;
};

const ChangeLineupCard = ({
  cardData,
  lineupIndex,
  positions,
  showState,
  indexData,
  lineupId,
  handleRefetch,
}: ChangeCardProps) => {
  const { user } = infoUser();

  // GraphQL Mutations and Queries
  const pathname = usePathname().split("/");
  const query = pathname[3];

  const {
    data: lineupData,
    loading: lineupDataLoading
  } = useQuery(GET_LINEUP, {
    variables: {
      id: query,
    },
    skip: !query,
  });

  const [updateLineupCard] = useMutation(UPDATE_LINEUP_CARD);

  // Change Lineup Card Function
  const handleChangeCard = async () => {
    if (lineupData && lineupData.findLineup) {
      const players: GeneratedCardProps[] = [];

      for (let i = 1; i <= 11; i++) {
        if (
          lineupData.findLineup[`player${i}`] !== undefined ||
          lineupData.findLineup[`player${i}`] !== null
        ) {
          const player: GeneratedCardProps = JSON.parse(
            lineupData.findLineup[`player${i}`]
          );
          players.push(player);
        }
      }

            console.log(players)

      try {
        // Transform the data into a valid JSON
        const cardDataJson = JSON.stringify({
          id: cardData.id,
          cardImage: cardData.cardImage,
          owner: cardData.owner,
          selling: cardData.selling as boolean,
          playerId: cardData.playerId,
          name: cardData.name,
          club: cardData.club,
          league: cardData.league,
          type: cardData.type,
          overall: Number(cardData.overall),
          pace: Number(cardData.pace),
          finalization: Number(cardData.finalization),
          pass: Number(cardData.pass),
          drible: Number(cardData.drible),
          defense: Number(cardData.defense),
          physic: Number(cardData.physic),
          minValue: Number(cardData.minValue),
          maxValue: Number(cardData.maxValue),
          quickSellValue: Number(cardData.quickSellValue),
          position: cardData.position,
        });

        if (!indexData) {
          // Campo de seleção de jogador vazio
          if (
            players[0]?.playerId === cardData.playerId ||
            players[1]?.playerId === cardData.playerId ||
            players[2]?.playerId === cardData.playerId ||
            players[3]?.playerId === cardData.playerId ||
            players[4]?.playerId === cardData.playerId ||
            players[5]?.playerId === cardData.playerId ||
            players[6]?.playerId === cardData.playerId ||
            players[7]?.playerId === cardData.playerId ||
            players[8]?.playerId === cardData.playerId ||
            players[9]?.playerId === cardData.playerId ||
            players[10]?.playerId === cardData.playerId
          ) {
            console.log(cardData.playerId)
            toast.error(
              "Não é possível adicionar o mesmo jogador duas vezes no elenco"
            );
          } else {
            updateLineupCard({
              variables: {
                lineupId: lineupId,
                playerId: user.id,
                playerData: cardDataJson,
                index: Number(lineupIndex),
              },
            }).then(() => {
              handleRefetch().then(() => {
                toast.success("Carta Alterada com sucesso!");
                showState(false);
              });
            });
          }
        } else {
          // Campo de seleção com jogador já existente
          if (
            players[0]?.playerId === cardData.playerId ||
            players[1]?.playerId === cardData.playerId ||
            players[2]?.playerId === cardData.playerId ||
            players[3]?.playerId === cardData.playerId ||
            players[4]?.playerId === cardData.playerId ||
            players[5]?.playerId === cardData.playerId ||
            players[6]?.playerId === cardData.playerId ||
            players[7]?.playerId === cardData.playerId ||
            players[8]?.playerId === cardData.playerId ||
            players[9]?.playerId === cardData.playerId ||
            players[10]?.playerId === cardData.playerId
          ) {
            toast.error(
              "Não é possível adicionar o mesmo jogador duas vezes no elenco"
            );
          } else {
            updateLineupCard({
              variables: {
                lineupId: lineupId,
                playerId: user.id,
                playerData: cardDataJson,
                index: Number(lineupIndex),
              },
            }).then(async () => {
              handleRefetch().then(() => {
                toast.success("Carta Alterada com sucesso!");
                showState(false);
              });
            });
          }
        }
      } catch (error) {
        toast.error("Não foi possível escolher o jogador");
      }
    }
  };

  return (
    lineupDataLoading === false &&
    positions.includes(cardData.position) && (
      <div>
        <ToastMessage />
        <Image
          src={cardData.cardImage}
          alt="Card Image"
          width={185}
          height={250}
          className="max-w-[185px] max-h-[250px] w-full h-full cursor-pointer"
          onClick={() => handleChangeCard()}
        />
      </div>
    )
  );
};

export default ChangeLineupCard;
