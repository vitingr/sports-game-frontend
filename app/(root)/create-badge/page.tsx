"use client";

import ToastMessage from "@/components/config/ToastMessage";
import UploadImage from "@/components/config/Upload";
import { CREATE_BADGE } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [createBadge] = useMutation(CREATE_BADGE);
  const [badgeInfo, setBadgeInfo] = useState<any>({
    badgeImage: "",
    clubname: "",
    maxValue: 0,
    minValue: 0,
    quickSellValue: 0,
  });

  const [showSendImage, setShowSendImage] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");

  const handleCreateBadge = async () => {
    let photoDatabase;

    if (image !== "") {
      const imageUpload = await fetch("/api/uploadBadge", {
        method: "POST",
        body: JSON.stringify({
          path: image,
        }),
      });

      if (imageUpload.ok) {
        photoDatabase = await imageUpload.json();
        try {
          await createBadge({
            variables: {
              badgeImage: photoDatabase.url as string,
              clubname: badgeInfo.clubname,
              maxValue: Number(1000),
              minValue: Number(350),
              quickSellValue: Number(350),
            },
          });
          toast.success("O emblema foi criado com sucesso!");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div>
      <ToastMessage />
      <form
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();
          await handleCreateBadge();
        }}
        className="flex flex-col items-center gap-10"
      >
        <input
          type="text"
          name="clubname"
          id="clubname"
          placeholder="Nome"
          onChange={(e) =>
            setBadgeInfo({ ...badgeInfo, clubname: e.target.value })
          }
          autoComplete="off"
          className="outline-none px-2 py-1 border border-neutral-200"
        />

        {/* <div>
          <p>maxValue</p>
          <input
            type="number"
            name="maxValue"
            id="maxValue"
            className="outline-none px-2 py-1 border border-neutral-200"
            onChange={(e) =>
              setBadgeInfo({ ...badgeInfo, maxValue: e.target.value })
            }
          />
        </div>

        <div>
          <p>MinValue</p>
          <input
            type="number"
            name="MaxValue"
            id="MaxValue"
            className="outline-none px-2 py-1 border border-neutral-200"
            onChange={(e) =>
              setBadgeInfo({ ...badgeInfo, minValue: e.target.value })
            }
          />
        </div>

        <div>
          <p>QuickSellValue</p>
          <input
            type="number"
            name="QuickSellValue"
            id="QuickSellValue"
            className="outline-none px-2 py-1 border border-neutral-200"
            onChange={(e) =>
              setBadgeInfo({ ...badgeInfo, quickSellValue: e.target.value })
            }
          />
        </div> */}

        <div
          className="w-full text-white cursor-pointer bg-indigo-600"
          onClick={() => setShowSendImage(!showSendImage)}
        >
          Enviar foto
        </div>
        {showSendImage && (
          <UploadImage
            currentFoto={image}
            setState={setImage}
            show={setShowSendImage}
          />
        )}

        <img src={image} alt="teste" className="max-w-[200px] max-h-[200px]" />

        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-full w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default page;
