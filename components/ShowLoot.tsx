import { GeneratedCardProps } from "@/types";
import React from "react";
import Popup from "./config/Popup";
import LootCard from "./LootCard";
import LootBadge from "./LootBadge";

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
      <div className="mt-12 h-[650px] overflow-y-scroll">
        {packRarity === "players_pack" && (
          <>
            {loot.openPlayersPack.map((card: any, index: number) => (
              <div key={index}>
                {card.cardImage === null ? (
                  <LootBadge badgeData={card} />
                ) : (
                  <LootCard cardData={card} />
                )}
              </div>
            ))}
          </>
        )}
        {packRarity === "rare_gold_pack" && (
          <>
            {loot.openRareGoldPack.map((card: any, index: number) => (
              <div key={index}>
                {card.cardImage === null ? (
                  <LootBadge badgeData={card} />
                ) : (
                  <LootCard cardData={card} />
                )}
              </div>
            ))}
          </>
        )}
        {packRarity === "gold_pack" && (
          <>
            {loot.openGoldPack.map((card: any, index: number) => (
              <div key={index}>
                {card.cardImage === null ? (
                  <LootBadge badgeData={card} />
                ) : (
                  <LootCard cardData={card} />
                )}
              </div>
            ))}
          </>
        )}
        {packRarity === "rare_silver_pack" && (
          <>
            {loot.openRareSilverPack.map((card: any, index: number) => (
              <div key={index}>
                {card.cardImage === null ? (
                  <LootBadge badgeData={card} />
                ) : (
                  <LootCard cardData={card} />
                )}
              </div>
            ))}
          </>
        )}
        {packRarity === "silver_pack" && (
          <>
            {loot.openSilverPack.map((card: any, index: number) => (
              <div key={index}>
                {card.cardImage === null ? (
                  <LootBadge badgeData={card} />
                ) : (
                  <LootCard cardData={card} />
                )}
              </div>
            ))}
          </>
        )}
        {packRarity === "bronze_pack" && (
          <>
            {loot.openBronzePack.map((card: any, index: number) => (
              <div key={index}>
                {card.cardImage === null ? (
                  <LootBadge badgeData={card} />
                ) : (
                  <LootCard cardData={card} />
                )}
              </div>
            ))}
          </>
        )}
      </div>
      <button className="text-white py-2 bg-indigo-600 rounded-full text-center mt-10 cursor-pointer w-full" onClick={() => showState(false)}>
        Fechar 
      </button>
    </Popup>
  );
};

export default ShowLoot;
