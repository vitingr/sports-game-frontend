"use client";

import { PlayerCardProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import ChangePlayer from "./ChangePlayer";

const LineupCard = ({ cardData }: { cardData: string[] }) => {
  const [showChangePlayer, setShowChangePlayer] = useState<boolean>(false);

  return (
    <>
      {showChangePlayer && (
        <ChangePlayer state={setShowChangePlayer} />
      )}
      {cardData ? (
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
          src={cardData[0]}
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
