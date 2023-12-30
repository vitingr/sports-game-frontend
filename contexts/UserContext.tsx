"use client";

import Loader from "@/components/config/Loader";
import { UserContextProps } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserContextProps | any>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const [data, setData] = useState<any>([])

  const getUserInfo = async () => {
    const requisition = await fetch("/api/getUserInfo")
    const response = await requisition.json()
    setData(response)
  }

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  return data.id ? (
    <UserContext.Provider value={{data, setData, getUserInfo}}>
      {children}
    </UserContext.Provider>
  ) : (
    <Loader />
  )
};

export const infoUser = () => useContext(UserContext)