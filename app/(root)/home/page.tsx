"use client";

import DoughnutChart from "@/components/config/DoughnutChart";
import { infoUser } from "@/contexts/UserContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

const page = () => {
  const { user } = infoUser();

  const [userMatchesStats, setUserMatchesStats] = useState<any>();

  const config = {
    type: "doughnut",
  };

  useEffect(() => {
    if (user.id !== undefined) {
      setUserMatchesStats({
        labels: ["Vitórias", "Empates", "Derrotas"],
        datasets: [
          {
            label: "Índice de Vitórias em Partidas",
            data: [3, 1, 2],
            backgroundColor: ["#5549A6", "#7553A6", "#A47ED9"],
            hoverOffset: 4,
          },
        ],
      });
    }
  }, [user]);

  return (
    userMatchesStats && (
      <div className="w-full flex flex-col items-center gap-6 max-w-[1250px] mt-[3em]">
        <section className="w-full mt-[2.5em]">
          <Image src={"/assets/future-stars.jpg"} alt="Main Menu News Image" width={1250} height={650} className="w-full h-full max-h-[650px] max-w-[1250px] rounded-xl" />
        </section>

        <section className="flex justify-between gap-8 w-full mt-[6.5em] flex-wrap">
          <div className="w-full bg-white p-8 rounded-b-xl border-t-2 border-t-indigo-600 border border-neutral-100 shadow-sm shadow-neutral-200 min-h-[300px] flex gap-12 sm:flex-row flex-col items-center">
            <DoughnutChart chartOptions={config} chartData={userMatchesStats} />
            <div className="w-full">
              <div className="w-full">
                <h1 className="text-xl mb-6 font-semibold">
                  Suas Estatísticas
                </h1>
                <p className="text-[#717171] mt-1">
                  Total de Partidas Jogadas:{" "}
                  <span>
                    {user.victories + user.draws + user.loses} partidas
                  </span>
                </p>
                <p className="text-[#717171] mt-1">
                  Total de Vitórias: <span>{user.victories} vitórias</span>
                </p>
                <p className="text-[#717171] mt-1">
                  Total de Empates: <span>{user.draws} empates</span>
                </p>
                <p className="text-[#717171] mt-1">
                  Total de Derrotas: <span>{user.loses} derrotas</span>
                </p>
              </div>
              <div className="mt-6 w-full">
                <h1 className="text-xl font-semibold mb-4">Seus Pontos</h1>
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 to-slate-600 uppercase">
                  {user.points} pontos
                </span>
              </div>
            </div>
          </div>
          <div className="max-w-[450px] w-full bg-white rounded-b-xl border-t-2 border-t-indigo-600 p-8 border border-neutral-100 shadow-sm shadow-neutral-200 min-h-[300px]">
            <h1 className="text-xl font-semibold">Ranking Global</h1>
            <ul className="list-none mt-6">
              <li className="py-2 mb-2 border-b border-neutral-100 tracking-wider flex justify-between w-full">
                <div className="w-full">
                  <h2>1. TROPA DO CALVO (Vitinho)</h2>
                </div>
                <div className="flex justify-end">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-700 to-red-700">
                    23.450
                  </span>
                </div>
              </li>
              <li className="py-2 mb-2 border-b border-neutral-100 tracking-wider flex justify-between w-full">
                <div className="w-full">
                  <h2>2. Manchester Not United (Você)</h2>
                </div>
                <div className="flex justify-end">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 to-slate-600">
                    0
                  </span>
                </div>
              </li>
            </ul>
            <div className="text-white py-2 w-full bg-indigo-600 rounded-full cursor-pointer text-center mt-28 ">
              Ver Ranking Completo
            </div>
          </div>
        </section>

        <section className="w-full mt-[6.5em] flex justify-around gap-10 flex-wrap">
          <div className="bg-white rounded-xl p-8 border border-neutral-100 shadow-sm shadow-neutral-200 flex flex-col items-center w-full h-[300px] cursor-pointer transition-all duration-300 hover:scale-105">
            <h1 className="text-3xl mt-2 font-bold">Loja</h1>
            <p className="text-[#717171] mt-2 text-center">
              A loja oferece diversos pacotes de cartas e colecionáveis, caso
              esteja precisando de algo, considere ela.
            </p>
            <RiShoppingCartLine size={50} className="gray-icon mt-10" />
          </div>
          <div className="bg-white rounded-xl p-8 border border-neutral-100 shadow-sm shadow-neutral-200 flex flex-col items-center w-full h-[300px] cursor-pointer transition-all duration-300 hover:scale-105">
            <h1 className="text-3xl mt-2 font-bold">Mercado</h1>
            <p className="text-[#717171] mt-2 text-center">
              Compre e venda cartas de acordo com as suas necessidades, é uma
              excelente maneira de melhorar seu time.
            </p>
            <BsShop size={50} className="gray-icon mt-10" />
          </div>
          <div className="bg-white rounded-xl p-8 border border-neutral-100 shadow-sm shadow-neutral-200 flex flex-col items-center w-full h-[300px] cursor-pointer transition-all duration-300 hover:scale-105">
            <h1 className="text-3xl mt-2 font-bold">Elencos</h1>
            <p className="text-[#717171] mt-2 text-center">
              Veja seus elencos e suas formações mais recentes, edite-as e as
              reforçe para buscar o maior número de vitórias possível.
            </p>
            <FiUser size={50} className="gray-icon mt-10" />
          </div>
        </section>

        <section className="w-full flex justify-between gap-6 bg-white rounded-b-xl border-t-2 border-t-indigo-600 p-10 border border-neutral-100 shadow-sm shadow-neutral-200 mt-[6.5em]">
          <div className="w-full">
            <h1 className="text-3xl font-bold">
              Desafios de Montagem de Elenco
            </h1>
            <p className="text-[#717171] text-justify">
              Nos Desafios de montagem de elenco é possível trocar cartas de
              jogadores que você já possui com base em alguns requisitos. Você
              poderá receber, futcoins, pacotes e excelentes recompensas para
              completar seu time ao realizar esses desafios. Boa sorte!
            </p>
            <div className="mt-20 bg-[#36be6f] text-white rounded-full w-full py-2 cursor-pointer text-center">
              Ver Todos os Desafios
            </div>
          </div>
          <div className="w-full justify-center items-center sm:flex hidden">
            <Image
              src={"/assets/rare-pack.png"}
              alt="Rare Pack"
              width={150}
              height={150}
            />
          </div>
        </section>

        {/* Lineups */}

        {/* Anunciar / Vender Cartas (Cards Flex) */}
      </div>
    )
  );
};

export default page;
