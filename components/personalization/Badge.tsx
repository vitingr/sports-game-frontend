import { GeneratedBadgeProps } from "@/types";
import React from "react";

const Badge = ({
  badgeData,
  setShowBadgeActions,
  setCurrentBadge,
}: {
  badgeData: GeneratedBadgeProps;
  setShowBadgeActions: any;
  setCurrentBadge: any;
}) => {
  return badgeData.selling === false ? (
    <div
      className="bg-neutral-200 border border-neutral-100 rounded-xl p-8 flex items-center justify-center w-[100px] h-[100px] cursor-pointer"
      onClick={() => {
        setShowBadgeActions(true);
        setCurrentBadge(badgeData);  
      }}
    >
      <img
        src={badgeData.badgeImage}
        alt="Badge Image"
        className="h-auto w-auto object-contain"
      />
    </div>
  ) : (
    <></>
  );
};

export default Badge;
