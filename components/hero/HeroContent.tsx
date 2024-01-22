"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromTop,
  slideInFromLeft,
  slideInFromRight,
} from "@/utils/common/motion";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center px-6 sm:px-20 mt-72 w-full z-[20]"
    >
      <motion.div variants={slideInFromTop(0.5)}>
        <h1 className="text-white text-[72px] font-extrabold">FUT 24</h1>
      </motion.div>

      <motion.div variants={slideInFromRight(0.75)}>
        <h2 className="text-white text-4xl font-bold text-center italic">Boas-vindas ao <br />seu Clube</h2>
      </motion.div>

      <motion.div variants={slideInFromRight(1.25)}>
        <p className="text-white text-center text-xl mt-6 max-w-[650px]">
          O FUT 24 FC™ chegou: o próximo capítulo do Jogo de Todo Mundo.
          Junte-se a nós para criar o futuro do futebol com base na inovação e
          na autenticidade, com mais de 200 atletas com licenças completas, 60
          times e 5 ligas.
        </p>
      </motion.div>

      <motion.div variants={slideInFromLeft(1.5)}>
        <div className="bg-[#5BB5A2] text-white px-4 py-3 rounded-xl text-center w-[350px] cursor-pointer transition-all duration-300 hover:bg-[#53a593] mt-12">
          Bora lá
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
