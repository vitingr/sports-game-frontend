import React, { useEffect, useState } from "react";
import Popup from "../config/Popup";
import { infoUser } from "@/contexts/UserContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_CARDS } from "@/graphql/queries";
import { GeneratedCardProps } from "@/types";
import ChangeLineupCard from "./ChangeLineupCard";
import ToastMessage from "../config/ToastMessage";
import { toast } from "react-toastify";
import { REMOVE_LINEUP_PLAYER } from "@/graphql/mutations";

const ChangePlayer = ({
  state,
  lineupIndex,
  indexData,
  lineupId,
  handleRefetch,
}: {
  state: any;
  lineupIndex: number;
  indexData: GeneratedCardProps;
  lineupId: string;
  handleRefetch: any;
}) => {
  const { user } = infoUser();

  const [removePlayer] = useMutation(REMOVE_LINEUP_PLAYER);

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

  const removeCurrentCard = async () => {
    try {
      const position = `player${lineupIndex}`;

      if (position) {
        await removePlayer({
          variables: {
            lineupId: lineupId,
            position: position,
          },
        });

        state(false);
      } else {
        toast.error("Erro ao estabelecer uma conexão com o servidor");
      }
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível remover o jogador dessa posição");
    }
  };

  useEffect(() => {
    switch (lineupIndex) {
      case 1:
        setPosition(["Goleiro"]);
        break;
      case 2:
        setPosition(["Lateral Direito", "Lateral Esquerdo", "Zagueiro"]);
        break;
      case 3:
        setPosition(["Lateral Direito", "Lateral Esquerdo", "Zagueiro"]);
        break;
      case 4:
        setPosition(["Lateral Direito", "Lateral Esquerdo", "Zagueiro"]);
        break;
      case 5:
        setPosition(["Lateral Direito", "Lateral Esquerdo", "Zagueiro"]);
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
        <ToastMessage />
        {myCards && myCards.findUserCards ? (
          <div className="flex flex-wrap gap-4 py-8 w-full h-[650px] overflow-y-scroll">
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
        <div
          className="w-full p-4 bg-emerald-500 text-white rounded-xl mt-10 text-center cursor-pointer transition-all duration-300 hover:bg-emerald-600"
          onClick={async () => await removeCurrentCard()}
        >
          Remover Jogador
        </div>
      </Popup>
    )
  );
};

export default ChangePlayer;
