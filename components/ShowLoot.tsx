import { GeneratedCardProps } from "@/types";
import React from "react";
import Popup from "./config/Popup";
import LootCard from "./LootCard";

type ShowLootProps = {
  loot: any;
  showState: any;
  packRarity: string;
};

const ShowLoot = ({ loot, showState, packRarity }: ShowLootProps) => {
  return (
    <Popup
      title="Cartas Encontradas no Pacote"
      description="Aqui é possível ver as cartas as quais você encontrou no pacote recém aberto, elas podem ser utilizadas em suas escalações, vendidas no menu, mercado de transferências ou utilizadas em desafios de montagem de elencos"
      state={showState}
    >
      <div className="mt-12">
        {packRarity === "players_pack" && (
          <>
            {loot.openPlayersPack.map(
              (card: GeneratedCardProps, index: number) => (
                <LootCard cardData={card} />
              )
            )}
          </>
        )}
        {packRarity === "rare_gold_pack" && (
          <>
            {loot.openRareGoldPack.map(
              (card: GeneratedCardProps, index: number) => (
                <LootCard cardData={card} />
              )
            )}
          </>
        )}
        {packRarity === "gold_pack" && (
          <>
            {loot.openGoldPack.map(
              (card: GeneratedCardProps, index: number) => (
                <LootCard cardData={card} />
              )
            )}
          </>
        )}
        {packRarity === "rare_silver_pack" && (
          <>
            {loot.openRareSilverPack.map(
              (card: GeneratedCardProps, index: number) => (
                <LootCard cardData={card} />
              )
            )}
          </>
        )}
        {packRarity === "silver_pack" && (
          <>
            {loot.openSilverPack.map(
              (card: GeneratedCardProps, index: number) => (
                <LootCard cardData={card} />
              )
            )}
          </>
        )}
        {packRarity === "bronze_pack" && (
          <>
            {loot.openBronzePack.map(
              (card: GeneratedCardProps, index: number) => (
                <LootCard cardData={card} />
              )
            )}
          </>
        )}
      </div>
    </Popup>
  );
};

export default ShowLoot;
