"use client";

import ToastMessage from "@/components/config/ToastMessage";
import UploadImage from "@/components/config/Upload";
import { CREATE_CARD } from "@/graphql/mutations";
import { PlayerCardProps } from "@/types";
import { getMaxValue } from "@/utils/functions/getMaxValue";
import { getMinValue } from "@/utils/functions/getMinValue";
import { getQuickSellValue } from "@/utils/functions/getQuickSellValue";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [cardInfo, setCardInfo] = useState<PlayerCardProps | any>({
    name: "",
    club: "",
    league: "",
    type: "",
    position: "",
    overall: 0,
    pace: 0,
    finalization: 0,
    pass: 0,
    drible: 0,
    defense: 0,
    physic: 0,
  });

  const [showSendImage, setShowSendImage] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const [createCard] = useMutation(CREATE_CARD);

  const handleCreateCard = async () => {
    let quickSellValue = await getQuickSellValue(cardInfo.overall);
    let maxValue = await getMaxValue(cardInfo.overall);
    let minValue = await getMinValue(cardInfo.overall);

    let photoDatabase;

    if (image !== "") {
      const imageUpload = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({
          path: image,
        }),
      });

      if (imageUpload.ok) {
        photoDatabase = await imageUpload.json();
        try {
          await createCard({
            variables: {
              cardImage: photoDatabase.url as string,
              name: cardInfo.name,
              club: cardInfo.club,
              league: cardInfo.league,
              type: cardInfo.type,
              position: cardInfo.position,
              overall: Number(cardInfo.overall),
              pace: Number(cardInfo.pace),
              finalization: Number(cardInfo.finalization),
              pass: Number(cardInfo.pass),
              drible: Number(cardInfo.drible),
              defense: Number(cardInfo.defense),
              physic: Number(cardInfo.physic),
              minValue: minValue,
              maxValue: maxValue,
              quickSellValue: quickSellValue,
            },
          }).then(() => {
            setCardInfo({
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
          });
          toast.success("Carta Criada com Sucesso!");
        } catch (error) {
          console.log(error);
          toast.error("Não foi possível criar a carta");
        }
      }
    }
  };

  return (
    <div>
      <form
        className="flex flex-col items-center gap-10"
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();
          await handleCreateCard();
        }}
      >
        <ToastMessage />
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nome"
          onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
          autoComplete="off"
          className="outline-none px-2 py-1 border border-neutral-200"
        />

        <select
          name="club"
          id="club"
          onChange={(e) => setCardInfo({ ...cardInfo, club: e.target.value })}
          autoComplete="off"
          className="outline-none px-2 py-1 border border-neutral-200 w-full"
        >
          <option value=""></option>
          <option value="Idolos">Idolos</option>
          <option value="Palmeiras">Palmeiras</option>
          <option value="Flamengo">Flamengo</option>
          <option value="São Paulo">São Paulo</option>
          <option value="Grêmio">Grêmio</option>
          <option value="Atlético Mineiro">Atlético Mineiro</option>
          <option value="Red Bull Bragantino">Red Bull Bragantino</option>
          <option value="Botafogo">Botafogo</option>
          <option value="Corinthians">Corinthians</option>
          <option value="Fortaleza">Fortaleza</option>
          <option value="Internacional">Internacional</option>
          <option value="Bahia">Bahia</option>
          <option value="Vasco">Vasco</option>
          <option value="Athlético Paranaense">Athlético Paranaense</option>
          <option value="Cuiabá">Cuiabá</option>
          <option value="Cruzeiro">Cruzeiro</option>
          <option value="Fluminense">Fluminense</option>
          <option value="Vitória">Vitória</option>
          <option value="Atlético Goianiense">Atlético Goianiense</option>
          <option value="Juventude">Juventude</option>
          <option value="Criciúma">Criciúma</option>
          <option value="Juventude">Universidad Católica</option>
          <option value="Criciúma">Nacional-URU</option>
          <option value="Santos">Santos</option>
          <option value="Vila Nova">Vila Nova</option>
          <option value="Chapecoense">Chapecoense</option>
          <option value="Coritiba">Coritiba</option>
          <option value="Sport Recife">Sport Recife</option>
          <option value="Valez Sarsfield">Velez Sarsfield</option>
          <option value="Estudiantes">Estudiantes</option>
          <option value="Talleres">Talleres</option>
          <option value="Bolívar">Bolívar</option>
          <option value="The Strongest">The Strongest</option>
          <option value="Banfield">Banfield</option>
          <option value="Lanús">Lanús</option>
          <option value="Blooming">Blooming</option>
          <option value="Deportivo Táchira">Deportivo Táchira</option>
          <option value="Independiente">Independiente</option>
        </select>

        <select
          name="league"
          id="league"
          onChange={(e) => setCardInfo({ ...cardInfo, league: e.target.value })}
          autoComplete="off"
          className="outline-none px-2 py-1 border border-neutral-200 w-full"
        >
          <option value=""></option>
          <option value="Brasileirão Série A">Brasileirao Serie A</option>
          <option value="Brasileirão Série B">Brasileirao Serie B</option>
          <option value="Liga Argentina">Liga Argentina</option>
          <option value="Liga Uruguai">Liga Uruguai</option>
          <option value="Liga Paraguai">Liga Paraguai</option>
          <option value="Liga Chile">Liga Chile</option>
          <option value="Liga Colômbia">Liga Colômbia</option>
          <option value="Liga Boliviana">Liga Boliviana</option>
          <option value="Liga Venezuelana">Liga Venezuelana</option>
          <option value="Idolos">Idolos</option>
        </select>

        <select
          name="type"
          id="type"
          onChange={(e) => setCardInfo({ ...cardInfo, type: e.target.value })}
          autoComplete="off"
          className="outline-none px-2 py-1 border border-neutral-200 w-full"
        >
          <option value=""></option>
          <option value="Bronze Comum">Bronze Comum</option>
          <option value="Bronze Raro">Bronze Raro</option>
          <option value="Prata Comum">Prata Comum</option>
          <option value="Prata Raro">Prata Raro</option>
          <option value="Ouro Comum">Ouro Comum</option>
          <option value="Ouro Raro">Ouro Raro</option>
          <option value="Idolo">Idolo</option>
          <option value="TOTW">TOTW</option>
          <option value="Ones to Watch">Ones to Watch</option>
        </select>

        <select
          name="position"
          id="position"
          onChange={(e) =>
            setCardInfo({ ...cardInfo, position: e.target.value })
          }
          autoComplete="off"
          className="outline-none px-2 py-1 border border-neutral-200 w-full"
        >
          <option value=""></option>
          <option value="Goleiro">Goleiro</option>
          <option value="Zagueiro">Zagueiro</option>
          <option value="Lateral Esquerdo">Lateral Esquerdo</option>
          <option value="Lateral Direito">Lateral Direito</option>
          <option value="Volante">Volante</option>
          <option value="Meio Campo">Meio Campo</option>
          <option value="Meia Armador">Meia Armador</option>
          <option value="Ponta Esquerda">Ponta Esquerda</option>
          <option value="Ponta Direita">Ponta Direita</option>
          <option value="Atacante">Atacante</option>
        </select>

        <div>
          <p>overall</p>
          <input
            type="number"
            name="overall"
            id="overall"
            className="outline-none px-2 py-1 border border-neutral-200"
            onChange={(e) =>
              setCardInfo({ ...cardInfo, overall: e.target.value })
            }
          />
        </div>
        <div>
          <p>Pace</p>
          <input
            type="number"
            name="pace"
            id="pace"
            className="outline-none px-2 py-1 border border-neutral-200"
            onChange={(e) => setCardInfo({ ...cardInfo, pace: e.target.value })}
          />
        </div>
        <div>
          <p>finalization</p>
          <input
            type="number"
            name="finalization"
            id="finalization"
            className="outline-none px-2 py-1 border border-neutral-200"
            onChange={(e) =>
              setCardInfo({ ...cardInfo, finalization: e.target.value })
            }
          />
        </div>
        <div>
          <p>pass</p>
          <input
            type="number"
            name="pass"
            id="pass"
            className="outline-none px-2 py-1 border border-neutral-200"
            onChange={(e) => setCardInfo({ ...cardInfo, pass: e.target.value })}
          />
        </div>
        <div>
          <p>drible</p>
          <input
            type="number"
            name="drible"
            id="drible"
            className="outline-none px-2 py-1 border border-neutral-200"
            onChange={(e) =>
              setCardInfo({ ...cardInfo, drible: e.target.value })
            }
          />
        </div>
        <div>
          <p>defense</p>
          <input
            type="number"
            name="defense"
            id="defense"
            className="outline-none px-2 py-1 border border-neutral-200"
            onChange={(e) =>
              setCardInfo({ ...cardInfo, defense: e.target.value })
            }
          />
        </div>
        <div>
          <p>physic</p>
          <input
            type="number"
            name="physic"
            id="physic"
            className="outline-none px-2 py-1 border border-neutral-200"
            onChange={(e) =>
              setCardInfo({ ...cardInfo, physic: e.target.value })
            }
          />
        </div>

        <div
          className="w-full text-white cursor-pointer bg-indigo-600"
          onClick={() => setShowSendImage(!showSendImage)}
        >
          Enviar foto
        </div>
        {showSendImage && (
          <UploadImage
            currentFoto={image}
            setState={setImage}
            show={setShowSendImage}
          />
        )}

        <img src={image} alt="teste" className="max-w-[200px] max-h-[200px]" />

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
