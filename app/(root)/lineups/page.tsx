"use client";

import CreateLineup from "@/components/lineups/CreateLineup";
import Lineup from "@/components/lineups/Lineup";
import { infoUser } from "@/contexts/UserContext";
import { GET_USER_LINEUPS } from "@/graphql/queries";
import { LineupProps } from "@/types";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";

const page = () => {
  const { user } = infoUser();

  const [showCreateLineup, setShowCreateLineup] = useState<boolean>(false);

  const {
    data: userLineups,
    loading: userLineupsLoading,
    refetch: refetchUserLineups,
  } = useQuery(GET_USER_LINEUPS, {
    variables: {
      userId: user.id,
    },
    skip: !user.id,
  });

  return (
    userLineupsLoading === false && (
      <div className="flex flex-col w-full max-w-[1050px] mt-[2em] bg-white rounded-xl border border-neutral-100 shadow-md shadow-neutral-200 p-10 h-full">
        <h1 className="text-3xl font-bold transition-all duration-300 hover:text-indigo-600 cursor-default w-full mt-4">
          Minhas Escalações
        </h1>
        <p className="text-[#717171]">
          Aqui estão as suas lineups. Lineups são formações que você pode criar,
          depois você terá de escolher 11 jogadores para ela, para futuramente
          utilizar esses times durante batalhas competitivas, crie quantas
          formações você quiser!
        </p>

        {userLineups && userLineups.getUserLineups ? (
          <div className="flex gap-8 mt-16 py-6 flex-wrap sm:justify-normal justify-center w-full">
            {userLineups.getUserLineups.map(
              (lineup: LineupProps, index: number) => (
                <Lineup key={index} lineupData={lineup} refetch={refetchUserLineups} />
              )
            )}
          </div>
        ) : (
          <span className="w-full text-lg text-[#717171] p-10 text-center mt-20">
            Você ainda não criou nenhuma formação até o momento!
          </span>
        )}

        {!showCreateLineup && (
          <div
            className="w-full mt-24 flex justify-center items-center"
            onClick={() => setShowCreateLineup(!showCreateLineup)}
          >
            <button className="cta">
              <span>Adicionar Elenco</span>
              <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </div>
        )}

        {showCreateLineup && (
          <CreateLineup
            showState={setShowCreateLineup}
            handleRefetchData={refetchUserLineups}
          />
        )}
      </div>
    )
  );
};

export default page;
