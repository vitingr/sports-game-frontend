"use client";

import { LineupProps } from "@/types";
import React from "react";
import { BsTrash } from "react-icons/bs";
import ToastMessage from "../config/ToastMessage";
import { useMutation } from "@apollo/client";
import { DELETE_USER_LINEUP, SELECT_LINEUP } from "@/graphql/mutations";
import { toast } from "react-toastify";
import Link from "next/link";
import { infoUser } from "@/contexts/UserContext";

const Lineup = ({
  lineupData,
  refetch,
}: {
  lineupData: LineupProps;
  refetch: any;
}) => {
  const { user, getUserInfo } = infoUser();

  const [deleteLineup] = useMutation(DELETE_USER_LINEUP);
  const [selectLineup] = useMutation(SELECT_LINEUP) 

  const handleDeleteLineup = async () => {
    try {
      await deleteLineup({
        variables: {
          id: lineupData.id,
        },
      }).then(async () => {
        toast.success("A formação foi removida com sucesso!");
        await getUserInfo()
        await refetch();
      });
    } catch (error) {
      console.log(error);
      toast.error("ERRO! Não foi possível remover a formação");
    }
  };

  const handleSelectLineup = async () => {
    try {
      await selectLineup({
        variables: {
          userId: user.id,
          lineupId: lineupData.id
        }
      }).then(async () => {
        toast.success("A sua lineup principal foi alterada!")
        await getUserInfo()
        await refetch()
      })
    } catch (error) {
      throw new Error("Não foi possível selecionar a lineup")
      toast.error("Não foi possível selecionar a lineup")
    }
  }

  return (
    <div className="h-[250px] w-[300px] flex flex-col border border-neutral-200 shadow-sm shadow-neutral-100 rounded-xl">
      <ToastMessage />
      <div
        className="h-[75px] rounded-t-xl bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(https://png.pngtree.com/background/20211215/original/pngtree-glass-morphism-with-smooth-green-gradient-color-picture-image_1472393.jpg)`,
        }}
      />
      <div className="p-4">
        <h1 className="text-center font-semibold text-lg">{lineupData.name}</h1>
        <p className="text-center text-[#717171] text-sm">
          Overall da Lineup: {lineupData.totalOverall}
        </p>
        <div className="w-full mt-6 flex gap-2 justify-between items-center">
          <div className="w-full flex flex-col gap-2">
            {user.currentLineup && user.currentLineup === lineupData.id ? (
              <div className="w-full text-sm text-[#5BB5A2] border border-[#7fc7b7ab] cursor-pointer px-4 py-2 rounded-xl text-center uppercase">
                Elenco Selecionado
              </div>
            ) : (
              <div className="w-full text-sm bg-[#5BB5A2] text-white cursor-pointer px-4 py-2 rounded-xl text-center" onClick={() => handleSelectLineup()}>
                Tornar Principal
              </div>
            )}
            <Link
              href={`/lineups/lineup/${lineupData.id}`}
              className="w-full text-sm text-[#5BB5A2] cursor-pointer px-4 py-2 rounded-xl text-center"
            >
              Editar Elenco
            </Link>
          </div>
          {/* <BsTrash
            size={25}
            className="gray-icon cursor-pointer"
            onClick={() => handleDeleteLineup()}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Lineup;
