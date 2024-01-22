"use client";

import ToastMessage from "@/components/config/ToastMessage";
import BadgesMarket from "@/components/market/BadgesMarket";
import PlayersMarket from "@/components/market/PlayersMarket";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const page = () => {
  const [search, setSearch] = useState<string>("");
  
  const [playersMarket, setPlayersMarket] = useState<boolean>(true)
  const [badgesMarket, setBadgesMarket] = useState<boolean>(false)

  return (
      <div className="flex items-center gap-6 w-full max-w-[1025px] sm:mt-[2em] flex-col mt-[150px]">
      <div className="flex gap-6 items-center w-full justify-between">
        <div
          className="w-full border border-neutral-200 rounded-full px-4 py-2 flex justify-center bg-white cursor-pointer transition-all duration-300 hover:bg-[#5BB5A2] hover:text-white text-center sm:text-base text-sm"
          onClick={() => {
            setPlayersMarket(true)
            setBadgesMarket(false)
          }}
        >
          Comprar Jogadores
        </div>
        <div
          className="w-full border border-neutral-200 rounded-full px-4 py-2 flex justify-center bg-white cursor-pointer transition-all duration-300 hover:bg-[#5BB5A2] hover:text-white text-center sm:text-base text-sm"
          onClick={() => {
            setPlayersMarket(false)
            setBadgesMarket(true)
          }}
        >
          Comprar Emblemas
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 w-full max-w-[1250px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
        <ToastMessage />
        <h1 className="text-3xl font-bold w-full transition-all duration-300 hover:text-[#5BB5A2] cursor-default mt-4">
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
        {playersMarket && (
          <PlayersMarket />
        )}

        {badgesMarket && (
          <BadgesMarket />
        )}
      </div>
      </div>
  );
};

export default page;
