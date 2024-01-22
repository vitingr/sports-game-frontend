"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { MdNewReleases } from "react-icons/md";

const Header = () => {
  return (
    <header className="fixed bg-white w-full flex flex-col items-center z-50">
      <div className="max-w-[1600px] flex justify-between gap-6 w-full p-6">
        <h1 className="font-extrabold text-3xl w-full flex justify-center">
          FUT24
        </h1>
        <ul className="list-none flex gap-10 items-center w-full justify-around">
          <Link
            href={"/home"}
            className="transition-all duration-300 hover:text-indigo-700"
          >
            Início
          </Link>
          <Link
            href={"/friends"}
            className="transition-all duration-300 hover:text-indigo-700"
          >
            Amigos
          </Link>
          <Link
            href={"/shop"}
            className="transition-all duration-300 hover:text-indigo-700"
          >
            Loja
          </Link>
          <Link
            href={"/market"}
            className="transition-all duration-300 hover:text-indigo-700"
          >
            Mercado
          </Link>
          <Link
            href={"/lineups"}
            className="transition-all duration-300 hover:text-indigo-700"
          >
            Elencos
          </Link>
          <Link
            href={"/my-club"}
            className="transition-all duration-300 hover:text-indigo-700"
          >
            Meu Clube
          </Link>
        </ul>
        <div className="w-full flex justify-center items-center gap-6">
          <Link href={"/sign-in"} className="w-[100px] px-4 py-2 text-sm cursor-pointer rounded-xl bg-[#5BB5A2] text-white text-center">
            Login
          </Link>
          <Link href={"/sign-up"} className="w-[100px] px-4 py-2 text-sm cursor-pointer rounded-xl border border-[#5BB5A2] text-[#5BB5A2] text-center">
            Cadastro
          </Link>
        </div>
      </div>
      <div className="w-full text-white p-4 bg-indigo-500 h-[50px] gap-4 flex items-center justify-center cursor-pointer">
        <span className="text-white tracking-wider">
          Confira as novidades da nossa Loja
        </span>
        <MdNewReleases className="white-icon" size={20} />
      </div>
    </header>
  );
};

export default Header;
