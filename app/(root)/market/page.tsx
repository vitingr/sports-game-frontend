"use client";

import Image from "next/image";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const page = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[1250px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
      <h1 className="text-3xl font-bold w-full transition-all duration-300 hover:text-indigo-600 cursor-default mt-4">Mercado de Transferências</h1>
      <p className="text-[#717171]">No mercado de transferências é possível vender e comprar as cartas que você deseja possuir e inserir em seus elencos, é uma excelente forma de adquirir uma boa economia para seu clube, ou reforça-lo em busca de uma maior número de vitórias em batalhas competitivas. Boas negociações!</p>
      <div className="flex items-center w-full gap-2 mt-10">
        <input
          type="text"
          name="search"
          id="search"
          autoComplete="off"
          placeholder="Qual jogador você está procurando?"
          minLength={1}
          maxLength={40}
          className="outline-none py-2 px-4 w-full border-b border-neutral-200 text-sm text-[#717171] bg-transparent"
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearch className="gray-icon cursor-pointer" size={25} />
      </div>
      <div className="flex flex-wrap w-full gap-10 mt-12 justify-start">
        <div className="w-[225px] h-[300px] rounded-xl flex flex-col items-center">
          <img
            src="https://clubedovideogame.com.br/wp-content/uploads/2023/12/FIFA-24-Vini-Jr.png"
            alt="Player Card"
            className="max-w-[130px] max-h-[180px] w-full h-full"
          />
          <div className="w-full flex flex-col items-center">
            <h1 className="font-bold">Neymar Jr.</h1>
            <p className="text-sm text-[#717171]">Time do Vitinho</p>
            <div className="flex gap-2 items-center">
              <Image
                src={"/assets/coins.png"}
                alt="Price Icon"
                width={20}
                height={20}
              />
              <span>500</span>
            </div>
            <div className="text-white bg-indigo-600 w-full rounded-full py-1 mt-6 cursor-pointer text-center text-sm">
              Comprar Já
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
