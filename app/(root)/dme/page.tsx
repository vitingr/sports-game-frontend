"use client";

import ToastMessage from "@/components/config/ToastMessage";
import Challenge1 from "@/components/dmes/Challenge1";
import Challenge2 from "@/components/dmes/Challenge2";
import { infoUser } from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GrValidate } from "react-icons/gr";

const page = () => {
  const { user, getUserInfo } = infoUser();

  const [showChallenge1, setShowChallenge1] = useState<boolean>(false);
  const [showChallenge2, setShowChallenge2] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-6 w-full max-w-[1025px] sm:mt-[2em] flex-col mt-[150px]">
      <div className="flex flex-col items-center gap-6 w-full max-w-[1250px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
        <ToastMessage />
        <h1 className="mb-12 text-3xl font-bold w-full transition-all duration-300 hover:text-[#5BB5A2] cursor-default mt-4">
          Desafios de Montagem de Elencos
        </h1>

        <div className="flex w-full gap-10 flex-wrap">
          <div className="w-[300px] bg-[#fafafa] border-t-2 border-emerald-600 h-[350px] p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl">DME Jogadores Sortidos</h2>
              {user?.dmeCompleted?.includes("challenge1") ? (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <GrValidate
                      size={10}
                      className="green-icon cursor-pointer"
                    />
                    <h3 className="text-emerald-500 text-xs">
                      Você já realizou esse quiz
                    </h3>
                  </div>
                  <p className="text-sm text-[#717171]">
                    Não é possível realizar um desafio de DME múltiplas vezes!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#717171]">
                    Responda um quiz para ganhar recompensas e melhorar o seu
                    time
                  </p>
                  <h3 className="text-emerald-500 text-sm mt-6">
                    Troque 3 jogadores de ligas diferentes para ganhar uma
                    recompensa
                  </h3>
                </>
              )}
            </div>

            <div className="mt-8 w-full">
              <h2>Recompensas</h2>
              <p className="preco-produto-loja flex items-center gap-2 text-sm text-[#717171] mt-2 h-[40px]">
                <Image
                  src={"/assets/coins.png"}
                  alt="Price Icon"
                  width={17.5}
                  height={17.5}
                />
                1000 moedas
              </p>
            </div>

            <div className="h-full flex justify-end items-end">
              {user?.dmeCompleted?.includes("challenge1") ? (
                <div className="mt-6 w-full p-3 text-center bg-neutral-300 text-white cursor-not-allowed rounded-lg">
                  Fazer Desafio
                </div>
              ) : (
                <div
                  className="mt-6 w-full p-3 text-center bg-emerald-500 text-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-emerald-600"
                  onClick={() => setShowChallenge1(!showChallenge1)}
                >
                  Fazer Desafio
                </div>
              )}
            </div>
          </div>

          <div className="w-[300px] bg-[#fafafa] border-t-2 border-emerald-600 h-[350px] p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl">DME Jogador Especial</h2>
              {user?.dmeCompleted?.includes("challenge2") ? (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    <GrValidate
                      size={10}
                      className="green-icon cursor-pointer"
                    />
                    <h3 className="text-emerald-500 text-xs">
                      Você já realizou esse quiz
                    </h3>
                  </div>
                  <p className="text-sm text-[#717171]">
                    Não é possível realizar um desafio de DME múltiplas vezes!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#717171]">
                    Responda um quiz para ganhar recompensas e melhorar o seu
                    time
                  </p>
                  <h3 className="text-emerald-500 text-sm mt-6">
                    Troque 3 jogadores do brasileirão, sendo um deles ouro com
                    geral +76
                  </h3>
                </>
              )}
            </div>

            <div className="mt-8 w-full">
              <h2>Recompensas</h2>
              <p className="preco-produto-loja flex items-center gap-2 text-sm text-[#717171] mt-2 h-[40px]">
                <Image
                  src={"/assets/special-card.webp"}
                  alt="Price Icon"
                  width={17.5}
                  height={17.5}
                />
                1x Jogador Especial
              </p>
            </div>

            <div className="h-full flex justify-end items-end">
              {user?.dmeCompleted?.includes("challenge2") ? (
                <div className="mt-6 w-full p-3 text-center bg-neutral-300 text-white rounded-lg cursor-not-allowed">
                  Fazer Desafio
                </div>
              ) : (
                <div className="mt-6 w-full p-3 text-center bg-emerald-500 text-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-emerald-600" onClick={() => setShowChallenge2(!showChallenge2)}>
                  Fazer Desafio
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showChallenge1 && (
        <Challenge1 handleRefetch={getUserInfo} showState={setShowChallenge1} />
      )}

      {showChallenge2 && (
        <Challenge2 handleRefetch={getUserInfo} showState={setShowChallenge2} />
      )}
    </div>
  );
};

export default page;
