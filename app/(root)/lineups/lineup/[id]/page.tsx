"use client";

import ToastMessage from "@/components/config/ToastMessage";
import LineupCard from "@/components/lineups/LineupCard";
import { infoUser } from "@/contexts/UserContext";
import { DELETE_USER_LINEUP } from "@/graphql/mutations";
import { GET_LINEUP } from "@/graphql/queries";
import { GeneratedCardProps } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const page = () => {
  const { user } = infoUser();

  const pathname = usePathname().split("/");
  const query = pathname[3];

  const router = useRouter()

  const [lineupInfo, setLineupInfo] = useState<GeneratedCardProps[]>([]);

  const {
    data: lineupData,
    loading: lineupDataLoading,
    refetch: refetchLineupData,
    error: errorLineup,
  } = useQuery(GET_LINEUP, {
    variables: {
      id: query,
    },
    skip: !query,
  });

  const [removeLineup] = useMutation(DELETE_USER_LINEUP)

  const deleteLineup = async (lineupId: string) => {
    try {
      if (user.id !== undefined) {
        await removeLineup({
          variables: {
            lineupId: lineupId,
            userId: user.id as string
          }
        }).then(() => {
          toast.success("O elenco foi removido com sucesso!")
          router.push("/lineups")
        }).catch((error) => {
          toast.error("Não foi possível remover essa lineup do banco de dados")
        })
      }
    } catch (error) {
      toast.error("Não foi possível deletar essa lineup")
    }
  }

  return (
    lineupDataLoading === false && (
      <div className="flex flex-col w-full items-center max-w-[1050px] mt-[2em] p-10 h-full">
        <ToastMessage />
        <div className="flex justify-between items-center w-full max-w-[650px]">
          <h1 className="text-4xl font-bold transition-all flex justify-center duration-300 hover:text-emerald-500 cursor-default w-full text-center py-6">
            Minha Escalação
          </h1>
          <div className="flex justify-end">
            <FaRegTrashAlt size={20} className="gray-icon cursor-pointer" onClick={async () => {
              await deleteLineup(lineupData.findLineup.id)
            }} />
          </div>
        </div>
        <Image
          src={"/assets/lineup.png"}
          alt="Lineup Image"
          width={900}
          height={750}
          className="w-[900px] h-[750px] mt-[5em]"
        />
        {lineupData && lineupData.findLineup && (
          <div className="absolute h-full w-full flex flex-col items-center gap-6 max-w-[800px] max-h-[650px] mt-36">
            <div className="w-full flex justify-around items-center">
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player11)}
                lineupIndex={11}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player10)}
                lineupIndex={10}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player9)}
                lineupIndex={9}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
            </div>
            <div className="w-full flex justify-around items-center">
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player8)}
                lineupIndex={8}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player7)}
                lineupIndex={7}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player6)}
                lineupIndex={6}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
            </div>
            <div className="w-full flex justify-around items-center">
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player5)}
                lineupIndex={5}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player4)}
                lineupIndex={4}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player3)}
                lineupIndex={3}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player2)}
                lineupIndex={2}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
            </div>
            <div className="w-full flex justify-around items-center">
              <LineupCard
                cardData={JSON.parse(lineupData.findLineup.player1)}
                lineupIndex={1}
                lineupId={query}
                handleRefetch={refetchLineupData}
              />
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default page;
