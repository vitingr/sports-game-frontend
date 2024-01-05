"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import {
  IoMenuOutline,
  IoSettingsOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import { LuFileSpreadsheet } from "react-icons/lu";
import { infoUser } from "@/contexts/UserContext";
import { MdNewReleases } from "react-icons/md";
import Image from "next/image";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const { data, user } = infoUser();

  return (
    <header className="fixed bg-white w-full flex flex-col items-center z-50">
      <div className="max-w-[1600px] flex justify-between gap-6 w-full p-6">
        <Link
          href={"/"}
          className="font-extrabold text-3xl w-full flex justify-left sm:justify-center cursor-pointer"
        >
          FUT24
        </Link>
        <ul className="list-none hidden sm:flex gap-10 items-center w-full justify-around">
          <Link
            href={"/home"}
            className="transition-all duration-300 hover:text-indigo-700 text-sm lg:text-base text-center"
          >
            Início
          </Link>
          <Link
            href={"/friends"}
            className="transition-all duration-300 hover:text-indigo-700 text-sm lg:text-base text-center"
          >
            Amigos
          </Link>
          <Link
            href={"/shop"}
            className="transition-all duration-300 hover:text-indigo-700 text-sm lg:text-base text-center"
          >
            Loja
          </Link>
          <Link
            href={"/market"}
            className="transition-all duration-300 hover:text-indigo-700 text-sm lg:text-base text-center"
          >
            Mercado
          </Link>
          <Link
            href={"/lineups"}
            className="transition-all duration-300 hover:text-indigo-700 text-sm lg:text-base text-center"
          >
            Elencos
          </Link>
          <Link
            href={"/my-club"}
            className="transition-all duration-300 hover:text-indigo-700 text-sm lg:text-base text-center"
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
              <GoSearch
                size={22.5}
                className="cursor-pointer gray-icon hidden sm:block"
              />
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
          <div className="z-20 fixed right-0 bg-[#fff] shadow-md h-[605px] sm:h-[650px] w-[350px] border border-[#f7f7f7] translate-y-2 transition-all rounded-lg sm:mt-[25px] mt-[25px] lg:left-[64%]">
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
                <h4 className="text-sm font-bold">Jogue no computador!</h4>
                <p className="text-sm text-[#717171]">
                  Jogue no computador e tenha uma melhor e mais completa
                  experiência ao jogar o nosso game.
                </p>
                <h2 className="mt-6 text-[#f1656a] font-bold text-sm">
                  Beleza
                </h2>
              </div>
            </div>
            <div className="p-10 sm:gap-8 gap-7 w-full flex flex-col">
              <Link
                href={"/home"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="home"
              >
                <IoHomeOutline size={27.5} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Início</h3>
              </Link>
              <Link
                href={"/friends"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="purchases"
              >
                <IoPeopleOutline size={27.5} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Amigos</h3>
              </Link>
              <Link
                href={"/shop"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="coupons"
              >
                <RiShoppingCartLine size={27.5} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Loja</h3>
              </Link>
              <Link
                href={"/market"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="profile"
              >
                <BsShop size={27.5} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Mercado</h3>
              </Link>
              <Link
                href={"/lineups"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="coupons"
              >
                <LuFileSpreadsheet size={27.5} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Elencos</h3>
              </Link>
              <Link
                href={"/my-club"}
                className="flex w-full justify-between items-center gap-8 cursor-pointer"
                id="coupons"
              >
                <IoSettingsOutline size={27.5} className="gray-icon" />
                <h3 className="text-[#717171] w-full text-lg">Meu Clube</h3>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="w-full text-white p-4 bg-[#333] h-[50px] gap-4 flex items-center justify-center cursor-pointer">
        <span className="text-white tracking-wider">
          Confira as novidades da nossa Loja
        </span>
        <MdNewReleases className="white-icon" size={20} />
      </div>
    </header>
  );
};

export default Navbar;
