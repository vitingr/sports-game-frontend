"use client";

import UploadImage from "@/components/config/Upload";
import { PlayerCardProps } from "@/types";
import React, { useState } from "react";

const page = () => {
  const [cardInfo, setCardInfo] = useState<PlayerCardProps | any>({
    name: "",
    club: "",
    league: "",
    type: "",
    overall: 0,
    pace: 0,
    finalization: 0,
    pass: 0,
    drible: 0,
    defense: 0,
    physic: 0,
  });

  const [showSendImage, setShowSendImage] = useState<boolean>(false)
  const [image, setImage] = useState<string>("")

  return (
    <div>
      <form className="flex flex-col items-center gap-10">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nome"
          onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
          autoComplete="off"
          className="outline-none px-2 py-1 border border-neutral-200"
        />

        <input
          type="text"
          name="club"
          id="clube"
          placeholder="Clube"
          onChange={(e) => setCardInfo({ ...cardInfo, club: e.target.value })}
          autoComplete="off"
          className="outline-none px-2 py-1 border border-neutral-200"
        />

        <input
          type="text"
          name="league"
          id="league"
          placeholder="League"
          onChange={(e) => setCardInfo({ ...cardInfo, league: e.target.value })}
          autoComplete="off"
          className="outline-none px-2 py-1 border border-neutral-200"
        />

        <input
          type="text"
          name="type"
          id="type"
          placeholder="Tipo"
          onChange={(e) => setCardInfo({ ...cardInfo, type: e.target.value })}
          autoComplete="off"
          className="outline-none px-2 py-1 border border-neutral-200"
        />

        <div>
          <p>overall</p>
          <input
            type="number"
            name="overall"
            id="overall"
            className="outline-none px-2 py-1 border border-neutral-200"
          />
        </div>
        <div>
          <p>Pace</p>
          <input
            type="number"
            name="pace"
            id="pace"
            className="outline-none px-2 py-1 border border-neutral-200"
          />
        </div>
        <div>
          <p>finalization</p>
          <input
            type="number"
            name="finalization"
            id="finalization"
            className="outline-none px-2 py-1 border border-neutral-200"
          />
        </div>
        <div>
          <p>pass</p>
          <input
            type="number"
            name="pass"
            id="pass"
            className="outline-none px-2 py-1 border border-neutral-200"
          />
        </div>
        <div>
          <p>drible</p>
          <input
            type="number"
            name="drible"
            id="drible"
            className="outline-none px-2 py-1 border border-neutral-200"
          />
        </div>
        <div>
          <p>defense</p>
          <input
            type="number"
            name="defense"
            id="defense"
            className="outline-none px-2 py-1 border border-neutral-200"
          />
        </div>
        <div>
          <p>physic</p>
          <input
            type="number"
            name="physic"
            id="physic"
            className="outline-none px-2 py-1 border border-neutral-200"
          />
        </div>

        <div className="w-full text-white cursor-pointer bg-indigo-600" onClick={() => setShowSendImage(!showSendImage)}>
          Enviar foto
        </div>
        {showSendImage && (
          <UploadImage currentFoto={image} setState={setImage} show={setShowSendImage} />
        )}

        <img src={image} alt="teste" />

        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-full w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default page;
