"use client";

import DoughnutChart from "@/components/config/DoughnutChart";
import { infoUser } from "@/contexts/UserContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useMutation } from "@apollo/client";
import { HOME_DRIVER } from "@/graphql/mutations";
import { socket, socketProvider } from "@/contexts/WebSocketContext";
import { toast } from "react-toastify";
import ToastMessage from "@/components/config/ToastMessage";

const page = () => {
  const { user } = infoUser();

  const [updateHomeDriver] = useMutation(HOME_DRIVER);

  const handleSearchMatch = async () => {
    try {
      socket.emit("searchMatch", {
        id: user.id as string,
      });
      toast.success("Buscando partida");
    } catch (error) {
      console.log(error);
    }
  };

  const viewDriverHome = async () => {
    try {
      await updateHomeDriver({
        variables: {
          id: user.id,
        },
      });
    } catch (error) {
      throw new Error("Não foi possível utilizar o home driver");
    }
  };

  const config = {
    type: "doughnut",
  };

  const driverObj = driver({
    showProgress: true,
    popoverClass: "driverjs-theme",
    steps: [
      {
        popover: {
          title: "Bem-Vindo ao seu Clube",
          description:
            "Apresentaremos a você todas as funcionalidades dessa seção. Boa sorte ao montar o seu clube!",
          side: "top",
          align: "start",
        },
      },
      {
        element: "#stats",
        popover: {
          title: "Suas estatísticas",
          description:
            "Aqui é possível consultar algumas estatísticas básicas sobre a sua conta, tais como o número de vitórias, derrotas e empates. Além de seus pontos",
          side: "right",
          align: "start",
        },
      },
      {
        element: "#ranking",
        popover: {
          title: "Seu Ranking",
          description:
            "Aqui você pode ver quantos você possui, além disso é possível ver sua classificação no ranking e disputar com outras pessoas.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#shop",
        popover: {
          title: "Loja de Itens",
          description:
            "Aqui é possível comprar pacotes contendo jogadores, emblemas e colecionáveis, é uma excelente maneira de reforçar seu time..",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#market",
        popover: {
          title: "Mercado de Transferências",
          description:
            "Venda e Compre jogadores para o seu time, ao invés de tentar a sorte com os pacotes, você pode escolher qual jogador lhe convém.",
          side: "top",
          align: "start",
        },
      },
      {
        element: "#lineups",
        popover: {
          title: "Suas Formações",
          description:
            "Veja as suas formações criadas, elas são utilizadas nas batalhas competitivas.",
          side: "bottom",
          align: "start",
        },
      },
      {
        element: "#dme",
        popover: {
          title: "Desafios de Montagem de Elencos",
          description:
            "Aqui você pode trocar jogadores específicos em desafios, na qual você irá receber recompensas únicas e interessantes.",
          side: "top",
          align: "start",
        },
      },
      {
        popover: {
          title: "Bom Jogo!",
          description:
            "É isso! Faça desafios de montagem de elenco, abra pacotes, compre jogadores e dispute partidas para crescer dentro do game.",
        },
      },
    ],
  });

  useEffect(() => {
    if (user.driverHome === false && user.id !== undefined) {
      driverObj.drive();
      viewDriverHome();
    }
  }, [user]);

  return (
    <div className="w-full flex flex-col items-center gap-6 max-w-[1250px] mt-[3em]">
      <ToastMessage />
      <section className="w-full mt-[2.5em]">
        <Image
          src={"/assets/future-stars.jpg"}
          alt="Main Menu News Image"
          width={1250}
          height={650}
          className="w-full h-full max-h-[650px] max-w-[1250px] rounded-xl"
        />
      </section>

      <section className="flex justify-between gap-8 w-full mt-[6.5em] sm:flex-nowrap flex-wrap">
        <div
          className="w-full bg-white p-8 rounded-b-xl border-t-2 border-t-indigo-600 border border-neutral-100 shadow-sm shadow-neutral-200 min-h-[300px] flex gap-12 sm:flex-row flex-col items-center"
          id="stats"
        >
          <DoughnutChart
            chartOptions={config}
            chartData={{
              labels: ["Vitórias", "Empates", "Derrotas"],
              datasets: [
                {
                  label: "Índice de Vitórias em Partidas",
                  data: [3, 1, 2],
                  backgroundColor: ["#5549A6", "#7553A6", "#A47ED9"],
                  hoverOffset: 4,
                },
              ],
            }}
          />
          <div className="w-full">
            <div className="w-full">
              <h1 className="text-xl mb-6 font-semibold">Suas Estatísticas</h1>
              <p className="text-[#717171] mt-1">
                Total de Partidas Jogadas:{" "}
                <span>{user.victories + user.draws + user.loses} partidas</span>
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
        <div
          className="max-w-[450px] w-full bg-white rounded-b-xl border-t-2 border-t-indigo-600 p-8 border border-neutral-100 shadow-sm shadow-neutral-200 min-h-[300px]"
          id="ranking"
        >
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

      <section className="w-full mt-[6.5em] flex gap-10 justify-between sm:flex-nowrap flex-wrap">
        {user.currentLineup ? (
          <div
            className="bg-white p-16 border border-neutral-100 shadow-sm shadow-neutral-200 w-full flex flex-col items-center justify-center text-3xl font-bold uppercase cursor-pointer rounded-xl"
            onClick={() => handleSearchMatch()}
          >
            buscar partida
          </div>
        ) : (
          <div
            className="bg-neutral-200 p-16 border border-neutral-100 shadow-sm shadow-neutral-200 w-full flex flex-col items-center justify-center text-3xl font-bold uppercase cursor-not-allowed rounded-xl"
            onClick={() => handleSearchMatch()}
          >
            escolha uma escalação para buscar uma partida
          </div>
        )}
      </section>

      <section className="w-full mt-[6.5em] flex justify-around gap-10 sm:flex-nowrap flex-wrap">
        <div
          className="bg-white rounded-xl p-8 border border-neutral-100 shadow-sm shadow-neutral-200 flex flex-col items-center w-full h-[300px] cursor-pointer transition-all duration-300 hover:scale-105"
          id="shop"
        >
          <h1 className="text-3xl mt-2 font-bold">Loja</h1>
          <p className="text-[#717171] mt-2 text-center">
            A loja oferece diversos pacotes de cartas e colecionáveis, caso
            esteja precisando de algo, considere ela.
          </p>
          <RiShoppingCartLine size={50} className="gray-icon mt-10" />
        </div>
        <div
          className="bg-white rounded-xl p-8 border border-neutral-100 shadow-sm shadow-neutral-200 flex flex-col items-center w-full h-[300px] cursor-pointer transition-all duration-300 hover:scale-105"
          id="market"
        >
          <h1 className="text-3xl mt-2 font-bold">Mercado</h1>
          <p className="text-[#717171] mt-2 text-center">
            Compre e venda cartas de acordo com as suas necessidades, é uma
            excelente maneira de melhorar seu time.
          </p>
          <BsShop size={50} className="gray-icon mt-10" />
        </div>
        <div
          className="bg-white rounded-xl p-8 border border-neutral-100 shadow-sm shadow-neutral-200 flex flex-col items-center w-full h-[300px] cursor-pointer transition-all duration-300 hover:scale-105"
          id="lineups"
        >
          <h1 className="text-3xl mt-2 font-bold">Elencos</h1>
          <p className="text-[#717171] mt-2 text-center">
            Veja seus elencos e suas formações mais recentes, edite-as e as
            reforçe para buscar o maior número de vitórias possível.
          </p>
          <FiUser size={50} className="gray-icon mt-10" />
        </div>
      </section>

      <section
        className="w-full flex justify-between gap-6 bg-white rounded-b-xl border-t-2 border-t-indigo-600 p-10 border border-neutral-100 shadow-sm shadow-neutral-200 mt-[6.5em]"
        id="dme"
      >
        <div className="w-full">
          <h1 className="text-3xl font-bold">Desafios de Montagem de Elenco</h1>
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
  );
};

export default page;
