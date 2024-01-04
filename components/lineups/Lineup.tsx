"use client"

import { LineupProps } from "@/types";
import React from "react";
import { BsTrash } from "react-icons/bs";
import ToastMessage from "../config/ToastMessage";
import { useMutation } from "@apollo/client";
import { DELETE_USER_LINEUP } from "@/graphql/mutations";
import { toast } from "react-toastify";
import Link from "next/link";

const Lineup = ({ lineupData, refetch }: { lineupData: LineupProps, refetch: any }) => {
  
  const [deleteLineup] = useMutation(DELETE_USER_LINEUP)

  const handleDeleteLineup = async () => {
    try {
      await deleteLineup({
        variables: {
          id: lineupData.id
        }
      }).then(async () => {
        toast.success("A formação foi removida com sucesso!")
        await refetch()
      })
    } catch (error) {
      console.log(error)
      toast.error("ERRO! Não foi possível remover a formação")
    }
  }
  
  return (
    <div className="h-[200px] w-[250px] flex flex-col border border-neutral-200 shadow-sm shadow-neutral-100 rounded-xl">
      <ToastMessage />
      <div
        className="h-[75px] rounded-t-xl bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://d585tldpucybw.cloudfront.net/sfimages/default-source/professional-services/ui-ux-modernization-hero.png?sfvrsn=d92d0367_3)`,
        }}
      />
      <div className="p-4">
        <h1 className="text-center font-semibold text-lg">{lineupData.name}</h1>
        <p className="text-center text-[#717171] text-sm">
          Overall da Lineup: {lineupData.totalOverall}
        </p>
        <div className="w-full mt-6 flex gap-2 justify-between items-center">
          <Link href={`/lineups/lineup/${lineupData.id}`} className="w-full text-sm bg-indigo-400 text-white cursor-pointer px-4 py-2 rounded-xl text-center">
            Editar Elenco
          </Link>
          <BsTrash size={25} className="gray-icon cursor-pointer" onClick={() => handleDeleteLineup()} />
        </div>
      </div>
    </div>
  );
};

export default Lineup;
