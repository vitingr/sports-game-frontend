"use client";

import React, { useState } from "react";
import Popup from "../config/Popup";
import ToastMessage from "../config/ToastMessage";
import { infoUser } from "@/contexts/UserContext";
import { useQuery } from "@apollo/client";
import { GET_USER_BADGES } from "@/graphql/queries";
import { GeneratedBadgeProps } from "@/types";
import BadgeActions from "./BadgeActions";
import Badge from "./Badge";

const ChangeClubBadge = ({ state }: { state: any }) => {
  const { user } = infoUser();

  const {
    data: getUserBadges,
    loading: userBadgesLoading,
    refetch: refetchUserBadges,
  } = useQuery(GET_USER_BADGES, {
    variables: {
      userId: user.id,
    },
    skip: !user.id,
  });

  const [showBadgeActions, setShowBadgeActions] = useState<boolean>(false);
  const [currentBadge, setCurrentBadge] = useState<GeneratedBadgeProps>();

  return (
    getUserBadges &&
    getUserBadges.findUserBadges && (
      <Popup
        title="Editar Emblema do Clube"
        description="Clique em um emblema que você quiser para o seu clube! mas você só pode utilizar emblemas que você encontrou ou comprou, lembre-se, o emblema também faz parte da identidade de um clube!"
        state={state}
      >
        <ToastMessage />
        <div className="w-full h-[650px] overflow-y-scroll flex flex-wrap gap-10">
          {getUserBadges.findUserBadges.map(
            (badge: GeneratedBadgeProps, index: number) => (
              <Badge
                key={index}
                badgeData={badge}
                setShowBadgeActions={setShowBadgeActions}
                setCurrentBadge={setCurrentBadge}
              />
            )
          )}

          {showBadgeActions && (
            <BadgeActions
              state={setShowBadgeActions}
              currentBadge={currentBadge}
              refetch={refetchUserBadges}
            />
          )}
        </div>
      </Popup>
    )
  );
};

export default ChangeClubBadge;
