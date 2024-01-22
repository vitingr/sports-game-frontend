import { GeneratedBadgeProps } from "@/types";
import Image from "next/image";
import React from "react";

const LootBadge = ({ badgeData }: { badgeData: GeneratedBadgeProps }) => {
  return (
    <div className=" border-b border-neutral-200 flex gap-2 justify-between items-center">
      <div className="w-[145px] h-[175px] flex items-center justify-center">
        <img
          src={badgeData.badgeImage}
          alt="Card Image"
          className="max-w-[75px] max-h-[75px] object-contain"
        />
      </div>
      <div className="w-full">
        <h1 className="text-xl">{badgeData.clubname}</h1>
        <h2 className="text-[#717171]">Emblema de clube do jogador</h2>
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
            <p className="text-sm">{badgeData.maxValue}</p>
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
            <p className="text-sm">{badgeData.minValue}</p>
          </span>
        </h2>
      </div>
      <div className="text-white bg-[#5BB5A2] rounded-xl py-2 w-[200px] text-sm text-center cursor-pointer transition-all duration-200 hover:bg-[#57ac99]">
        Venda Rápida
      </div>
    </div>
  );
};

export default LootBadge;
