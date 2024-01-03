import { LineupProps } from "@/types";
import React from "react";

const Lineup = ({ lineupData }: { lineupData: LineupProps }) => {
  return (
    <div className="h-[200px] w-[250px] flex flex-col border border-neutral-200 shadow-sm shadow-neutral-100 rounded-xl">
      <div
        className="h-[75px] rounded-t-xl bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://d585tldpucybw.cloudfront.net/sfimages/default-source/professional-services/ui-ux-modernization-hero.png?sfvrsn=d92d0367_3)`,
        }}
      />
      <div className="p-4">
        <h1 className="text-center font-semibold text-lg">{lineupData.name}</h1>
        <p className="text-center text-[#717171] text-sm">
          Overall da Lineup: {lineupData.totalOverall}
        </p>
        <div className="mt-6 text-sm text-indigo-400 border border-indigo-300 cursor-pointer px-4 py-2 rounded-xl text-center">
          Editar Elenco
        </div>
      </div>
    </div>
  );
};

export default Lineup;
