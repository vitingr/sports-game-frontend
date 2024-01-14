"use client";

import { infoUser } from "@/contexts/UserContext";
import { BUY_CARD } from "@/graphql/mutations";
import { GET_SELLING_CARDS } from "@/graphql/queries";
import { GeneratedCardProps } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

const PlayersMarket = () => {
  const { user } = infoUser();

  const {
    data: SellingCards,
    loading: SellingCardsLoading,
    refetch: refetchSellingCards,
  } = useQuery(GET_SELLING_CARDS);

  const [buyCard] = useMutation(BUY_CARD);

  const handleBuyCard = async (
    cardId: string,
    cardPrice: number,
    status: boolean,
    ownerId: string
  ) => {
    if (user.currency < cardPrice) {
      toast.error("ERRO! Dinheiro insuficiente");
    } else {
      try {
        if (status === true) {
          await buyCard({
            variables: {
              ownerId: ownerId,
              newOwnerId: user.id,
              playerId: cardId,
              price: Number(cardPrice),
            },
          });
          await refetchSellingCards().then(() => {
            toast.success("A carta foi comprada com sucesso!");
          });
        } else {
          toast.error("ERRO! Outra pessoa já comprou essa carta");
        }
      } catch (error) {
        console.log(error);
        toast.error("Não foi possível comprar a carta!");
      }
    }
  };

  return (
    SellingCardsLoading === false && (
      <div className="flex flex-wrap w-full gap-10 mt-12 justify-start">
        {SellingCards && SellingCards.findSellingCards ? (
          SellingCards.findSellingCards.map(
            (card: GeneratedCardProps, index: number) => (
              <div
                className="w-[225px] h-[300px] rounded-xl flex flex-col items-center"
                key={index}
              >
                <Image
                  src={card.cardImage}
                  alt="Player Card"
                  width={120}
                  height={175}
                  className="max-w-[125px] max-h-[175px] w-full h-full"
                />
                <div className="w-full flex flex-col items-center">
                  <h1 className="font-bold">{card.name}</h1>
                  <p className="text-sm text-[#717171]">
                    {card.club} - {card.league}
                  </p>
                  <div className="flex gap-2 items-center mt-2">
                    <Image
                      src={"/assets/coins.png"}
                      alt="Price Icon"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm">{card.price}</span>
                  </div>
                  <div
                    className="text-white bg-indigo-600 w-full rounded-full py-1 mt-6 cursor-pointer text-center text-sm"
                    onClick={() =>
                      handleBuyCard(
                        card.id,
                        card.price,
                        card.selling,
                        card.owner
                      )
                    }
                  >
                    Comprar Já
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <span className="w-full text-lg text-[#717171] p-10 text-center mt-20">
            Não há nenhum item sendo negociando nesse momento!
          </span>
        )}
      </div>
    )
  );
};

export default PlayersMarket;
