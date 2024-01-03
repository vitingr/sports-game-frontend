"use client";

import React, { useState } from "react";
import Popup from "../config/Popup";
import { infoUser } from "@/contexts/UserContext";
import { useMutation } from "@apollo/client";
import { EDIT_CLUB_NAME } from "@/graphql/mutations";
import { toast } from "react-toastify";
import ToastMessage from "../config/ToastMessage";
import { GET_PLAYER } from "@/graphql/queries";

const EditClubName = ({ state }: { state: any }) => {
  const { user, getUserInfo } = infoUser();

  const [newClubname, setNewClubname] = useState<string>("");

  // GraphQL Mutation Config
  const [updateClubName] = useMutation(EDIT_CLUB_NAME, {
    refetchQueries: [{ query: GET_PLAYER, variables: { uuid: user.uuid } }],
  });

  const handleUpdateClubName = async () => {
    try {
      await updateClubName({
        variables: {
          userId: user.id as string,
          clubname: newClubname,
        },
      });
      toast.success("Nome do Clube foi alterado com sucesso!");
      await getUserInfo();
      state(false);
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível alterar o nome do clube");
    }
  };

  return (
    <Popup
      title="Editar nome do Clube"
      description="Insira o nome que você quiser para o seu clube! você pode digitar o nome desejado logo abaixo, lembre-se, o nome também faz parte da identidade de um clube!"
      state={state}
    >
      <ToastMessage />
      <form
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();
          await handleUpdateClubName();
        }}
        className="w-full"
      >
        <h2 className="mb-10 mt-10 text-[#717171] text-lg">
          Nome Atual: <span className="text-lg">{user.clubname}</span>
        </h2>

        <label htmlFor="clubname">Novo nome</label>
        <input
          type="text"
          name="clubname"
          id="clubname"
          className="w-full px-4 py-3 border border-neutral-300 rounded-lg outline-none transition-all duration-300 focus:border-indigo-600"
          placeholder="Digite o novo nome desejado para seu time"
          onChange={(e) => setNewClubname(e.target.value)}
          autoComplete="off"
        />

        <button
          className="w-full mt-16 bg-indigo-600 text-white py-3 rounded-full"
          type="submit"
        >
          Alterar nome do clube
        </button>
      </form>
    </Popup>
  );
};

export default EditClubName;
