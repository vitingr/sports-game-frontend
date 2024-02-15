"use client";

import CreateLineup from "@/components/lineups/CreateLineup";
import Lineup from "@/components/lineups/Lineup";
import { infoUser } from "@/contexts/UserContext";
import { GET_USER_LINEUPS } from "@/graphql/queries";
import { LineupProps } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { LINEUP_DRIVER } from "@/graphql/mutations";

const page = () => {
  const { user } = infoUser();

  const [showCreateLineup, setShowCreateLineup] = useState<boolean>(false);

  const [updateLineupDriver] = useMutation(LINEUP_DRIVER);

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

  const driverObj = driver({
    showProgress: true,
    popoverClass: "driverjs-theme",
    steps: [
      {
        popover: {
          title: "Bem-Vindo aos Elencos",
          description:
            "Bem-Vindo aos elencos, aqui você pode criar elencos para disputar batalhas competitivas no nosso jogo!",
          side: "top",
          align: "start",
        },
      },
      {
        element: "#my-lineups",
        popover: {
          title: "Seus Elencos",
          description:
            "No momento você não possui nenhuma lineup, porém pode poderá criar elencos, após isso, basta selecionar qual será o seu principal e começar sua jornada.",
          side: "right",
          align: "start",
        },
      },
      {
        element: "#create-lineup",
        popover: {
          title: "Crie Elencos",
          description:
            "Aqui você criar novos elencos e formações para o seu clube, para começarmos, o que acha de criar um elenco inicial para você?",
          side: "left",
          align: "start",
        },
      },
    ],
  });

  const viewLineupDriver = async () => {
    try {
      await updateLineupDriver({
        variables: {
          id: user.id as string,
        },
      });
    } catch (error) {
      throw new Error("Não foi possível visualizar o manual das lineups");
    }
  };

  useEffect(() => {
    if (user.driverLineup === false && user.id !== undefined) {
      driverObj.drive();
      viewLineupDriver();
    }
  }, [user]);

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
                <Lineup
                  key={index}
                  lineupData={lineup}
                  refetch={refetchUserLineups}
                />
              )
            )}
          </div>
        ) : (
          <span
            className="w-full text-lg text-[#717171] p-10 text-center mt-20"
            id="my-lineups"
          >
            Você ainda não criou nenhuma formação até o momento!
          </span>
        )}

        {!showCreateLineup && (
          <div
            className="w-full mt-24 flex justify-center items-center"
            id="create-lineup"
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
