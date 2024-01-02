"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import {
  IoMenuOutline,
  IoTicketOutline,
  IoSettingsOutline,
  IoAdd,
  IoHomeOutline,
} from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineHeart } from "react-icons/ai";
import { infoUser } from "@/contexts/UserContext";
import { MdNewReleases } from "react-icons/md";
import Image from "next/image";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const userInfo = infoUser();
  const { data, user } =
    userInfo.user && userInfo.user.id !== undefined
      ? userInfo
      : { data: null, user: null };

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
          {user ? (
            <>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 justify-between">
                  <span className="text-[#717171] text-xs w-full justify-end flex">
                    {user.currency}
                  </span>
                  <Image
                    src={"/assets/coins.png"}
                    alt="Currency Icon"
                    width={15}
                    height={15}
                  />
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <span className="text-[#717171] text-xs w-full justify-end flex">
                    {user.futpoints}
                  </span>
                  <Image
                    src={"/assets/points.png"}
                    alt="Currency Icon"
                    width={15}
                    height={15}
                  />
                </div>
              </div>

              <UserButton afterSignOutUrl="/" />
              <GoSearch size={22.5} className="cursor-pointer gray-icon" />
              <IoMenuOutline
                size={22.5}
                className="cursor-pointer gray-icon"
                onClick={() => setShowMenu(!showMenu)}
              />
            </>
          ) : (
            <>
              <Link
                href={"/sign-in"}
                className="w-[100px] px-4 py-2 text-sm cursor-pointer rounded-xl bg-indigo-600 text-white text-center"
              >
                Login
              </Link>
              <Link
                href={"/sign-up"}
                className="w-[100px] px-4 py-2 text-sm cursor-pointer rounded-xl border border-indigo-600 text-indigo-600 text-center"
              >
                Cadastro
              </Link>
            </>
          )}
        </div>

        {showMenu && (
          <div className="z-20 fixed right-0 bg-[#fff] shadow-md h-[650px] w-[350px] border border-[#f7f7f7] translate-y-2 transition-all rounded-lg sm:mt-[25px] mt-[150px] lg:left-[64%]">
            <div className="p-10">
              <h1 className="text-3xl font-bold text-center">
                Olá, {data.username}
              </h1>
            </div>
            <div className="w-full flex gap-4 p-6 bg-[#f7f7f7] items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6075/6075725.png"
                className="w-[50px] h-[50px] selection:bg-transparent"
                alt="Cellphone Image"
              />
              <div>
                <h4 className="text-sm font-bold">Baixe suas receitas</h4>
                <p className="text-sm text-[#717171]">
                  Baixe as suas receitas favoritas no seu celular, para
                  acessá-las quando desejar, sem precisar de internet.
                </p>
                <h2 className="mt-6 text-[#f1656a] font-bold text-sm">
                  Ativar
                </h2>
              </div>
            </div>
            <div className="p-10 gap-8 w-full flex flex-col">
              <Link
                href={"/"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="home"
              >
                <IoHomeOutline size={30} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Início</h3>
              </Link>
              <Link
                href={"/home"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="purchases"
              >
                <IoTicketOutline size={30} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">
                  Explorar Receitas
                </h3>
              </Link>
              <Link
                href={"/profile/favouritesRecipes"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="coupons"
              >
                <AiOutlineHeart size={30} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">
                  Receitas Favoritas
                </h3>
              </Link>
              {/* {data.getUser.partner ? (
                <Link
                  href="/home/createRecipe"
                  className="flex w-full justify-between items-center gap-8 cursor-pointer"
                >
                  <IoAdd size={30} className="gray-icon" />
                  <h3 className="text-[#717171] w-full text-lg">
                    Adicionar uma Receita
                  </h3>
                </Link>
              ) : (
                <Link
                  href="/profile/partner"
                  className="flex w-full justify-between items-center gap-8 cursor-pointer"
                >
                  <RiShakeHandsLine size={30} className="gray-icon" />
                  <h3 className="text-[#717171] w-full text-lg">
                    Quero ser Parceiro
                  </h3>
                </Link>
              )} */}
              <Link
                href={"/profile"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="profile"
              >
                <IoSettingsOutline size={30} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Meu Perfil</h3>
              </Link>
              <div className="flex w-full justify-between items-center gap-8 cursor-pointer">
                <VscSignOut size={30} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Sair</h3>
              </div>
            </div>
          </div>
        )}
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

export default Navbar;
