"use client";

import CardActions from "@/components/CardActions";
import PlayerCard from "@/components/PlayerCard";
import { infoUser } from "@/contexts/UserContext";
import { GET_USER_CARDS } from "@/graphql/queries";
import { GeneratedCardProps, PlayerCardProps } from "@/types";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";

const page = () => {
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
      <div className="flex flex-col items-center gap-6 w-full max-w-[1250px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
        <h1 className="text-3xl font-bold w-full transition-all duration-300 hover:text-indigo-600 cursor-default mt-4">
          Minhas Cartas
        </h1>
        <p className="text-[#717171]">
          No mercado de transferências é possível vender e comprar as cartas que
          você deseja possuir e inserir em seus elencos, é uma excelente forma
          de adquirir uma boa economia para seu clube, ou reforça-lo em busca de
          uma maior número de vitórias em batalhas competitivas. Boas
          negociações!
        </p>

        {myCards && myCards.findUserCards ? (
          <div className="flex flex-wrap gap-4 mt-8 w-full">
            {myCards.findUserCards.map(
              (card: GeneratedCardProps, index: number) => (
                <PlayerCard cardData={card} key={index} small={false} refetch={refetchMyCards} />
              )
            )}
          </div>
        ) : (
          <span className="w-full text-lg text-[#717171] p-10 text-center mt-20">
            Você ainda não encontrou nenhuma carta!
          </span>
        )}
      </div>
    )
  );
};

export default page;
