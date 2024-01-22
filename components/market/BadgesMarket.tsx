"use client"

import { infoUser } from "@/contexts/UserContext";
import { BUY_BADGE } from "@/graphql/mutations";
import { GET_SELLING_BADGES } from "@/graphql/queries";
import { GeneratedBadgeProps } from "@/types";
import { useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";
import { toast } from "react-toastify";

const BadgesMarket = () => {
  const { user } = infoUser();

  const {
    data: sellingBadges,
    loading: sellingBadgesLoading,
    refetch: refetchSellingBadges,
  } = useQuery(GET_SELLING_BADGES);

  const [buyBadge] = useMutation(BUY_BADGE);

  const handleBuyBadge = async (
    badgeId: string,
    badgePrice: number,
    status: boolean,
    ownerId: string
  ) => {
    if (user.currency < badgePrice) {
      toast.error("ERRO! Dinheiro insuficiente para comprar o emblema");
    } else {
      try {
        if (status === true) {
          await buyBadge({
            variables: {
              id: badgeId,
              ownerId: ownerId,
              newOwnerId: user.id,
              price: Number(badgePrice),
            },
          });
          await refetchSellingBadges().then(() => {
            toast.success("A carta foi comprada com sucesso!");
          });
        } else {
          toast.error(
            "ERRO! Não é possível comprar um emblema que não está mais a venda"
          );
        }
      } catch (error) {
        toast.error("ERRO! Não foi possível comprar o emblema");
      }
    }
  };

  return (
    sellingBadgesLoading === false && (
      <div className="flex flex-wrap w-full gap-10 mt-12 justify-start pb-20">
        {sellingBadges && sellingBadges.findSellingBadges ? (
          sellingBadges.findSellingBadges.map(
            (badge: GeneratedBadgeProps, index: number) => (
              <div
                className="w-[160px] h-[150px] rounded-xl flex flex-col items-center"
                key={index}
              >
                <Image
                  src={badge.badgeImage}
                  alt="Player Card"
                  width={75}
                  height={75}
                  className="max-w-[75px] max-h-[75px] w-auto h-auto object-fill"
                />
                <div className="w-full flex flex-col items-center mt-1">
                  <h1 className="font-bold">{badge.clubname}</h1>
                  <p className="text-sm text-[#717171]">Emblema de Clube</p>
                  <div className="flex gap-2 items-center mt-2">
                    <Image
                      src={"/assets/coins.png"}
                      alt="Price Icon"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm">{badge.price}</span>
                  </div>
                  <div
                    className="text-white bg-[#5BB5A2] w-full rounded-full py-1 mt-6 cursor-pointer text-center text-sm"
                    onClick={() =>
                      handleBuyBadge(
                        badge.id,
                        badge.price,
                        badge.selling,
                        badge.ownerId
                      )
                    }
                  >
                    Comprar Já
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          <span className="w-full text-lg text-[#717171] p-10 text-center mt-20">
            Não há nenhum item sendo negociando nesse momento!
          </span>
        )}
      </div>
    )
  );
};

export default BadgesMarket;
