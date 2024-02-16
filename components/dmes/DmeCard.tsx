"use client";

import { GeneratedCardProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import ChangeDmePlayer from "./ChangeDmePlayer";

type LineupCardProps = {
  cardData: GeneratedCardProps | null;
  handleFunction: any;
  handleRefetch: any;
};

const DmeCard = ({
  cardData,
  handleFunction,
  handleRefetch,
}: LineupCardProps) => {

  const [showChangePlayer, setShowChangePlayer] = useState<boolean>(false);

  return (
    <>
      {showChangePlayer && (
        <ChangeDmePlayer state={setShowChangePlayer} handleFunction={handleFunction} showState={setShowChangePlayer} handleRefetch={""} />
      )}
      {!cardData ? (
        <Image
          src={"/assets/empty-card.webp"}
          alt="Lineup Card"
          width={125}
          height={125}
          className="cursor-pointer"
          onClick={() => setShowChangePlayer(!showChangePlayer)}
        />
      ) : (
        <Image
          src={cardData.cardImage}
          alt="Lineup Card"
          width={125}
          height={125}
          className="cursor-pointer"
          onClick={() => setShowChangePlayer(!showChangePlayer)}
        />
      )}
    </>
  );
};

export default DmeCard;
