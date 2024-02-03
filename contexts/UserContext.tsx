"use client";

import Loader from "@/components/config/Loader";
import { CREATE_PLAYER } from "@/graphql/mutations";
import { GET_PLAYER } from "@/graphql/queries";
import { UserContextProps, UserProps } from "@/types";
import { checkIsPublicRoute } from "@/utils/check-route";
import { useMutation, useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserContextProps | any>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  const router = useRouter()

  const isPublic = checkIsPublicRoute(path);

  // Data Hooks Providers
  const [data, setData] = useState<any>([]);
  const [user, setUser] = useState<UserProps[] | any>([]);

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
      throw new Error("Não foi possível obter os dados da sessão do usuário")
    }
  };

  const fetchAndUpdateUser = async () => {
    await refetchPlayerData().then((content) => {
      setUser(content.data.getUser);
    });
  };

  const getUserInfo = async () => {
    fetchAndUpdateUser()    
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
        await fetchAndUpdateUser().then(() => {
          router.push('/club-setup')
        })
      } else {
        await fetchAndUpdateUser();
      }
    } catch (error) {
      throw new Error("Não foi possível obter as informações do clube do jogador")
    }
  };

  const getSession = async () => {
    await getSessionInfo()
  }

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    if (data && data.id !== undefined && !playerDataLoading) {
      getUserInfo();
    }
  }, [playerDataLoading, data]);

  useEffect(() => {
    if (user.newUser === true) {
      router.push('/club-setup')
    }
  }, [user])

  return isPublic || (data.id && user) ? (
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
