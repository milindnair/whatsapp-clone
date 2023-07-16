import { AllUsersType } from "@/types";
import React from "react";
import Image from "next/image";

type Props = {
  data: AllUsersType;
};

const Chat: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full flex items-center justify-between py-4 px-6 bg-white border-b border-gray-400 hover:bg-gray-200 opacity-80 overflow-hidden cursor-pointer">
      <div className="flex justify-start items-center gap-4">
        <Image
          src={data?.image}
          alt="user"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-start justify-start">
            <p>{data?.firstName}</p>
            <p className="text-gray-500 truncate w-1/2">
              This is the last message
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-sm text-right">10:19 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
