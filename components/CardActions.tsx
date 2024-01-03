"use client";

import React, { useState } from "react";
import Popup from "./config/Popup";
import { GeneratedCardProps } from "@/types";
import Image from "next/image";

const CardActions = ({
  cardData,
  showState,
  showSellingOptions
}: {
  cardData: GeneratedCardProps;
  showState: any;
  showSellingOptions: any;
}) => {

  return (
    <Popup
      state={showState}
      title={`Informações de ${cardData.name}`}
      description="Aqui é possível ver algumas informações do jogador de maneira detalhada, como sua velocidade, finalizaçao, defesa, físico, preço, liga, clube, etc. Boa análise!"
    >
      <div className="flex justify-between gap-10 pt-8 pb-8 max-h-[1000px] overflow-y-scroll">
        <div className="w-full flex justify-center">
          <Image
            src={cardData.cardImage}
            alt="Card Image"
            width={185}
            height={250}
            className="max-w-[185px] max-h-[250px] w-full h-full selection:bg-transparent"
          />
        </div>
        <div className="w-full">
          <h1 className="font-bold mb-2">Informações básicas</h1>
          <h2 className="text-[#717171]">
            Nome: <span>{cardData.name}</span>
          </h2>
          <h2 className="text-[#717171]">
            Clube: <span>{cardData.club}</span>
          </h2>
          <h2 className="text-[#717171]">
            Liga: <span>{cardData.league}</span>
          </h2>

          <h1 className="font-bold mb-2 mt-6">Habilidades</h1>
          <div className="w-full flex justify-between">
            <div className="w-full">
              <h2 className="text-[#717171]">
                Ritmo: <span>{cardData.pace}</span>
              </h2>
              <h2 className="text-[#717171]">
                Finalização: <span>{cardData.finalization}</span>
              </h2>
              <h2 className="text-[#717171]">
                Passe: <span>{cardData.pass}</span>
              </h2>
            </div>
            <div className="w-full">
              <h2 className="text-[#717171]">
                Drible: <span>{cardData.drible}</span>
              </h2>
              <h2 className="text-[#717171]">
                Defesa: <span>{cardData.defense}</span>
              </h2>
              <h2 className="text-[#717171]">
                Físico: <span>{cardData.physic}</span>
              </h2>
            </div>
          </div>

          <h1 className="font-bold mb-2 mt-6">Valor do Jogador</h1>
          <h2 className="text-[#717171] flex">
            Valor Mínimo:
            <span className="flex gap-2 items-center ml-2">
              <Image
                src={"/assets/coins.png"}
                alt="Currency Icon"
                width={12.5}
                height={12.5}
                className="w-[12.5px] h-[12.5px]"
              />
              <p>{cardData.minValue}</p>
            </span>
          </h2>
          <h2 className="text-[#717171] flex">
            Valor Máximo:
            <span className="flex gap-2 items-center ml-2">
              <Image
                src={"/assets/coins.png"}
                alt="Currency Icon"
                width={12.5}
                height={12.5}
                className="w-[12.5px] h-[12.5px]"
              />
              <p>{cardData.maxValue}</p>
            </span>
          </h2>
          <h2 className="text-[#717171] flex">
            Venda Rápida:
            <span className="flex gap-2 items-center ml-2">
              <Image
                src={"/assets/coins.png"}
                alt="Currency Icon"
                width={12.5}
                height={12.5}
                className="w-[12.5px] h-[12.5px]"
              />
              <p>{cardData.quickSellValue}</p>
            </span>
          </h2>
        </div>
      </div>
      <div className="bg-indigo-600 text-white rounded-xl py-3 px-4 text-center cursor-pointer mt-10" onClick={() => {
        showState(false)
        showSellingOptions(true)
      }}>
        Vender Jogador no Mercado
      </div>
      <div className="text-indigo-600 border border-indigo-600 rounded-xl py-3 px-4 text-center cursor-pointer mt-6">
        Venda Rápida
      </div>
    </Popup>
  );
};

export default CardActions;
