"use client";

import ToastMessage from "@/components/config/ToastMessage";
import { infoUser } from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  const { user } = infoUser();

  return (
    <div className="flex items-center gap-6 w-full max-w-[1025px] sm:mt-[2em] flex-col mt-[150px]">
      <div className="flex flex-col items-center gap-6 w-full max-w-[1250px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
        <ToastMessage />
        <h1 className="mb-12 text-3xl font-bold w-full transition-all duration-300 hover:text-[#5BB5A2] cursor-default mt-4">
          Desafios do FUT
        </h1>

        <div className="flex w-full gap-10 flex-wrap">
          <div className="w-[300px] bg-[#fafafa] border-t-2 border-emerald-600 h-[300px] p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl">Quiz do Brasileirão</h2>
              <p className="text-sm text-[#717171]">
                Responda um quiz para ganhar recompensas e melhorar o seu time
              </p>
            </div>

            <div className="mt-8 w-full">
              <h2>Recompensas</h2>
              <p className="preco-produto-loja flex items-center gap-2 text-sm text-[#717171] mt-2">
                <Image
                  src={"/assets/coins.png"}
                  alt="Price Icon"
                  width={17.5}
                  height={17.5}
                />
                500 moedas
              </p>
            </div>

            <div className="h-full flex justify-end items-end">
              <Link href={"/challenges/brasileirao"} className="mt-6 w-full p-3 text-center bg-emerald-500 text-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-emerald-600">
                Fazer Desafio
              </Link>
            </div>
          </div>

          <div className="w-[300px] bg-[#fafafa] border-t-2 border-emerald-600 h-[300px] p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl">Quiz Global</h2>
              <p className="text-sm text-[#717171]">
                Responda um quiz para ganhar recompensas e melhorar o seu time
              </p>
            </div>

            <div className="mt-8 w-full">
              <h2>Recompensas</h2>
              <p className="preco-produto-loja flex items-center gap-2 text-sm text-[#717171] mt-2">
                <Image
                  src={"/assets/coins.png"}
                  alt="Price Icon"
                  width={17.5}
                  height={17.5}
                />
                750 moedas
              </p>
            </div>

            <div className="h-full flex justify-end items-end">
              <Link href={"/challenges/global"} className="mt-6 w-full p-3 text-center bg-emerald-500 text-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-emerald-600">
                Fazer Desafio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
