import { GeneratedCardProps } from "@/types";
import Image from "next/image";
import React from "react";

const LootCard = ({ cardData }: { cardData: GeneratedCardProps }) => {
  return (
    <div className=" border-b border-neutral-200 flex gap-2 justify-between items-center">
      <Image
        src={cardData.cardImage}
        alt="Card Image"
        width={100}
        height={200}
        className="max-w-[125px] max-h-[250px] w-full h-full"
      />
      <div className="w-full">
        <h1 className="text-xl">{cardData.name}</h1>
        <h2 className="text-[#717171]">{cardData.club} - {cardData.league || "Brasileirão Série A"}</h2>
        <h2 className="flex mt-6 text-sm">
          Valor máximo:
          <span className="flex gap-2 items-center ml-2">
            <Image
              src={"/assets/coins.png"}
              alt="Currency Icon"
              width={12}
              height={12}
              className="w-[12.5px] h-[12.5px]"
            />
            <p className="text-sm">{cardData.maxValue}</p>
          </span>
        </h2>
        <h2 className="flex text-sm">
          Valor mínimo:
          <span className="flex gap-2 items-center ml-2">
            <Image
              src={"/assets/coins.png"}
              alt="Currency Icon"
              width={12}
              height={12}
              className="w-[12.5px] h-[12.5px]"
            />
            <p className="text-sm">{cardData.minValue}</p>
          </span>
        </h2>
      </div>
      <div></div>
    </div>
  );
};

export default LootCard;
