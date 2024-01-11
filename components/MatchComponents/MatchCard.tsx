"use client";

import { GeneratedCardProps } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Popup from "../config/Popup";
import { socketProvider } from "@/contexts/WebSocketContext";

type MatchCardProps = {
  cardData: string | any;
  handleChooseCard: any;
  usedCards: string[];
};

const MatchCard = ({
  cardData,
  handleChooseCard,
  usedCards,
}: MatchCardProps) => {
  const [showStats, setShowStats] = useState<boolean>(false);
  const [cardStats, setCardStats] = useState<GeneratedCardProps>();

  const { currentStat } = socketProvider();

  const parseData = async () => {
    const data = await JSON.parse(cardData);
    setCardStats(data);
  };

  useEffect(() => {
    parseData();
  }, []);

  return (
    cardStats &&
    cardStats?.cardImage && (
      <>
        {usedCards.includes(cardStats.id) ? (
          <Image
            src={cardStats?.cardImage || ""}
            alt="Lineup Card"
            width={125}
            height={125}
            className="cursor-pointer grayscale"
          />
        ) : (
          <Image
            src={cardStats?.cardImage || ""}
            alt="Lineup Card"
            width={125}
            height={125}
            className="cursor-pointer"
            onClick={() => setShowStats(true)}
          />
        )}

        {showStats && (
          <Popup
            state={setShowStats}
            title="Atributos do jogador"
            description="Escolha um dos atributos abaixo do jogador para disputar essa rodada, após escolher um jogador durante uma rodada, você não pode usa-lo mais durante essa partida"
          >
            <div className="w-full flex flex-col items-center">
              <p>
                {currentStat
                  ? `${currentStat} é ${typeof currentStat}`
                  : "não tem o stat"}
              </p>
              <p>
                {currentStat === "free" || currentStat || currentStat === "pace"
                  ? "render"
                  : "não render"}
              </p>
              <p>{currentStat === "free" ? "livre" : "n"}</p>
              <p>{currentStat ? "existe" : "n existe"}</p>
              <p>{currentStat === "pace" ? "é pace" : "n é pace"}</p>
              <p></p>
              <p></p>

              <Image
                src={cardStats?.cardImage || ""}
                alt="Lineup Card"
                width={125}
                height={125}
                className="cursor-pointer mt-10"
                onClick={() => setShowStats(true)}
              />
              <div className="w-full flex justify-between gap-6 mt-10">
                <div className="flex flex-col w-full items-center gap-4">
                  {currentStat === "free" ||
                  currentStat === "pace" ? (
                    <div
                      className="p-6 border border-neutral-200 rounded-xl w-full flex gap-2"
                      onClick={async () => {
                        setShowStats(false);
                        await handleChooseCard(cardStats, "pace");
                      }}
                    >
                      <h1>Velocidade</h1>
                      <span>{cardStats.pace}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {currentStat === "free" ||
                  currentStat === "finalization" ? (
                    <div
                      className="p-6 border border-neutral-200 rounded-xl w-full flex gap-2"
                      onClick={async () => {
                        setShowStats(false);
                        await handleChooseCard(cardStats, "finalization");
                      }}
                    >
                      <h1>Finalização</h1>
                      <span>{cardStats.finalization}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {currentStat === "free" ||
                  currentStat === "pass" ? (
                    <div
                      className="p-6 border border-neutral-200 rounded-xl w-full flex gap-2"
                      onClick={async () => {
                        setShowStats(false);
                        await handleChooseCard(cardStats, "pass");
                      }}
                    >
                      <h1>Passe</h1>
                      <span>{cardStats.pass}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-col w-full items-center gap-4">
                  {currentStat === "free" ||
                  currentStat === "drible" ? (
                    <div
                      className="p-6 border border-neutral-200 rounded-xl w-full flex gap-2"
                      onClick={async () => {
                        setShowStats(false);
                        await handleChooseCard(cardStats, "drible");
                      }}
                    >
                      <h1>Drible</h1>
                      <span>{cardStats.drible}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {currentStat === "free" ||
                  currentStat === "defense" ? (
                    <div
                      className="p-6 border border-neutral-200 rounded-xl w-full flex gap-2"
                      onClick={async () => {
                        setShowStats(false);
                        await handleChooseCard(cardStats, "defense");
                      }}
                    >
                      <h1>Defesa</h1>
                      <span>{cardStats.defense}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                  {currentStat === "free" ||
                  currentStat === "physic" ? (
                    <div
                      className="p-6 border border-neutral-200 rounded-xl w-full flex gap-2"
                      onClick={async () => {
                        setShowStats(false);
                        await handleChooseCard(cardStats, "physic");
                      }}
                    >
                      <h1>Físico</h1>
                      <span>{cardStats.physic}</span>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </Popup>
        )}
      </>
    )
  );
};

export default MatchCard;
