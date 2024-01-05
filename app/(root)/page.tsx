"use client";

import Hero from "@/components/hero/Hero";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  slideInFromTop,
  slideInFromLeft,
  slideInFromRight,
} from "@/utils/common/motion";
import {useInView} from 'react-intersection-observer'

export default function Home() {

  const { ref, inView } = useInView({
    triggerOnce: true
  })

    const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="w-full bg-[#161616] flex flex-col items-center"
    >
      <Hero />
      <motion.div ref={ref} animate={inView ? "visible" : "hidden"} initial="hidden" variants={slideInFromLeft(1)} className="w-full flex flex-col items-center -mt-52 py-16 max-w-[1050px]">
        <h1 className="uppercase text-white tracking-wider text-5xl font-bold cursor-default">
          Modos de Jogo
        </h1>
        <div className="w-full justify-between flex gap-10 items-center mt-[6.5em]">
          <div className="bg-[#f3f3f3] p-6 rounded-lg w-[325px] h-[200px]">
            <h2 className="text-3xl font-bold">Fut Team</h2>
            <p className="text-[#717171]">
              Abra Pacotes e encontre jogadores para formar o seu time dos
              sonhos
            </p>
            <div className="bg-[#36be6f] text-white text-center px-4 py-2 w-full rounded-full mt-12 cursor-pointer">
              Quero ver mais
            </div>
          </div>
          <div className="bg-[#f3f3f3] p-6 rounded-lg w-[325px] h-[200px]">
            <h2 className="text-3xl font-bold">DMEs</h2>
            <p className="text-[#717171]">
              Troque jogadores em desafios para ser recompensado com vários
              itens
            </p>
            <div className="bg-[#36be6f] text-white text-center px-4 py-2 w-full rounded-full mt-12 cursor-pointer">
              Quero ver mais
            </div>
          </div>
          <div className="bg-[#f3f3f3] p-6 rounded-lg w-[325px] h-[200px]">
            <h2 className="text-3xl font-bold">Batalhas</h2>
            <p className="text-[#717171]">
              Encontre um adversário capaz de desafiar o seu clube e seus
              jogadores
            </p>
            <div className="bg-[#36be6f] text-white text-center px-4 py-2 w-full rounded-full mt-12 cursor-pointer">
              Quero ver mais
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div ref={ref} animate={inView ? "visible" : "hidden"} initial="hidden" variants={slideInFromRight(1.5)} className="w-full flex flex-col items-center mt-[10em] mb-[20em] max-w-[1050px]">
        <h1 className="uppercase text-white tracking-wider text-5xl font-bold cursor-default">
          Nossos Eventos
        </h1>
        <div className="w-full max-w-[750px] justify-between flex gap-10 items-center mt-[6.5em]">
          <Image
            src={"/assets/otw.jpg"}
            alt="Ones to Watch Logo"
            width={400}
            height={500}
            className="w-[400px] h-[500px] object-contain rounded-xl"
          />
          <p className="text-white text-2xl tracking-wide text-center">
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
      </motion.div>
    </motion.div>
  );
}
