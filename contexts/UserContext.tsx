"use client";

import Loader from "@/components/config/Loader";
import { CREATE_PLAYER } from "@/graphql/mutations";
import { GET_PLAYER } from "@/graphql/queries";
import { UserContextProps, UserProps } from "@/types";
import { checkIsPublicRoute } from "@/utils/check-route";
import { useMutation, useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserContextProps | any>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const path = usePathname();

  const isPublic = checkIsPublicRoute(path);

  // Data Hooks Providers
  const [data, setData] = useState<any>([]);
  const [user, setUser] = useState<UserProps[]>([]);

  // GraphQL Queries
  const [createUser] = useMutation(CREATE_PLAYER);

  const {
    data: playerData,
    loading: playerDataLoading,
    refetch: refetchPlayerData,
  } = useQuery(GET_PLAYER, {
    variables: {
      uuid: data.id,
    },
    skip: !data.id,
  });

  // Get User Data Function
  const getSessionInfo = async () => {
    try {  
      const requisition = await fetch("/api/getUserInfo");
      const response = await requisition.json();
      setData(response);
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  const getUserInfo = async () => {
    try {
      if (playerData === undefined && data.id && playerDataLoading === false) {
        await createUser({
          variables: {
            uuid: data.id as string,
            name: `${data.firstName} ${data.lastName}`,
            firstname: data.firstName as string,
            lastname: data.lastName as string,
            clubname: `Time do ${data.username}`,
            email: data.emailAddresses[0].emailAddress as string,
            password: "",
          },
        });
        await refetchPlayerData();
      } else {
        await refetchPlayerData().then(content => {
          setUser(content.data.getUser);
        })
      }
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  };

  useEffect(() => {
    getSessionInfo();
  }, []);

  useEffect(() => {
    if (data.id !== undefined && !playerDataLoading) {
      getUserInfo();
    }
  }, [playerDataLoading, data.id]);

  return isPublic || data.id && user ? (
    <UserContext.Provider
      value={{ data, setData, user, setUser, getSessionInfo, getUserInfo }}
    >
      {children}
    </UserContext.Provider>
  ) : (
    <Loader />
  );
};

export const infoUser = () => useContext(UserContext);
