"use client";

import { GeneratedCardProps } from "@/types";
import React, { useState } from "react";
import Popup from "./config/Popup";
import ToastMessage from "./config/ToastMessage";
import { infoUser } from "@/contexts/UserContext";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { SELL_CARD } from "@/graphql/mutations";

const SellCard = ({
  cardData,
  showState,
  showPlayerState,
  refetch,
}: {
  cardData: GeneratedCardProps;
  showState: any;
  showPlayerState: any;
  refetch?: any;
}) => {
  const { user } = infoUser();

  const [sellCard] = useMutation(SELL_CARD);

  const [cardValue, setCardValue] = useState<string>();

  const handleSellCard = async () => {
    if (cardData.selling === false && cardData.owner === user.id) {
      try {
        await sellCard({
          variables: {
            ownerId: cardData.owner,
            newOwnerId: cardData.owner,
            playerId: cardData.id,
            price: Number(cardValue)
          },
        })
        await refetch().then(() => {
          showPlayerState(false);
          showState(false);
          toast.success("O jogador foi anunciado no mercado de transferências");
        });
      } catch (error) {
        console.log(error);
        toast.error("Erro não foi possível anunciar essa carta no mercado");
      }
    } else {
      toast.error("Não é possível vender uma carta que já está sendo vendida");
    }
  };

  return (
    <Popup
      state={showState}
      title={`Informações de ${cardData.name}`}
      description="Aqui é possível ver algumas informações do jogador de maneira detalhada, como sua velocidade, finalizaçao, defesa, físico, preço, liga, clube, etc. Boa análise!"
    >
      <ToastMessage />
      <form
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();
          await handleSellCard();
        }}
        className="w-full py-6 mb-4"
      >
        <label htmlFor="value" className="mb-4">
          Digite o valor que o jogador irá pagar
        </label>
        <input
          type="number"
          name="value"
          id="value"
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg outline-none transition-all duration-300 focus:border-[#5BB5A2]"
          placeholder="Insira o valor que o seu jogador será vendido"
          onChange={(e) => setCardValue(e.target.value)}
          autoComplete="off"
          min={cardData.minValue}
          max={cardData.maxValue}
        />
        <p className="text-[#717171] text-xs ml-1 mt-1">
          Valor max.: {cardData.maxValue}
        </p>

        <button
          className="w-full mt-16 bg-[#5BB5A2] text-white py-3 rounded-full"
          type="submit"
        >
          Vender jogador
        </button>
      </form>
    </Popup>
  );
};

export default SellCard;
