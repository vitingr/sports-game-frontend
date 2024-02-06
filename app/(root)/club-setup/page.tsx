"use client";

import ToastMessage from "@/components/config/ToastMessage";
import { infoUser } from "@/contexts/UserContext";
import { FINISH_CLUB_SETUP, PICK_STARTER_PACK } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const { user, getUserInfo } = infoUser();

  const router = useRouter();

  const [step, setStep] = useState<number>(1);

  // Mutations
  const [pickStarterTeam] = useMutation(PICK_STARTER_PACK);
  const [finishClubSetup] = useMutation(FINISH_CLUB_SETUP);

  // Validation Status
  const [nationStatus, setNationStatus] = useState<boolean>(false);
  const [badgeStatus, setBadgeStatus] = useState<boolean>(true);
  const [checked, setChecked] = useState<string>("");
  const [newClubname, setNewClubname] = useState<string>("");

  const nextStep = async () => {
    const currentStep = step;
    setStep(currentStep + 1);
  };

  const chooseLeague = async (league: string) => {
    try {
      await pickStarterTeam({
        variables: {
          userId: user.id,
          league: league,
        },
      });

      nextStep();
    } catch (error) {
      toast.error("Não foi possível escolher essa liga.");
    }
  };

  const createClub = async () => {
    try {
      await finishClubSetup({
        variables: {
          id: user.id,
          clubname: newClubname,
        },
      });

      await getUserInfo().then(() => {
        router.push("/my-club");
      });
    } catch (error) {
      toast.error("Não foi possível finalizar a criação do clube.");
    }
  };

  useEffect(() => {
    if (user.id !== undefined && user.id !== "") {
      if (user.newUser === false) {
        router.push("/my-club");
      } else {
        return
      }
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[1050px] sm:mt-[50px] mt-[150px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
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
                  checked === "Brasileirão Série A"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Brasileirão Série A")}
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
                  checked === "Liga Argentina"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Liga Argentina")}
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
                  checked === "Liga Uruguai"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Liga Uruguai")}
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
                  checked === "Major League Soccer"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Major League Soccer")}
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
                  checked === "Liga Mexicana"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Liga Mexicana")}
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
                  checked === "Liga Colômbia"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Liga Colômbia")}
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
                  checked === "Liga Chile" ? "bg-indigo-500" : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Liga Chile")}
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
                  checked === "Liga Equatoriana"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Liga Equatoriana")}
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
                  checked === "Liga Paraguai"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Liga Paraguai")}
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
                  checked === "Liga Peruana"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Liga Peruana")}
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
                  checked === "Liga Venezuelana"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Liga Venezuelana")}
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
                  checked === "Liga Boliviana"
                    ? "bg-indigo-500"
                    : "bg-neutral-100"
                }`}
                onClick={() => setChecked("Liga Boliviana")}
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
                onClick={async () => await chooseLeague(checked)}
                className="bg-indigo-500 text-white rounded-full py-3 w-full cursor-pointer mt-16"
              >
                Próxima Etapa
              </button>
            ) : (
              <button
                type="button"
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

          <label htmlFor="clubname" className="w-full">
            Novo nome
          </label>
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
            onClick={() => createClub()}
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
