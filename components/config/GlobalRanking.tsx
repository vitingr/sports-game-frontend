"use client";

import React from "react";
import Popup from "./Popup";
import { GET_ALL_PLAYERS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { infoUser } from "@/contexts/UserContext";
import { UserProps } from "@/types";

const GlobalRanking = ({ showState }: { showState: any }) => {
  const { user } = infoUser();

  const {
    data: playersData,
    loading: playersDataLoading,
    refetch: refetchPlayersData,
  } = useQuery(GET_ALL_PLAYERS);

  return (
    <Popup
      title={"Ranking Global"}
      description="Aqui é possível ver a sua classificação e de todos os outros jogadores que participam na nossa plataforma, abaixo você pode conferir as classificações"
      state={showState}
    >
      <div className="mt-12 flex flex-col w-full">
        {playersData.getAllUsers.map((player: UserProps, index: number) => (
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
      </div>
      <div className="mt-12 w-full bg-[#5BB5A2] text-white rounded-xl py-3 cursor-pointer transition-all duration-300 hover:bg-[#56aa98] text-center">
        Fechar Ranking
      </div>
    </Popup>
  );
};

export default GlobalRanking;
