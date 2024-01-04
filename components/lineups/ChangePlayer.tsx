import React from "react";
import Popup from "../config/Popup";
import { infoUser } from "@/contexts/UserContext";
import { useQuery } from "@apollo/client";
import { GET_USER_CARDS } from "@/graphql/queries";
import { GeneratedCardProps } from "@/types";
import ChangeLineupCard from "./ChangeLineupCard";

const ChangePlayer = ({ state }: { state: any }) => {
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

  return (
    myCardsLoading === false && (
      <Popup
        title="Escolha um jogador"
        state={state}
        description="Escolha um jogador para ocupar essa posição na sua formação atual"
      >
        {myCards && myCards.findUserCards ? (
          <div className="flex flex-wrap gap-4 mt-8 w-full">
            {myCards.findUserCards.map(
              (card: GeneratedCardProps, index: number) => (
                <ChangeLineupCard key={index}  />
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
