"use client";

import ShowLoot from "@/components/ShowLoot";
import ToastMessage from "@/components/config/ToastMessage";
import { infoUser } from "@/contexts/UserContext";
import { GeneratedCardProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { slideInFromTop } from "@/utils/common/motion";
import PaymentOptions from "@/components/PaymentOptions";

const page = () => {
  const { user, getUserInfo } = infoUser();

  const [loot, setLoot] = useState<GeneratedCardProps[]>([]);
  const [packRarity, setPackRarity] = useState<string>("");
  const [showLoot, setShowLoot] = useState<boolean>(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState<boolean>(false);

  const [coinsPrice, setCoinsPrice] = useState<number>(0);
  const [futPointsPrice, setFutPointsPrice] = useState<number>(0);
  const [currentPack, setCurrentPack] = useState<string>("");

  return (
    user.id && (
      <motion.div
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6 w-full max-w-[1250px] bg-white p-10 rounded-xl shadow-md sm:mt-[50px] mt-[150px] shadow-neutral-300 border border-neutral-100"
      >
        <ToastMessage />
        <h1 className="font-bold text-3xl w-full transition-all duration-300 hover:text-[#5BB5A2] cursor-default mt-4">
          Loja de Pacotes
        </h1>
        <p className="text-[#717171]">
          A loja oferece uma infinidade de recursos, pacotes e outras formas de
          adquirir itens atráves de futpoints ou futcoins. É uma excelente forma
          de reforçar seu time, e adquirir jogadores, emblemas e colecionáveis,
          caso você não goste dos itens, você pode vender eles futuramente.
        </p>
        <div className="flex flex-wrap justify-around w-full gap-16 mt-[4em]">
          <motion.div
            variants={slideInFromTop(0.5)}
            className="card cursor-pointer"
            id="especial"
          >
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
              <button
                className="comprar-produto"
                onClick={() => {
                  setShowPaymentOptions(!showPaymentOptions);
                  setCoinsPrice(35000);
                  setFutPointsPrice(350);
                  setCurrentPack("players_pack");
                }}
              >
                Comprar Pacote
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={slideInFromTop(0.75)}
            className="card"
            id="gold"
          >
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
                onClick={() => {
                  setShowPaymentOptions(!showPaymentOptions);
                  setCoinsPrice(10000);
                  setFutPointsPrice(150);
                  setCurrentPack("gold_rare_pack");
                }}
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
              <button
                className="comprar-produto"
                onClick={() => {
                  setShowPaymentOptions(!showPaymentOptions);
                  setCoinsPrice(7500);
                  setFutPointsPrice(100);
                  setCurrentPack("gold_pack");
                }}
              >
                Comprar Pacote
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={slideInFromTop(1.25)}
            className="card"
            id="silver"
          >
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
                onClick={() => {
                  setShowPaymentOptions(!showPaymentOptions);
                  setCoinsPrice(5000);
                  setFutPointsPrice(75);
                  setCurrentPack("silver_rare_pack");
                }}
              >
                Comprar Pacote
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={slideInFromTop(1.5)}
            className="card"
            id="silver"
          >
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
              <button
                className="comprar-produto"
                onClick={() => {
                  setShowPaymentOptions(!showPaymentOptions);
                  setCoinsPrice(2500);
                  setFutPointsPrice(50);
                  setCurrentPack("silver_pack");
                }}
              >
                Comprar Pacote
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={slideInFromTop(1.75)}
            className="card"
            id="bronze"
          >
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
                Um pacote repleto de jogadores e itens bronze, entre eles, min.
                3 Raros.
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
              <button
                className="comprar-produto"
                onClick={() => {
                  setShowPaymentOptions(!showPaymentOptions);
                  setCoinsPrice(500);
                  setFutPointsPrice(25);
                  setCurrentPack("bronze_pack");
                }}
              >
                Comprar Pacote
              </button>
            </div>
          </motion.div>
        </div>

        {showLoot && (
          <ShowLoot
            loot={loot}
            showState={setShowLoot}
            packRarity={packRarity}
          />
        )}

        {showPaymentOptions && (
          <PaymentOptions
            showState={setShowPaymentOptions}
            futpoints={futPointsPrice}
            coins={coinsPrice}
            packType={currentPack}
            showLoot={setShowLoot}
            loot={setLoot}
            packRarity={setPackRarity}
          />
        )}
      </motion.div>
    )
  );
};

export default page;
