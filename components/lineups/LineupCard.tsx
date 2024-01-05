"use client";

import Image from "next/image";
import React, { useState } from "react";
import ChangePlayer from "./ChangePlayer";
import { GeneratedCardProps } from "@/types";

type LineupCardProps = {
  cardData: GeneratedCardProps;
  lineupIndex: number;
  lineupId: string;
  handleRefetch: any
}

const LineupCard = ({ cardData, lineupIndex, lineupId, handleRefetch }: LineupCardProps) => {
  const [showChangePlayer, setShowChangePlayer] = useState<boolean>(false);

  return (
    <>
      {showChangePlayer && (
        <ChangePlayer handleRefetch={handleRefetch} state={setShowChangePlayer} lineupIndex={lineupIndex} indexData={cardData} lineupId={lineupId} />
      )}
      {!cardData ? (
        <Image
          src={"/assets/empty-card.webp"}
          alt="Lineup Card"
          width={125}
          height={125}
          className="cursor-pointer"
          onClick={() => setShowChangePlayer(true)}
        />
      ) : (
        <Image
          src={cardData.cardImage}
          alt="Lineup Card"
          width={125}
          height={125}
          className="cursor-pointer"
          onClick={() => setShowChangePlayer(true)}
        />
      )}
    </>
  );
};

export default LineupCard;
