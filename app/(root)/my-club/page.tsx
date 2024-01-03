"use client";

import PlayerCard from "@/components/PlayerCard";
import EditClubName from "@/components/personalization/EditClubName";
import { infoUser } from "@/contexts/UserContext";
import { GET_USER_CARDS } from "@/graphql/queries";
import { GeneratedCardProps } from "@/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  const { user } = infoUser();

  const {
    data: myCards,
    loading: myCardsLoading,
    refetch: refetchMyCards,
  } = useQuery(GET_USER_CARDS, {
    variables: {
      userId: user.id,
    },
    skip: !user.id,
  });

  const [showChangeClubName, setShowChangeClubname] = useState<boolean>(false);

  return (
    myCardsLoading === false && (
      <div className="flex justify-center gap-6 w-full max-w-[1600px] mt-[3em]">
        <div className="w-full flex flex-col gap-4 h-full">
          <div className="w-full bg-white p-10 rounded-lg border border-neutral-100 shadow-md shadow-neutral-200 h-full">
            <h1 className="font-semibold text-2xl">Minhas Cartas</h1>
            <p className="text-[#717171]">
              Abra Pacotes ou faça compras no mercado de transferências para
              adquirir um maior número de cartas e jogadores para completar o
              seu clube.
            </p>
            <div>
              {myCards && myCards.findUserCards ? (
                <div className="flex flex-wrap gap-4 mt-8 w-full">
                  {myCards.findUserCards
                    .slice(0, 5)
                    .map((card: GeneratedCardProps, index: number) => (
                      <PlayerCard cardData={card} key={index} small={true} />
                    ))}
                </div>
              ) : (
                <span className="w-full text-lg text-[#717171] p-10 text-center mt-20">
                  Você ainda não encontrou nenhuma carta!
                </span>
              )}
            </div>
            <div className="flex flex-col w-full gap-2 mt-10">
              <Link
                href={"/my-club/my-cards"}
                className="justify-end flex flex-col mt-8 underline underline-offset-4 px-4 py-2 text-center cursor-pointer"
              >
                Ver Todas minhas Cartas
              </Link>
            </div>
          </div>
          <div className="w-full bg-white p-10 rounded-lg border border-neutral-100 shadow-md shadow-neutral-200 h-full">
            <h1 className="font-semibold text-2xl">Minha Classificação</h1>
            <div className="flex flex-col w-full gap-2 mt-10">
              <div className="w-full flex gap-6 justify-between">
                <div className="flex flex-col w-full gap-2">
                  <div className="flex items-center gap-1">
                    <span className="text-base">Partidas Jogadas: </span>
                    <span className="text-[#717171]">
                      {user.victories + user.draws + user.loses || "0"} Partidas
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-base">Vitórias: </span>
                    <span className="text-[#717171]">
                      {user.victories || "0"} Vitórias
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-base">Empates: </span>
                    <span className="text-[#717171]">
                      {user.draws || "0"} Empates
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-base">Derrotas: </span>
                    <span className="text-[#717171]">
                      {user.loses || "0"} Derrotas
                    </span>
                  </div>
                </div>
                <div className="w-full flex flex-col items-center">
                  {user.points < 0 ||
                    (user.points === undefined && (
                      <>
                        <span className="font-[700] text-transparent text-4xl bg-clip-text bg-gradient-to-r from-neutral-700 to-slate-600">
                          2.023 Pontos
                        </span>
                        <span className="text-transparent text-base bg-clip-text bg-gradient-to-r from-neutral-700 to-slate-600 italic">
                          +500 em caso de vitória
                        </span>
                      </>
                    ))}

                  {user.points > 5000 && (
                    <>
                      <span className="font-[700] text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400">
                        {user.points}
                      </span>
                      <span className="text-transparent text-base bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 italic">
                        +250 em caso de vitória
                      </span>
                    </>
                  )}

                  {user.points > 10000 && (
                    <>
                      <span className="font-[700] text-transparent text-4xl bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-600">
                        14.023 Pontos
                      </span>
                      <span className="text-transparent text-base bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-600 italic">
                        +150 em caso de vitória
                      </span>
                    </>
                  )}

                  {user.points > 15000 && (
                    <>
                      <span className="font-[700] text-transparent text-4xl bg-clip-text bg-gradient-to-r from-pink-600 to-fuchsia-700">
                        17.023 Pontos
                      </span>
                      <span className="text-transparent text-base bg-clip-text bg-gradient-to-r from-pink-600 to-fuchsia-700 italic">
                        +100 em caso de vitória
                      </span>
                    </>
                  )}

                  {user.points > 20000 && (
                    <>
                      <span className="font-[700] text-transparent text-4xl bg-clip-text bg-gradient-to-r from-pink-700 to-red-700">
                        21.023 Pontos
                      </span>
                      <span className="text-transparent text-base bg-clip-text bg-gradient-to-r from-pink-700 to-red-700 italic">
                        +50 em caso de vitória
                      </span>
                    </>
                  )}

                  {user.points > 25000 && (
                    <>
                      <span className="font-[700] text-transparent text-4xl bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-500">
                        26.023 Pontos
                      </span>
                      <span className="text-transparent text-base bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-500 italic">
                        +25 em caso de vitória
                      </span>
                    </>
                  )}

                  {user.poins > 30000 && (
                    <>
                      <span className="font-[700] text-transparent text-4xl bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-500">
                        35.023 Pontos
                      </span>
                      <span className="text-transparent text-base bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-500 italic">
                        +10 em caso de vitória
                      </span>
                    </>
                  )}

                  <span className="mt-6 text-2xl font-[400]">
                    #1 Ranking Geral
                  </span>
                </div>
              </div>
              <div className="justify-end flex flex-col mt-10 underline underline-offset-4 px-4 py-2 text-center cursor-pointer">
                Ver Ranking Completo
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg border border-neutral-100 shadow-md shadow-neutral-200 h-full">
          <h1 className="font-semibold text-2xl">Meu Clube</h1>
          <p className="text-[#717171]">
            Aqui você consultar algumas informações pessoais sobre a sua conta,
            como id, email, nome, etc. Além disso, você também pode editar o
            nome do seu clube, assim como o emblema, a fim de deixa-lo como você
            deseja!
          </p>
          <div className="w-full flex flex-col justify-between mt-12 h-full">
            <div className="flex flex-col w-full justify-center items-center">
              <Image
                src={"/assets/undefinedTeam.png"}
                alt="Team Badge"
                width={100}
                height={100}
              />
              <h1 className="text-xl font-semibold uppercase">
                {user.clubname}
              </h1>
              <h3 className="text-[#717171]">{user.name}</h3>
            </div>
            <div className="flex h-full mt-6 w-full gap-10 justify-between ml-4">
              <section className="mt-6 flex justify-center flex-col w-full gap-2 h-full">
                <h1 className="font-semibold">Informações da Conta</h1>
                <div className="flex items-center gap-1">
                  <span className="text-base">ID da Conta: </span>
                  <span className="text-[#717171] text-sm">
                    {user.id}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-base">UUID da Conta: </span>
                  <span className="text-[#717171] text-sm">
                    {user.uuid}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-base">Seu email: </span>
                  <span className="text-[#717171] text-sm">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-base">Primeiro nome: </span>
                  <span className="text-[#717171] text-sm">
                    {user.firstname}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-base">Segundo nome: </span>
                  <span className="text-[#717171] text-sm">
                    {user.lastname}
                  </span>
                </div>
              </section>
              <section className="mt-6 flex justify-center flex-col w-full gap-2 h-full">
                <h1 className="font-semibold">Informações do Clube</h1>
                <div className="flex items-center gap-1">
                  <span className="text-base">Fut Coins: </span>
                  <span className="text-[#717171] text-sm">
                    {user.currency}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-base">Fut Points: </span>
                  <span className="text-[#717171] text-sm">
                    {user.futpoints}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-base">Amizades: </span>
                  <span className="text-[#717171] text-sm">
                    {user.qtdFriends}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-base">Cartas Adquiridas: </span>
                  <span className="text-[#717171] text-sm">
                    {user.qtdCards}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-base">Região do Servidor: </span>
                  <span className="text-[#717171] text-sm">Brasil</span>
                </div>
              </section>
            </div>
            <div className="h-full flex flex-col justify-end mb-[115px]">
              <div
                className="rounded-full bg-indigo-600 text-white px-4 py-2 text-center cursor-pointer transition-all duration-300 hover:bg-indigo-800"
                onClick={() => setShowChangeClubname(!showChangeClubName)}
              >
                Renomear meu Clube
              </div>
              <div className="mt-4 rounded-full text-indigo-600 border border-indigo-600 px-4 py-2 text-center cursor-pointer">
                Editar meu Emblema
              </div>
            </div>
          </div>
        </div>

        {showChangeClubName && <EditClubName state={setShowChangeClubname} />}
      </div>
    )
  );
};

export default page;
