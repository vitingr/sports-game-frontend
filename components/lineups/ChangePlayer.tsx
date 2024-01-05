import React, { useEffect, useState } from "react";
import Popup from "../config/Popup";
import { infoUser } from "@/contexts/UserContext";
import { useQuery } from "@apollo/client";
import { GET_USER_CARDS } from "@/graphql/queries";
import { GeneratedCardProps } from "@/types";
import ChangeLineupCard from "./ChangeLineupCard";

const ChangePlayer = ({
  state,
  lineupIndex,
  indexData,
  lineupId,
  handleRefetch
}: {
  state: any;
  lineupIndex: number;
  indexData: GeneratedCardProps;
  lineupId: string;
  handleRefetch: any
}) => {
  const { user } = infoUser();

  const {
    data: myCards,
    loading: myCardsLoading,
    refetch: refetchMyCards,
  } = useQuery(GET_USER_CARDS, {
    variables: {
      userId: user.id,
    },
    skip: !user.id,
  });

  const [position, setPosition] = useState<string[]>([]);

  useEffect(() => {
    switch (lineupIndex) {
      case 1:
        setPosition(["Goleiro"]);
        break;
      case 2:
        setPosition(["Lateral Direito", "Lateral Direito", "Zagueiro"]);
        break;
      case 3:
        setPosition(["Lateral Direito", "Lateral Direito", "Zagueiro"]);
        break;
      case 4:
        setPosition(["Lateral Direito", "Lateral Direito", "Zagueiro"]);
        break;
      case 5:
        setPosition(["Lateral Direito", "Lateral Direito", "Zagueiro"]);
        break;
      case 6:
        setPosition(["Meio-Campo", "Volante", "Meia Armador"]);
        break;
      case 7:
        setPosition(["Meio-Campo", "Volante", "Meia Armador"]);
        break;
      case 8:
        setPosition(["Meio-Campo", "Volante", "Meia Armador"]);
        break;
      case 9:
        setPosition(["Ponta Direita", "Ponta Esquerda", "Atacante"]);
        break;
      case 10:
        setPosition(["Ponta Direita", "Ponta Esquerda", "Atacante"]);
        break;
      case 11:
        setPosition(["Ponta Direita", "Ponta Esquerda", "Atacante"]);
        break;
    }
  }, []);

  return (
    myCardsLoading === false && (
      <Popup
        title="Escolha um jogador"
        state={state}
        description="Escolha um jogador para ocupar essa posição na sua formação atual"
      >
        {myCards && myCards.findUserCards ? (
          <div className="flex flex-wrap gap-4 py-8 w-full">
            {myCards.findUserCards.map(
              (card: GeneratedCardProps, index: number) => (
                <ChangeLineupCard
                  key={index}
                  lineupIndex={lineupIndex}
                  cardData={card}
                  positions={position}
                  showState={state}
                  indexData={indexData}
                  lineupId={lineupId}
                  handleRefetch={handleRefetch}
                />
              )
            )}
          </div>
        ) : (
          <span className="w-full text-lg text-[#717171] p-10 text-center mt-20">
            Você ainda não encontrou nenhuma carta!
          </span>
        )}
      </Popup>
    )
  );
};

export default ChangePlayer;
