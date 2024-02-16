"use client";

import React, { useState } from "react";
import Popup from "../config/Popup";
import DmeCard from "./DmeCard";
import { GeneratedCardProps } from "@/types";
import { toast } from "react-toastify";
import { infoUser } from "@/contexts/UserContext";
import { useMutation } from "@apollo/client";
import { COMPLETE_DME_CHALLENGE_1 } from "@/graphql/mutations";

type ChallengeProps = {
  handleFunction?: any;
  showState: any;
  handleRefetch: any;
};

type DmePlayersProps = {
  player1: GeneratedCardProps | null;
  player2: GeneratedCardProps | null;
  player3: GeneratedCardProps | null;
};

const Challenge1 = ({ handleFunction, showState, handleRefetch }: ChallengeProps) => {
  const {user} = infoUser()

  const [completeChallenge1] = useMutation(COMPLETE_DME_CHALLENGE_1)

  const [players, setPlayers] = useState<DmePlayersProps>({
    player1: null,
    player2: null,
    player3: null,
  });

  const choosePlayer1 = async (player: GeneratedCardProps) => {
    try {
      if (player.playerId !== players.player1?.playerId && player.playerId !== players.player2?.playerId && player.playerId !== players.player3?.playerId) {
        setPlayers((prevPlayers) => ({ ...prevPlayers, player1: player }));
      } else {
        toast.error(
          "Não é possível escolher a mesma carta duas vezes para o desafio"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível escolher essa carta");
    }
  };

  const choosePlayer2 = async (player: GeneratedCardProps) => {
    try {
      if (player.playerId !== players.player1?.playerId && player.playerId !== players.player2?.playerId && player.playerId !== players.player3?.playerId) {
        setPlayers((prevPlayers) => ({ ...prevPlayers, player2: player }));
      } else {
        toast.error(
          "Não é possível escolher a mesma carta duas vezes para o desafio"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível escolher essa carta");
    }
  };

  const choosePlayer3 = async (player: GeneratedCardProps) => {
    try {
      if (player.playerId !== players.player1?.playerId && player.playerId !== players.player2?.playerId && player.playerId !== players.player3?.playerId) {
        setPlayers((prevPlayers) => ({ ...prevPlayers, player3: player }));
      } else {
        toast.error(
          "Não é possível escolher a mesma carta duas vezes para o desafio"
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível escolher essa carta");
    }
  };

  const resolveChallenge = async () => {
    try {
      await completeChallenge1({
        variables: {
          player1: players.player1?.id,
          player2: players.player2?.id,
          player3: players.player3?.id,
          userId: user.id,
        }
      }).then(async () => {
        await handleRefetch()
        showState(false)
        toast.success("O desafio de montagem de elencos foi concluído com sucesso!")
      }).catch((error) => {
        toast.error("Não possível finalizar o DME")
      })
    } catch (error) {
      toast.error("Houve um erro ao enviar os jogadores para validação")
    }
  }

  return (
    <Popup
      title="Desafio de Montagem de Elenco"
      state={showState}
      description="Troque jogadores do seu clube pelas mais diversas recompensas e assim melhorar seu clube!"
    >
      <div className="w-full flex gap-10 items-center justify-center">
        <DmeCard
          cardData={players.player1}
          handleFunction={choosePlayer1}
          handleRefetch={""}
        />
        <DmeCard
          cardData={players.player2}
          handleFunction={choosePlayer2}
          handleRefetch={""}
        />
        <DmeCard
          cardData={players.player3}
          handleFunction={choosePlayer3}
          handleRefetch={""}
        />
      </div>
      {players.player1?.league !== players.player2?.league &&
      players.player2?.league !== players.player3?.league &&
      players.player3?.league !== players.player1?.league &&
      players.player1 !== null &&
      players.player2 !== null &&
      players.player3 !== null ? (
        <button
          onClick={async () => await resolveChallenge()}
          className="mt-8 p-3 cursor-pointer w-full text-center rounded-xl bg-emerald-500 transition-all duration-300 hover:bg-emerald-600 text-white"
        >
          Enviar
        </button>
      ) : (
        <button className="mt-8 p-3 cursor-not-allowed w-full text-center rounded-xl bg-neutral-300 text-white">
          Enviar
        </button>
      )}
    </Popup>
  );
};

export default Challenge1;
