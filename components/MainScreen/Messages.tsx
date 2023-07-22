import { DocumentData } from "firebase/firestore";
import React from "react";
import { formatDate } from "../AppModal/helper";
import { auth } from "@/lib/firebase";

type Props = {
  data: DocumentData[];
  paramId: string;
};

const Messages: React.FC<Props> = ({ data, paramId }) => {
  const currentUserId = auth?.currentUser?.uid;
console.log(data);
console.log(paramId);
  // console.log(message)
return (
    <div>
      {data?.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-end px-4 py-2 text-black ${
            item?.messageSenderId === currentUserId ? "ml-auto" : null
          }  ${
            item?.messageSenderId !== currentUserId ? "bg-white" : "bg-green-100"
          } rounded-lg shadow-md m-2 max-w-[50%] w-fit`}
        >
          <p>{item?.messageBody}</p>
          <p className="mt-1 ml-2 text-xs text-gray-500">
            {formatDate(item?.createdAt?.seconds)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
