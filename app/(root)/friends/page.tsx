"use client";

import MyFriends from "@/components/friends/MyFriends";
import PendingFriends from "@/components/friends/PendingFriends";
import SearchFriends from "@/components/friends/SearchFriends";
import { GET_ALL_PLAYERS } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";

const page = () => {
  const [myFriends, setMyFriends] = useState<boolean>(true);
  const [searchFriends, setSearchFriends] = useState<boolean>(false);
  const [pendingFriends, setPendingFriends] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-6 w-full max-w-[1025px] mt-[2em] flex-col">
      <div className="flex gap-6 items-center w-full justify-between">
        <div
          className="w-full border border-neutral-200 rounded-full px-4 py-2 flex justify-center bg-white cursor-pointer transition-all duration-300 hover:bg-indigo-600 hover:text-white text-center sm:text-base text-sm"
          onClick={() => {
            setMyFriends(true);
            setSearchFriends(false);
            setPendingFriends(false);
          }}
        >
          Meus Amigos
        </div>
        <div
          className="w-full border border-neutral-200 rounded-full px-4 py-2 flex justify-center bg-white cursor-pointer transition-all duration-300 hover:bg-indigo-600 hover:text-white text-center sm:text-base text-sm"
          onClick={() => {
            setMyFriends(false);
            setSearchFriends(true);
            setPendingFriends(false);
          }}
        >
          Encontrar Amigos
        </div>
        <div
          className="w-full border border-neutral-200 rounded-full px-4 py-2 flex justify-center bg-white cursor-pointer transition-all duration-300 hover:bg-indigo-600 hover:text-white text-center sm:text-base text-sm"
          onClick={() => {
            setMyFriends(false);
            setSearchFriends(false);
            setPendingFriends(true);
          }}
        >
          Convites Pendentes
        </div>
      </div>
      <div className=" rounded-lg border border-neutral-100 shadow-md shadow-neutral-200 bg-white p-10 w-full">
        {myFriends && <MyFriends />}
        {searchFriends && <SearchFriends />}
        {pendingFriends && <PendingFriends />}
      </div>
    </div>
  );
};

export default page;
