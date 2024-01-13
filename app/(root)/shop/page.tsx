"use client";

import ShowLoot from "@/components/ShowLoot";
import ToastMessage from "@/components/config/ToastMessage";
import { infoUser } from "@/contexts/UserContext";
import {
  OPEN_BRONZE_PACK,
  OPEN_GOLD_PACK,
  OPEN_PLAYERS_PACK,
  OPEN_RARE_GOLD_PACK,
  OPEN_RARE_SILVER_PACK,
  OPEN_SILVER_PACK,
} from "@/graphql/mutations";
import { GeneratedCardProps } from "@/types";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion"
import { slideInFromLeft, slideInFromRight, slideInFromTop } from "@/utils/common/motion";

const page = () => {
  const { user, getUserInfo } = infoUser();

  const [showLoot, setShowLoot] = useState<boolean>(false)
  const [loot, setLoot] = useState<GeneratedCardProps[]>([])
  const [packRarity, setPackRarity] = useState<string>("")

  const [openPlayersPack] = useMutation(OPEN_PLAYERS_PACK);
  const [openRareGoldPack] = useMutation(OPEN_RARE_GOLD_PACK);
  const [openGoldPack] = useMutation(OPEN_GOLD_PACK);
  const [openRareSilverPack] = useMutation(OPEN_RARE_SILVER_PACK);
  const [openSilverPack] = useMutation(OPEN_SILVER_PACK);
  const [openBronzePack] = useMutation(OPEN_BRONZE_PACK);

  const players_pack = async () => {
    try {
      if (user.currency >= 35000 || user.futpoints >= 350) {
        const { data } = await openPlayersPack({
          variables: {
            userId: user.id,
          },
        });
        console.log(data)
        await getUserInfo()
        setLoot(data)
        setShowLoot(true)
        setPackRarity("players_pack")
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      console.log(error);
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  const rare_gold_pack = async () => {
    try {
      if (user.currency >= 10000 || user.futpoints >= 150) {
        const { data } = await openRareGoldPack({
          variables: {
            userId: user.id,
          },
        });
        await getUserInfo()
        setLoot(data)
        setShowLoot(true)
        setPackRarity("rare_gold_pack")
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      console.log(error);
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  const gold_pack = async () => {
    try {
      if (user.currency >= 7500 || user.futpoints >= 100) {
        const { data } = await openGoldPack({
          variables: {
            userId: user.id,
          },
        });
        await getUserInfo()
        setLoot(data)
        setShowLoot(true)
        setPackRarity("gold_pack")
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      console.log(error);
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  const rare_silver_pack = async () => {
    try {
      if (user.currency >= 5000 || user.futpoints >= 75) {
        const { data } = await openRareSilverPack({
          variables: {
            userId: user.id,
          },
        });
        await getUserInfo()
        setLoot(data)
        setShowLoot(true)
        setPackRarity("rare_silver_pack")
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      console.log(error);
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  const silver_pack = async () => {
    try {
      if (user.currency >= 2500 || user.futpoints >= 50) {
        const { data } = await openSilverPack({
          variables: {
            userId: user.id,
          },
        });
        await getUserInfo()
        setLoot(data)
        setShowLoot(true)
        setPackRarity("silver_pack")
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      console.log(error);
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  const bronze_pack = async () => {
    try {
      if (user.currency >= 500) {
        const { data } = await openBronzePack({
          variables: {
            userId: user.id,
          },
        });
        await getUserInfo()
        setLoot(data)
        setShowLoot(true)
        setPackRarity("bronze_pack")
      } else {
        toast.error("Você não tem dinheiro suficiente para abrir esse pacote");
      }
    } catch (error) {
      console.log(error);
      throw new Error("ERRO! Não foi possível abrir o pacote");
    }
  };

  return user.id && (
    <motion.div initial="hidden" animate="visible" className="flex flex-col items-center gap-6 w-full max-w-[1250px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
      <ToastMessage />
      <h1 className="font-bold text-3xl w-full transition-all duration-300 hover:text-indigo-600 cursor-default mt-4">
        Loja de Pacotes
      </h1>
      <p className="text-[#717171]">
        A loja oferece uma infinidade de recursos, pacotes e outras formas de
        adquirir itens atráves de futpoints ou futcoins. É uma excelente forma
        de reforçar seu time, e adquirir jogadores, emblemas e colecionáveis,
        caso você não goste dos itens, você pode vender eles futuramente.
      </p>
      <div className="flex flex-wrap justify-around w-full gap-16 mt-[4em]">
        <motion.div variants={slideInFromTop(0.5)} className="card cursor-pointer" id="especial">
          <div className="img-box">
            <Image
              src={"/assets/rare-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Players Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote recheado somente com jogadores ouro e talvez um
              especial.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              35.000
            </h2>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/points.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              350
            </h2>
            <button className="comprar-produto" onClick={() => players_pack()}>
              Comprar Pacote
            </button>
          </div>
        </motion.div>

        <motion.div variants={slideInFromTop(0.75)} className="card" id="gold">
          <div className="img-box">
            <Image
              src={"/assets/gold-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Rare Gold Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote repleto de jogadores e itens ouro, entre eles, min. 3
              Raros.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              10.000
            </h2>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/points.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              150
            </h2>
            <button
              className="comprar-produto"
              onClick={() => rare_gold_pack()}
            >
              Comprar Pacote
            </button>
          </div>
        </motion.div>

        <motion.div variants={slideInFromTop(1)} className="card" id="gold">
          <div className="img-box">
            <Image
              src={"/assets/gold-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Gold Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote repleto de jogadores e itens ouro, entre eles, min. 1
              Raro.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              7.500
            </h2>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/points.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              100
            </h2>
            <button className="comprar-produto" onClick={() => gold_pack()}>
              Comprar Pacote
            </button>
          </div>
        </motion.div>

        <motion.div variants={slideInFromTop(1.25)} className="card" id="silver">
          <div className="img-box">
            <Image
              src={"/assets/silver-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Rare Silver Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote repleto de jogadores e itens prata, entre eles, min. 3
              Raros.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              5.000
            </h2>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/points.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              75
            </h2>
            <button
              className="comprar-produto"
              onClick={() => rare_silver_pack()}
            >
              Comprar Pacote
            </button>
          </div>
        </motion.div>

        <motion.div variants={slideInFromTop(1.5)} className="card" id="silver">
          <div className="img-box">
            <Image
              src={"/assets/silver-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Silver Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote repleto de jogadores e itens prata, entre eles, min. 1
              Raro.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              2.500
            </h2>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/points.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              50
            </h2>
            <button className="comprar-produto" onClick={() => silver_pack()}>
              Comprar Pacote
            </button>
          </div>
        </motion.div>

        <motion.div variants={slideInFromTop(1.75)} className="card" id="bronze">
          <div className="img-box">
            <Image
              src={"/assets/bronze-pack.png"}
              alt="Package Photo"
              width={135}
              height={135}
            />
          </div>
          <div className="content-box">
            <h3 className="titulo-produto-loja">Bronze Pack</h3>
            <p className="descricao-produto-loja">
              Um pacote repleto de jogadores e itens bronze, entre eles, min. 3
              Raros.
            </p>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              500
            </h2>
            <h2 className="preco-produto-loja flex items-center gap-2">
              <Image
                src={"/assets/points.png"}
                alt="Price Icon"
                width={25}
                height={25}
              />
              25
            </h2>
            <button className="comprar-produto" onClick={() => bronze_pack()}>
              Comprar Pacote
            </button>
          </div>
        </motion.div>
      </div>

      {showLoot && (
        <ShowLoot loot={loot} showState={setShowLoot} packRarity={packRarity} />
      )}

    </motion.div>
  );
};

export default page;
