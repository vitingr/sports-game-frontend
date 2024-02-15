"use client";

import ToastMessage from "@/components/config/ToastMessage";
import { BRASILEIRAO_QUIZ } from "@/constants/brasileirao-quiz";
import { GLOBAL_QUIZ } from "@/constants/global-quiz";
import { infoUser } from "@/contexts/UserContext";
import { COMPLETE_QUIZ } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {

  const {user, getUserInfo} = infoUser()

  const router = useRouter()
  
  const [finishQuiz] = useMutation(COMPLETE_QUIZ)

  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<any>(null);
  const [selectedAnswerText, setSelectedAnswerText] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);

  const { questions } = GLOBAL_QUIZ;
  const { question, answers } = questions[activeQuestion];

  const nextQuestion = async () => {
    setSelectedAnswerIndex(null);

    if (activeQuestion !== questions.length - 1) {
      if (selectedAnswerText === questions[activeQuestion].correctAnswer) {
        setActiveQuestion((prev) => prev + 1);
        toast.success("Você acertou a questão!");
      } else {
        setActiveQuestion(0);
        setChecked(false);
        toast.error("Questão errada!");
        router.push("/challenges")
      }
    } else {
      setActiveQuestion(0);
      setShowResult(true);
      setChecked(false);

      await finishQuiz({
        variables: {
          userId: user.id,
          quiz: "global",
          prize: 750
        }
      }).then(async () => {
        toast.info("Você finalizou o quiz Global do Futebol")
        await getUserInfo()
      })
    }
  };

  const onAnswerSelected = async (answer: string, index: number) => {
    setChecked(true);
    setSelectedAnswerIndex(index);
    setSelectedAnswerText(answer);
  };

  useEffect(() => {
    if (user.id !== undefined && user.id !== "") {
      if (user?.quizCompleted.includes("global")) {
        router.push("/challenges")
        toast.error("Não é possível realizar o mesmo quiz mais de uma vez")
      }
    }
  }, [user])

  return (
    <div className="flex items-center gap-6 w-full max-w-[550px] sm:mt-[2em] flex-col mt-[150px]">
      <div className="flex flex-col items-center gap-6 w-full max-w-[550px] bg-white p-10 rounded-xl shadow-md shadow-neutral-200 border border-neutral-100">
        <ToastMessage />
        <div className="w-full">
          {!showResult ? (
            <div className="w-full">
              <span className="text-[#717171] text-sm">
                Questão {activeQuestion + 1}
              </span>
              <h2 className="pb-8 pt-4 font-semibold text-xl">
                {questions[activeQuestion].question}
              </h2>
              {answers.map((answer: string, idx: number) => (
                <li
                  key={idx}
                  onClick={() => onAnswerSelected(answer, idx)}
                  className={
                    selectedAnswerIndex === idx
                      ? "list-none text-lg py-2 my-2 bg-emerald-200 cursor-pointer transition-all duration-300 hover:bg-emerald-300 p-2 text-emerald-900 rounded-xl"
                      : "list-none text-lg py-2 my-2 border-b border-neutral-200 cursor-pointer transition-all duration-300 hover:bg-neutral-50 p-2"
                  }
                >
                  {answer}
                </li>
              ))}
              {checked ? (
                <button
                  onClick={() => nextQuestion()}
                  className="mt-8 p-3 cursor-pointer w-full text-center rounded-xl bg-emerald-500 transition-all duration-300 hover:bg-emerald-600 text-white"
                >
                  {activeQuestion === questions.length - 1
                    ? "Finalizar"
                    : "Avançar"}
                </button>
              ) : (
                <button className="mt-8 p-3 cursor-not-allowed w-full text-center rounded-xl bg-neutral-300 text-white">
                  {activeQuestion === questions.length - 1
                    ? "Finalizar"
                    : "Avançar"}
                </button>
              )}
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <h1 className="text-2xl text-emerald-600 cursor-default">Parabéns, você concluiu o Quiz!</h1>
              <p className="mt-2">
                Como forma de premiar você, iremos recompensa-lo com alguns
                itens na qual foram informados anteriormente à conclusão do
                mesmo. Abaixo você pode conferir
              </p>

              <div className="mt-8 flex w-full items-center justify-center">
                <p className="preco-produto-loja flex items-center gap-2 text-xl text-[#717171] mt-2">
                  <Image
                    src={"/assets/coins.png"}
                    alt="Price Icon"
                    width={25}
                    height={25}
                  />
                  750 moedas
                </p>
              </div>

              <Link href={"/challenges"} className="mt-10 text-center w-full rounded-xl bg-emerald-500 transition-all duration-300 hover:bg-emerald-600 text-white cursor-pointer p-3">Voltar ao menu</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
