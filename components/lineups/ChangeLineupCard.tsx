"use client";

import { GeneratedCardProps } from "@/types";
import Image from "next/image";
import React from "react";
import ToastMessage from "../config/ToastMessage";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { UPDATE_LINEUP_CARD } from "@/graphql/mutations";
import { infoUser } from "@/contexts/UserContext";

type ChangeCardProps = {
  cardData: GeneratedCardProps;
  lineupIndex: number;
  positions: string[];
  showState: any;
  indexData: GeneratedCardProps;
  lineupId: string;
};

const ChangeLineupCard = ({
  cardData,
  lineupIndex,
  positions,
  showState,
  indexData,
  lineupId,
}: ChangeCardProps) => {
  const { user } = infoUser();

  const [updateLineupCard] = useMutation(UPDATE_LINEUP_CARD);

  const handleChangeCard = async () => {
    try {
      console.log(indexData);
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
      })
      if (!indexData) {
        // Campo de seleção de jogador vazio
        await updateLineupCard({
          variables: {
            lineupId: lineupId,
            playerId: user.id,
            playerData: cardDataJson,
            index: Number(lineupIndex),
          },
        });
        toast.success("Carta Alterada com sucesso!");
        showState(false);
      } else {
        // Campo de seleção com jogador já existente
        await updateLineupCard({
          variables: {
            lineupId: lineupId,
            playerId: user.id,
            playerData: cardDataJson,
            index: Number(lineupIndex),
          },
        });
        toast.success("Carta Alterada com sucesso!");
        showState(false);

        if (indexData.id === cardData.playerId) {
          toast.error(
            "Não é possível adicionar o mesmo jogador duas vezes no time"
          );
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível escolher o jogador");
    }
  };

  return (
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
