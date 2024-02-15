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
import { useMutation, useQuery } from "@apollo/client";
import { HOME_DRIVER } from "@/graphql/mutations";
import { socket, socketProvider } from "@/contexts/WebSocketContext";
import { toast } from "react-toastify";
import ToastMessage from "@/components/config/ToastMessage";
import { GET_ALL_PLAYERS } from "@/graphql/queries";
import { UserProps } from "@/types";
import Result from "@/components/MatchComponents/Result";
import MatchWinner from "@/components/MatchComponents/MatchWinner";
import Link from "next/link";
import GlobalRanking from "@/components/config/GlobalRanking";

const page = () => {
  const { user, getUserInfo } = infoUser();

  const [showWorldRanking, setShowWorldRanking] = useState<boolean>(false);

  const [updateHomeDriver] = useMutation(HOME_DRIVER);
  const {
    showMatchResults,
    setShowMatchResults,
    matchWinner,
    matchLoser,
    player1Score,
    player2Score,
  } = socketProvider();

  const {
    data: playersData,
    loading: playersDataLoading,
    refetch: refetchPlayersData,
  } = useQuery(GET_ALL_PLAYERS);

  const handleSearchMatch = async () => {
    try {
      socket.emit("searchMatch", {
        id: user.id as string,
      });
      await getUserInfo().then(() => {
        toast.success("Buscando partida");
      });
    } catch (error) {
      throw new Error("Não foi possível buscar uma partida");
    }
  };

  const handleStopSearchMatch = async () => {
    try {
      socket.emit("stopSearchingMatch", {
        id: user.id as string,
      });
      await getUserInfo().then(() => {
        toast.success("Buscando partida");
      });
    } catch (error) {
      throw new Error("Não foi possível parar de buscar uma partida");
    }
  };

  const viewDriverHome = async () => {
    try {
      await updateHomeDriver({
        variables: {
          id: user.id as string,
        },
      });
    } catch (error) {
      throw new Error("Não foi possível utilizar o home driver");
    }
  };

  const driverObj = driver({
    showProgress: true,
    popoverClass: "driverjs-theme",
    steps: [
      {
        popover: {
          title: "Bem-Vindo ao Menu Principal",
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
    playersDataLoading === false &&
    playersData && (
      <div className="w-full flex flex-col items-center gap-6 max-w-[1250px] mt-[150px] sm:mt-[3em]">
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
            className="w-full bg-white p-8 rounded-b-xl border-t-2 border-t-[#5BB5A2] border border-neutral-100 shadow-md shadow-neutral-300 min-h-[300px] flex gap-12 sm:flex-row flex-col items-center"
            id="stats"
          >
            <DoughnutChart
              chartData={{
                labels: ["Vitórias", "Empates", "Derrotas"],
                datasets: [
                  {
                    label: "Índice de Vitórias em Partidas",
                    data: [
                      user.victories || 1,
                      user.draws || 1,
                      user.loses || 1,
                    ],
                    backgroundColor: ["#5BB5A2", "#6b9c91", "#a8e3d6"],
                    hoverOffset: 4,
                  },
                ],
              }}
            />
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
                {user.points < 5000 ||
                user.points === 0 ||
                user.points === undefined ? (
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 to-slate-600 uppercase">
                    {user.points}
                  </span>
                ) : (
                  <></>
                )}
                {user.points >= 5000 && user.points <= 9999 ? (
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 uppercase">
                    {user.points}
                  </span>
                ) : (
                  <></>
                )}
                {user.points >= 10000 && user.points <= 14999 ? (
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-indigo-600 uppercase">
                    {user.points}
                  </span>
                ) : (
                  <></>
                )}
                {user.points >= 15000 && user.points <= 19999 ? (
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 uppercase">
                    {user.points}
                  </span>
                ) : (
                  <></>
                )}
                {user.points >= 20000 && user.points <= 24999 ? (
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-rose-500 uppercase">
                    {user.points}
                  </span>
                ) : (
                  <></>
                )}
                {user.points >= 25000 && user.points <= 29999 ? (
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 to-orange-400 uppercase">
                    {user.points}
                  </span>
                ) : (
                  <></>
                )}
                {user.points >= 30000 ? (
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-600 uppercase">
                    {user.points}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div
            className="max-w-[450px] w-full bg-white rounded-b-xl border-t-2 border-t-[#5BB5A2] p-8 border border-neutral-100 shadow-md shadow-neutral-300 min-h-[300px]"
            id="ranking"
          >
            <h1 className="text-xl font-semibold">Ranking Global</h1>
            <ul className="list-none mt-6">
              {playersData.getAllUsers
                .slice(0, 4)
                .map((player: UserProps, index: number) => (
                  <li
                    className="py-2 mb-2 border-b border-neutral-100 tracking-wider flex justify-between w-full"
                    key={index}
                  >
                    <div className="w-full">
                      {user.id === player.id ? (
                        <h2 className="overflow-hidden text-[#5BB5A2]">
                          {index + 1}. {player.clubname} (Você)
                        </h2>
                      ) : (
                        <h2 className="overflow-hidden">
                          {index + 1}. {player.clubname} ({player.name})
                        </h2>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 to-slate-600 uppercase">
                        {player.points}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
            <div
              className="text-white py-3 w-full bg-[#5BB5A2] rounded-xl cursor-pointer text-center mt-28"
              onClick={() => setShowWorldRanking(true)}
            >
              Ver Ranking Completo
            </div>
          </div>
        </section>

        <section className="w-full mt-[6.5em] flex gap-10 justify-between sm:flex-nowrap flex-wrap">
          {user.currentLineup !== "" &&
          user.currentLineup &&
          user.currentLineup !== undefined &&
          user.currentLineup !== null ? (
            <div
              className="bg-white p-16 border border-neutral-100 shadow-md shadow-neutral-300 w-full flex flex-col items-center justify-center text-3xl font-bold uppercase cursor-pointer rounded-xl"
              onClick={async () => await handleSearchMatch()}
            >
              {user.searchingMatch ? (
                <div
                  className="w-full flex justify-center items-center"
                  onClick={async () => {
                    await handleStopSearchMatch();
                  }}
                >
                  <p className="mr-6">Cancelar Busca</p>
                  <div className="dot-spinner">
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                  </div>
                </div>
              ) : (
                "Buscar Partida"
              )}
            </div>
          ) : (
            <Link
              href={"/lineups"}
              className="bg-neutral-200 p-16 border border-neutral-100 shadow-md shadow-neutral-300 w-full flex flex-col items-center justify-center text-3xl font-bold uppercase cursor-not-allowed rounded-xl"
            >
              Escolha uma Escalação para Buscar uma Partida
            </Link>
          )}
        </section>

        <section className="w-full mt-[6.5em] flex justify-around gap-10 sm:flex-nowrap flex-wrap">
          <div
            className="bg-white rounded-xl p-8 border border-neutral-100 shadow-md shadow-neutral-300 flex flex-col items-center w-full h-[300px] cursor-pointer transition-all duration-300 hover:scale-105"
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
            className="bg-white rounded-xl p-8 border border-neutral-100 shadow-md shadow-neutral-300 flex flex-col items-center w-full h-[300px] cursor-pointer transition-all duration-300 hover:scale-105"
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
            className="bg-white rounded-xl p-8 border border-neutral-100 shadow-md shadow-neutral-300 flex flex-col items-center w-full h-[300px] cursor-pointer transition-all duration-300 hover:scale-105"
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
          className="w-full flex justify-between gap-6 bg-white rounded-b-xl border-t-2 border-t-[#5BB5A2] p-10 border border-neutral-100 shadow-md shadow-neutral-300 mt-[6.5em]"
          id="dme"
        >
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
            <div className="mt-20 bg-[#5BB5A2] text-white rounded-xl w-full py-3 cursor-pointer text-center">
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

        {showMatchResults && (
          <Result
            showState={setShowMatchResults}
            winner={MatchWinner}
            loser={matchLoser}
            player1Score={player1Score}
            player2Score={player2Score}
          />
        )}

        {showWorldRanking && <GlobalRanking showState={setShowWorldRanking} />}
      </div>
    )
  );
};

export default page;
