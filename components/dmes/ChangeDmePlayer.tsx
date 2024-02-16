"use client";

import { infoUser } from "@/contexts/UserContext";
import { GET_USER_CARDS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import React from "react";
import ToastMessage from "../config/ToastMessage";
import Popup from "../config/Popup";
import { GeneratedCardProps } from "@/types";
import Image from "next/image";

type ChangeDmePlayerProps = {
  state: any;
  handleFunction: any;
  handleRefetch: any;
  showState: any;
};

const ChangeDmePlayer = ({
  state,
  handleRefetch,
  handleFunction,
  showState,
}: ChangeDmePlayerProps) => {
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

  const removeCurrentCard = async () => {
    console.log("removed");
  };

  return (
    myCardsLoading === false && (
      <Popup
        title="Escolha um jogador"
        state={state}
        description="Escolha um jogador para ocupar essa posição na sua formação atual"
      >
        <ToastMessage />
        {myCards && myCards.findUserCards ? (
          <div className="flex flex-wrap gap-4 py-8 w-full h-[650px] overflow-y-scroll ml-10">
            {myCards.findUserCards.map(
              (card: GeneratedCardProps, index: number) => (
                <Image
                  key={index}
                  src={card.cardImage}
                  alt="Card Image"
                  width={185}
                  height={250}
                  className="max-w-[185px] max-h-[250px] w-full h-full cursor-pointer"
                  onClick={async () => {
                    showState(false);
                    await handleFunction(card)
                  }}
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
          onClick={async () => {
            showState(false);
            await removeCurrentCard();
          }}
        >
          Remover Jogador
        </div>
      </Popup>
    )
  );
};

export default ChangeDmePlayer;
