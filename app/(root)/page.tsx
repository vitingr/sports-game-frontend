"use client";

import Hero from "@/components/hero/Hero";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  slideInFromTop,
  slideInFromLeft,
  slideInFromRight,
} from "@/utils/common/motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="w-full flex flex-col items-center"
    >
      {/* <Hero /> */}
      <section className="w-full max-w-[1050px] flex justify-between gap-10 pt-[150px] pb-[75px] sm:flex-nowrap flex-wrap p-6 sm:p-0 mt-[50px] sm:mt-[150px]">
        <div className="w-full flex flex-col items-center">
          <div className="">
            <h1 className="text-5xl font-bold">Seja Bem-Vindo</h1>
            <h2 className="text-2xl">Monte seu time dos sonhos conosco</h2>

            <p className="mt-8 text-lg text-[#717171] max-w-[350px] text-justify break-all">
              Monte sua equipe dos sonhos com jogadores das mais diversas ligas
              e clubes para competir com os outros jogadores
            </p>

            <div className="flex gap-6 mt-8 max-w-[350px] w-full">
              <div className="bg-[#5BB5A2] text-white py-3 rounded-xl w-full text-center cursor-pointer">
                Bora lá
              </div>
              <div className=" text-[#5BB5A2] py-3 w-full text-center cursor-pointer">
                Ver modos de jogo
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col place-items-center">
        <Image alt="Main Image" src={"/assets/suarez.png"} width={300} height={300} />
        </div>
      </section>
      <div
        className="w-full flex flex-col items-center py-16 max-w-[1050px] border-b pb-[4em] border-neutral-300 overflow-hidden"
      >
        <h1 className="uppercase tracking-wider text-4xl font-bold cursor-default">
          Modos de Jogo
        </h1>
        <div className="w-full sm:justify-between justify-center flex gap-10 p-6 sm:p-0 items-center mt-[6.5em] sm:flex-nowrap flex-wrap">
          <div className="bg-transparent border border-neutral-200 p-6 rounded-xl w-[325px] h-[250px]">
            <Image
              width={35}
              height={35}
              alt="Icon"
              src={"/assets/icon1.svg"}
            />
            <h2 className="text-2xl mt-6 font-bold">Fut Team</h2>
            <p className="text-[#717171] text-base">
              Abra Pacotes e encontre jogadores para formar o seu time dos
              sonhos
            </p>
            <div className="bg-[#5BB5A2] text-white text-center px-4 py-2 w-full rounded-full mt-12 cursor-pointer">
              Quero ver mais
            </div>
          </div>
          <div className="bg-transparent border border-neutral-200 p-6 rounded-xl w-[325px] h-[250px]">
            <Image
              width={35}
              height={35}
              alt="Icon"
              src={"/assets/icon2.svg"}
            />
            <h2 className="text-2xl mt-6 font-bold">DMEs</h2>
            <p className="text-[#717171] text-base">
              Troque jogadores em desafios para ser recompensado com vários
              itens
            </p>
            <div className="bg-[#5BB5A2] text-white text-center px-4 py-2 w-full rounded-full mt-12 cursor-pointer">
              Quero ver mais
            </div>
          </div>
          <div className="bg-transparent border border-neutral-200 p-6 rounded-xl w-[325px] h-[250px]">
            <Image
              width={35}
              height={35}
              alt="Icon"
              src={"/assets/icon3.svg"}
            />
            <h2 className="text-2xl mt-6 font-bold">Batalhas</h2>
            <p className="text-[#717171] text-base">
              Encontre um adversário capaz de desafiar o seu clube e seus
              jogadores
            </p>
            <div className="bg-[#5BB5A2] text-white text-center px-4 py-2 w-full rounded-full mt-12 cursor-pointer">
              Quero ver mais
            </div>
          </div>
        </div>
      </div>
      <div
        className="bg-[#5bb5a252] p-16 w-full flex flex-col items-center mt-[8em] mb-[10em] overflow-hidden"
      >
        <div className="max-w-[1050px] w-full flex flex-col">
          <h1>baby baby</h1>
        </div>

      </div>
      <div
        className="w-full flex flex-col items-center mt-[4em] mb-[20em] max-w-[1050px] overflow-hidden p-6 sm:p-0"
      >
        <h1 className="uppercase tracking-wider text-5xl font-bold cursor-default">
          Nossos Eventos
        </h1>
        <div className="w-full max-w-[750px] sm:justify-between flex gap-10 items-center mt-[5em] sm:flex-nowrap flex-wrap justify-center">
          <Image
            src={"/assets/otw.jpg"}
            alt="Ones to Watch Logo"
            width={350}
            height={500}
            className="w-[350px] h-[500px] object-contain rounded-xl"
          />
          <p className="text-[#717171] text-base sm:text-2xl tracking-wide text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            itaque iure sed ducimus, blanditiis, sequi minus laborum
            necessitatibus modi rerum vel beatae suscipit magni corporis. Dolor
            necessitatibus inventore distinctio quo. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Rem, nostrum consequuntur provident
            mollitia corporis autem a blanditiis consequatur eum voluptate,
            neque sequi hic suscipit vitae quis obcaecati corrupti! Officia,
            aliquid.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
