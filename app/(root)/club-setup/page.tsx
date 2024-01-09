"use client";

import ToastMessage from "@/components/config/ToastMessage";
import { infoUser } from "@/contexts/UserContext";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const { user } = infoUser();

  const [step, setStep] = useState<number>(1);

  // Validation Status
  const [nationStatus, setNationStatus] = useState<boolean>(false);
  const [badgeStatus, setBadgeStatus] = useState<boolean>(true);
  const [checked, setChecked] = useState<string>("");
  const [newClubname, setNewClubname] = useState<string>("");

  const nextStep = async () => {
    const currentStep = step;
    setStep(currentStep + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[1050px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
      <ToastMessage />
      {step === 1 && (
        <div className="flex flex-col w-full items-center">
          <h1 className="text-3xl font-bold w-full transition-all duration-300 hover:text-indigo-600 cursor-default mt-4">
            Escolha uma liga para receber seus jogadores iniciais
          </h1>
          <p className="text-[#717171]">
            Após escolher um dos países abaixo, você irá receber 11 jogadores
            que pertencem a liga daquele respectivo país para montar o seu
            clube, porém, independente da liga, todos os jogadores terão a mesma
            classificação média.
          </p>

          <div className="flex flex-col justify-center gap-4 w-full max-w-[425px] mt-16">
            <div className="flex gap-4 w-full justify-between items-center">
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "brasil" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("brasil")}
              >
                <Image
                  src={"/assets/brasil.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "argentina" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("argentina")}
              >
                <Image
                  src={"/assets/argentina.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "uruguai" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("uruguai")}
              >
                <Image
                  src={"/assets/uruguai.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
            </div>
            <div className="flex gap-4 w-full justify-between items-center">
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "usa" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("usa")}
              >
                <Image
                  src={"/assets/usa.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "mexico" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("mexico")}
              >
                <Image
                  src={"/assets/mexico.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "colombia" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("colombia")}
              >
                <Image
                  src={"/assets/colombia.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
            </div>
            <div className="flex gap-4 w-full justify-between items-center">
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "chile" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("chile")}
              >
                <Image
                  src={"/assets/chile.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "equador" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("equador")}
              >
                <Image
                  src={"/assets/equador.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "paraguai" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("paraguai")}
              >
                <Image
                  src={"/assets/paraguai.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
            </div>
            <div className="flex gap-4 w-full justify-between items-center">
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "peru" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("peru")}
              >
                <Image
                  src={"/assets/peru.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "venezuela" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("venezuela")}
              >
                <Image
                  src={"/assets/venezuela.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
              <div
                className={`w-full flex flex-col items-center  p-6 cursor-pointer rounded-xl ${
                  checked === "bolivia" ? "bg-neutral-100" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("bolivia")}
              >
                <Image
                  src={"/assets/bolivia.png"}
                  alt="League Flag"
                  width={75}
                  height={75}
                />
              </div>
            </div>
            {checked !== "" ? (
              <button
                type="button"
                onClick={() => nextStep()}
                className="bg-indigo-500 text-white rounded-full py-3 w-full cursor-pointer mt-16"
              >
                Próxima Etapa
              </button>
            ) : (
              <button
                type="button"
                onClick={() => nextStep()}
                className="bg-neutral-200 py-3 rounded-full w-full cursor-not-allowed mt-16"
              >
                Próxima Etapa
              </button>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col w-full items-center">
          <h1 className="text-3xl font-bold w-full transition-all duration-300 hover:text-indigo-600 cursor-default mt-4">
            Escolha um emblema para o seu clube
          </h1>
          <p className="text-[#717171]">
            Nossa plataforma oferece alguns emblemas iniciais para você escolher
            para seu clube, abaixo você pode ver eles e escolher o emblema de
            sua preferência para montar o seu clube.
          </p>

          <button
            type="button"
            onClick={() => nextStep()}
            className="bg-indigo-500 text-white rounded-full py-3 w-full cursor-pointer mt-16"
          >
            Próxima Etapa
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col w-full items-center">
          <h1 className="text-3xl font-bold w-full transition-all duration-300 hover:text-indigo-600 cursor-default mt-4">
            Escolha um nome para o seu clube
          </h1>
          <p className="text-[#717171]">
            Nossa plataforma gera automaticamente um nome genérico para o seu
            clube, porém, você pode personaliza-lo e colocar um nome de sua
            escolha. Um bom nome para o seu clube é extremamente fundamental
            para a sua identidade.
          </p>

          <h2 className="w-full mb-10 mt-10 text-[#717171] text-lg">
            Nome Atual: <span className="text-lg">{user.clubname}</span>
          </h2>

          <label htmlFor="clubname">Novo nome</label>
          <input
            defaultValue={user.clubname}
            type="text"
            name="clubname"
            id="clubname"
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg outline-none transition-all duration-300 focus:border-indigo-600"
            placeholder="Digite o novo nome desejado para seu time"
            onChange={(e) => setNewClubname(e.target.value)}
            autoComplete="off"
          />

          <button
            type="button"
            onClick={() => nextStep()}
            className="bg-indigo-500 text-white rounded-full py-3 w-full cursor-pointer mt-16"
          >
            Próxima Etapa
          </button>
        </div>
      )}
    </div>
  );
};

export default page;
