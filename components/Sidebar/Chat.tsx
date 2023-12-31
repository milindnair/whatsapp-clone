'use client';
import { AllUsersType } from "@/types";
import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { DocumentData } from "firebase/firestore";
import { handleContactInfo } from "../MainScreen/helper";
import { formatDate } from "../AppModal/helper";

type Props = {
  data?: AllUsersType;
  chatData?: any;

};

const Chat: React.FC<Props> = ({ data , chatData}) => {
  const [ChatInfo, setChatInfo] = React.useState<DocumentData | undefined>([])
  
  const filterContact = useCallback(
    async () => {
      const res = await handleContactInfo(chatData, chatData?.link);
      return res;
    },
    [chatData]);

  useEffect(() => {
    filterContact()
    .then((res:DocumentData | undefined) => setChatInfo(res))
    .catch((err) => console.log(err.message));
  }, [filterContact])
  
  
  return (
    <div className="w-full flex items-center justify-between py-4 px-6 bg-white border-b border-gray-400 hover:bg-gray-200 opacity-80 overflow-hidden cursor-pointer">
      <div className="flex justify-start items-center gap-4"  >
        <Image
          src={ChatInfo?.photo || data?.image}
          alt="user"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-start justify-start">
            <p>{ChatInfo?.name ?? data?.firstName}</p>
            <p className="text-gray-500 truncate w-1/2">
              {chatData?.messages?.message.slice(-1)[0]?.messageBody ?? "This is the last message"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm text-right">
              {formatDate(chatData?.messages?.message.slice(-1)[0]?.createdAt?.seconds) ?? "00:00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
