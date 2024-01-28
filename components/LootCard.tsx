"use client"

import { infoUser } from "@/contexts/UserContext";
import { GeneratedCardProps } from "@/types";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";
import ToastMessage from "./config/ToastMessage";
import { QUICK_SELL_CARD } from "@/graphql/mutations";

const LootCard = ({ cardData }: { cardData: GeneratedCardProps }) => {

  const { user } = infoUser();

  const [quickSellCard] = useMutation(QUICK_SELL_CARD);

  const handleQuickSellCard = async () => {
    try {
      await quickSellCard({
        variables: {
          ownerId: user.id,
          cardId: cardData.id,
          price: cardData.price,
        },
      });
      toast.success("A carta foi vendida!");
    } catch (error) {
      toast.error("Não foi possível realizar a venda rápida");
    }
  };

  return (
    <div className=" border-b border-neutral-200 flex gap-2 justify-between items-center">
      <ToastMessage />
      <Image
        src={cardData.cardImage}
        alt="Card Image"
        width={100}
        height={200}
        className="max-w-[125px] max-h-[250px] w-full h-full"
      />
      <div className="w-full">
        <h1 className="text-xl">{cardData.name}</h1>
        <h2 className="text-[#717171]">{cardData.club} - {cardData.league || "Brasileirão Série A"}</h2>
        <h2 className="flex mt-6 text-sm">
          Valor máximo:
          <span className="flex gap-2 items-center ml-2">
            <Image
              src={"/assets/coins.png"}
              alt="Currency Icon"
              width={12}
              height={12}
              className="w-[12.5px] h-[12.5px]"
            />
            <p className="text-sm">{cardData.maxValue}</p>
          </span>
        </h2>
        <h2 className="flex text-sm">
          Valor mínimo:
          <span className="flex gap-2 items-center ml-2">
            <Image
              src={"/assets/coins.png"}
              alt="Currency Icon"
              width={12}
              height={12}
              className="w-[12.5px] h-[12.5px]"
            />
            <p className="text-sm">{cardData.minValue}</p>
          </span>
        </h2>
      </div>
      <div className="text-white bg-[#5BB5A2] rounded-xl py-2 w-[200px] text-sm text-center cursor-pointer transition-all duration-200 hover:bg-[#57ac99]" onClick={async (e: React.SyntheticEvent) => {
        e.preventDefault()
        await handleQuickSellCard()
      }}>
        Venda Rápida
      </div>
    </div>
  );
};

export default LootCard;
