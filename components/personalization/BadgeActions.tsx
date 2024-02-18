"use client";

import React, { useState } from "react";
import Popup from "../config/Popup";
import { useMutation } from "@apollo/client";
import { CHANGE_CLUB_BADGE, QUICK_SELL_BADGE, SELL_BADGE } from "@/graphql/mutations";
import { toast } from "react-toastify";
import { infoUser } from "@/contexts/UserContext";
import ToastMessage from "../config/ToastMessage";
import { GeneratedBadgeProps } from "@/types";

const BadgeActions = ({
  state,
  currentBadge,
  refetch,
}: {
  state: any;
  currentBadge: GeneratedBadgeProps | any;
  refetch: any;
}) => {
  const { user, getUserInfo } = infoUser();

  const [quickSellBadge] = useMutation(QUICK_SELL_BADGE)

  const [changeClubBadge] = useMutation(CHANGE_CLUB_BADGE);
  const [sellClubBadge] = useMutation(SELL_BADGE);

  const [sellBadge, setSellBadge] = useState<boolean>(false);
  const [useBadge, setUseBadge] = useState<boolean>(false);
  const [badgeValue, setBadgeValue] = useState<string>();

  const handleQuickSellBadge = async () => {
    try {
      await quickSellBadge({
        variables: {
          badgeId: currentBadge.id,
          ownerId: user.id,
          price: currentBadge.quickSellValue
        }
      })
      await refetch().then(() => {
        toast.success("O emblema do clube foi vendido com sucesso!");
        state(false);
      });
    } catch (error) { 
      toast.error("Não foi possível realizar a venda rápida do emblema")
    }
  }

  const handleChangeClubBadge = async () => {
    try {
      await changeClubBadge({
        variables: {
          userId: user.id,
          clubBadge: currentBadge.id,
          badgeImage: currentBadge.badgeImage
        },
      });
      await getUserInfo().then(() => {
        toast.success("O emblema do clube foi alterado com sucesso!");
        state(false);
      });
    } catch (error) {
      toast.error("Não foi possível atualizar o emblema do clube");
    }
  };

  const handleSellBadge = async () => {
    try {
      await sellClubBadge({
        variables: {
          id: currentBadge.id,
          price: Number(badgeValue),
          ownerId: user.id
        },
      });
      await refetch().then(() => {
        toast.success("SUCESSO! O emblema foi anunciado no mercado");
        state(false);
      });
    } catch (error) {
      toast.error(
        "Não foi possível vender o emblema no mercado de transferências"
      );
    }
  };

  return (
    <Popup
      title="Ações do Emblema"
      description="Você pode vender ou utilizar os emblemas na qual você possui, abaixo você pode ver algumas ações para realizar"
      state={state}
    >
      {!sellBadge && !useBadge && (
        <>
          <div
            className="bg-[#5BB5A2] text-white w-full rounded-xl cursor-pointer py-3 text-center"
            onClick={() => handleChangeClubBadge()}
          >
            Tornar emblema atual
          </div>
          <div
            className="text-[#5BB5A2] border border-[#5BB5A2] w-full rounded-xl cursor-pointer py-3 mt-6 text-center"
            onClick={() => setSellBadge(true)}
          >
            Vender Emblema
          </div>
        </>
      )}

      {sellBadge && (
        <Popup
          state={setSellBadge}
          title={`Vender Emblema`}
          description="Ao vender um emblema ele ficará disponível para comprar na loja, ou seja, qualquer jogador pode adquiri-lo, inclusive você novamente, porém não se pode voltar atrás depois!"
        >
          <ToastMessage />
          <form
            onSubmit={async (e: React.SyntheticEvent) => {
              e.preventDefault();
              await handleSellBadge();
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
              placeholder="Insira o valor que o seu emblema será vendido"
              onChange={(e) => setBadgeValue(e.target.value)}
              autoComplete="off"
              min={currentBadge.minValue}
              max={currentBadge.maxValue}
            />
            <p className="text-[#717171] text-xs ml-1 mt-1">
              Valor max.: {currentBadge.maxValue}
            </p>

            <button
              className="w-full mt-16 bg-[#5BB5A2] text-white py-2 rounded-2xl"
              type="submit"
            >
              Vender Emblema
            </button>
            <div className="w-full mt-6 text-[#5BB5A2] border border-[#5BB5A2] py-2 rounded-2xl text-center cursor-pointer" onClick={async () => await handleQuickSellBadge()}>
              Venda Rápida
            </div>
          </form>
        </Popup>
      )}
    </Popup>
  );
};

export default BadgeActions;
