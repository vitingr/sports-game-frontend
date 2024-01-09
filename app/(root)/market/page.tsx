"use client";

import ToastMessage from "@/components/config/ToastMessage";
import { infoUser } from "@/contexts/UserContext";
import { BUY_CARD } from "@/graphql/mutations";
import { GET_SELLING_CARDS } from "@/graphql/queries";
import { GeneratedCardProps } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";

const page = () => {
  const {user} = infoUser()
  const [search, setSearch] = useState<string>("");

  const {
    data: SellingCards,
    loading: SellingCardsLoading,
    refetch: refetchSellingCards,
  } = useQuery(GET_SELLING_CARDS);

  const [buyCard] = useMutation(BUY_CARD)

  const handleBuyCard = async (cardId: string, cardPrice: number, status: boolean, ownerId: string) => {
    if (user.currency < cardPrice) {
      toast.error("ERRO! Dinhei   ro insuficiente")
    } else {
      try {
        if (status === true) {
          await buyCard({
            variables: {
              ownerId: ownerId,
              newOwnerId: user.id,
              playerId: cardId,
              price: Number(cardPrice)
            }
          })
          await refetchSellingCards().then(() => {
            toast.success("A carta foi comprada com sucesso!")
          })
        } else {  
          toast.error("ERRO! Outra pessoa já comprou essa carta")
        }
      } catch (error) {
        console.log(error)
        toast.error("Não foi possível comprar a carta!")
      }
    }
  }

  return (
    SellingCardsLoading === false && (
      <div className="flex flex-col items-center gap-6 w-full max-w-[1250px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
        <ToastMessage />
        <h1 className="text-3xl font-bold w-full transition-all duration-300 hover:text-indigo-600 cursor-default mt-4">
          Mercado de Transferências
        </h1>
        <p className="text-[#717171]">
          No mercado de transferências é possível vender e comprar as cartas e emblemas que
          você deseja possuir e inserir em seus elencos, é uma excelente forma
          de adquirir uma boa economia para seu clube, ou reforça-lo em busca de
          uma maior número de vitórias em batalhas competitivas. Boas
          negociações!
        </p>
        <div className="flex items-center w-full gap-2 mt-10">
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            placeholder="O que você está procurando no mercado?"
            minLength={1}
            maxLength={40}
            className="outline-none py-2 px-4 w-full border-b border-neutral-200 text-sm text-[#717171] bg-transparent"
            onChange={(e) => setSearch(e.target.value)}
          />
          <IoSearch className="gray-icon cursor-pointer" size={25} />
        </div>
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
                    <div className="text-white bg-indigo-600 w-full rounded-full py-1 mt-6 cursor-pointer text-center text-sm" onClick={() => handleBuyCard(card.id, card.price, card.selling, card.owner)}>
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
      </div>
    )
  );
};

export default page;
