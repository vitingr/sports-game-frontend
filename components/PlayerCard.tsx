"use client";

import { GeneratedCardProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import CardActions from "./CardActions";
import SellCard from "./SellCard";

const PlayerCard = ({
  cardData,
  small,
  refetch
}: {
  cardData: GeneratedCardProps;
  small: boolean;
  refetch?: any;
}) => {
  const [showSellingOptions, setShowSellingOptions] = useState<boolean>(false);
  const [showPlayerInfo, setShowPlayerInfo] = useState<boolean>(false);

  return cardData.selling === false ? (
    <div
      className="cursor-pointer max-w-[165px] max-h-[225px] w-full h-full flex items-center justify-center"
      onClick={() => setShowPlayerInfo(true)}
    >
      {small ? (
        <Image
          src={cardData.cardImage}
          alt="Card Image"
          width={125}
          height={215}
          className="max-w-[125px] max-h-[215px] w-full h-full object-contain"
        />
      ) : (
        <Image
          src={cardData.cardImage}
          alt="Card Image"
          width={165}
          height={250}
          className="max-w-[185px] max-h-[250px] w-full h-full object-contain"
        />
      )}

      {showPlayerInfo && (
        <CardActions
          cardData={cardData}
          showState={setShowPlayerInfo}
          showSellingOptions={setShowSellingOptions}
        />
      )}

      {showSellingOptions && (
        <SellCard
          cardData={cardData}
          showState={setShowSellingOptions}
          showPlayerState={setShowPlayerInfo}
          refetch={refetch}
        />
      )}
    </div>
  ) : (
    <></>
  );
};

export default PlayerCard;
