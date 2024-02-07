"use client";

import React, { useState } from "react";
import Popup from "./config/Popup";
import { infoUser } from "@/contexts/UserContext";
import { useMutation } from "@apollo/client";
import {
  OPEN_BRONZE_PACK,
  OPEN_GOLD_PACK,
  OPEN_PLAYERS_PACK,
  OPEN_RARE_GOLD_PACK,
  OPEN_RARE_SILVER_PACK,
  OPEN_SILVER_PACK,
} from "@/graphql/mutations";
import { toast } from "react-toastify";
import ToastMessage from "./config/ToastMessage";
import Image from "next/image";

type PaymentOptionsProps = {
  showState: any;
  futpoints: number;
  coins: number;
  packType: string;
  showLoot: any;
  loot: any;
  packRarity: any;
};

const PaymentOptions = ({
  showState,
  futpoints,
  coins,
  packType,
  showLoot,
  loot,
  packRarity,
}: PaymentOptionsProps) => {
  const { user, getUserInfo } = infoUser();

  const [openPlayersPack] = useMutation(OPEN_PLAYERS_PACK);
  const [openRareGoldPack] = useMutation(OPEN_RARE_GOLD_PACK);
  const [openGoldPack] = useMutation(OPEN_GOLD_PACK);
  const [openRareSilverPack] = useMutation(OPEN_RARE_SILVER_PACK);
  const [openSilverPack] = useMutation(OPEN_SILVER_PACK);
  const [openBronzePack] = useMutation(OPEN_BRONZE_PACK);

  const handleOpenPack = async (method: string) => {
    if (packType === "players_pack") {
      await players_pack(method);
      showState(false);
    }
    if (packType === "gold_rare_pack") {
      await rare_gold_pack(method);
      showState(false);
    }
    if (packType === "gold_pack") {
      await gold_pack(method);
      showState(false);
    }
    if (packType === "rare_silver_pack") {
      await rare_silver_pack(method);
      showState(false);
    }
    if (packType === "silver_pack") {
      await silver_pack(method);
      showState(false);
    }
    if (packType === "bronze_pack") {
      await bronze_pack(method);
      showState(false);
    }
  };

  const players_pack = async (paymentMethod: string) => {
    try {
      if (user.currency >= 35000 || user.futpoints >= 350) {
        const { data } = await openPlayersPack({
          variables: {
            userId: user.id,
            method: paymentMethod,
          },
        });
        await getUserInfo();
        loot(data);
        showLoot(true);
        packRarity("players_pack");
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  const rare_gold_pack = async (paymentMethod: string) => {
    try {
      if (user.currency >= 10000 || user.futpoints >= 150) {
        const { data } = await openRareGoldPack({
          variables: {
            userId: user.id,
            method: paymentMethod,
          },
        });
        await getUserInfo();
        loot(data);
        showLoot(true);
        packRarity("rare_gold_pack");
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  const gold_pack = async (paymentMethod: string) => {
    try {
      if (user.currency >= 7500 || user.futpoints >= 100) {
        const { data } = await openGoldPack({
          variables: {
            userId: user.id,
            method: paymentMethod,
          },
        });
        await getUserInfo();
        loot(data);
        showLoot(true);
        packRarity("gold_pack");
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  const rare_silver_pack = async (paymentMethod: string) => {
    try {
      if (user.currency >= 5000 || user.futpoints >= 75) {
        const { data } = await openRareSilverPack({
          variables: {
            userId: user.id,
            method: paymentMethod,
          },
        });
        await getUserInfo();
        loot(data);
        showLoot(true);
        packRarity("rare_silver_pack");
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  const silver_pack = async (paymentMethod: string) => {
    try {
      if (user.currency >= 2500 || user.futpoints >= 50) {
        const { data } = await openSilverPack({
          variables: {
            userId: user.id,
            method: paymentMethod,
          },
        });
        await getUserInfo();
        loot(data);
        showLoot(true);
        packRarity("silver_pack");
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  const bronze_pack = async (paymentMethod: string) => {
    try {
      if (user.currency >= 500) {
        const { data } = await openBronzePack({
          variables: {
            userId: user.id,
            method: paymentMethod,
          },
        });
        await getUserInfo();
        loot(data);
        showLoot(true);
        packRarity("bronze_pack");
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      console.log(error)
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  return (
    <Popup
      title="Escolha o método de Pagamento"
      description="Você pode escolher de qual maneira irá pagar o pacote, você pode optar em utilizar seus coins ou seus pifa points para realizar tal ação."
      state={showState}
    >
      <ToastMessage />
      <div className="mt-10 flex gap-12 items-center justify-between w-full py-12">
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col w-full items-center">
            <h3 className="mb-2 text-xl">Pagar com moedas</h3>
            <h2
              className="preco-produto-loja flex items-center gap-2 p-6 bg-slate-300 rounded-xl w-full justify-center cursor-pointer"
              onClick={async () => {
                await handleOpenPack("coins");
              }}
            >
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              {coins}
            </h2>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col w-full items-center">
            <h3 className="text-xl mb-2">Pagar com Futpoints</h3>
            <h2
              className="preco-produto-loja flex items-center gap-2 p-6 bg-slate-300 rounded-xl w-full justify-center cursor-pointer"
              onClick={async () => {
                await handleOpenPack("fut-points");
              }}
            >
              <Image
                src={"/assets/points.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              {futpoints}
            </h2>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default PaymentOptions;
