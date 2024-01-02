import React from "react";

const page = () => {
  return (
    <div className="flex flex-col w-full max-w-[1050px] mt-[2em] bg-white rounded-xl border border-neutral-100 shadow-md shadow-neutral-200 p-10">
      <h1 className="text-3xl font-bold transition-all duration-300 hover:text-indigo-600 cursor-default w-full">Minhas Escalações</h1>

      <div className="flex gap-8 mt-12">
        <div className="h-[200px] w-[250px] flex flex-col border border-neutral-200 shadow-sm shadow-neutral-100 rounded-xl">
          <div
            className="h-[75px] rounded-t-xl bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://d585tldpucybw.cloudfront.net/sfimages/default-source/professional-services/ui-ux-modernization-hero.png?sfvrsn=d92d0367_3)`,
            }}
          />
          <div className="p-4">
            <h1 className="text-center font-semibold text-lg">Main Lineup</h1>
            <p className="text-center text-[#717171] text-sm">
              Brasileirão Série A
            </p>
            <div className="mt-6 text-sm text-indigo-400 border border-indigo-300 cursor-pointer px-4 py-2 rounded-xl text-center">
              Editar Elenco
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-12 flex justify-center items-center">
        <button className="cta">
          <span>Adicionar Elenco</span>
          <svg viewBox="0 0 13 10" height="10px" width="15px">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default page;
