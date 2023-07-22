import { auth, storage } from "@/lib/firebase";
import { fetchImages } from "@/lib/firebase/StorageHelper";
import { ImagesType } from "@/types";
import { ref } from "firebase/storage";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import { formatDate } from "../AppModal/helper";
import Image from "next/image";

const Images: React.FC = () => {
  const param = useParams();
  const currentUserId = auth?.currentUser?.uid;
  const [Images, setImages] = useState<ImagesType[]>([]);
  const listRef = ref(storage, param?.id);
  const handleData = useCallback(async () => {
    await fetchImages(listRef, setImages);
  }, [listRef]);
  useEffect(() => {
    handleData();
  }, []);

  return (
    <>
      {Images?.map((item, index) => (
        <div
          key={index}
          className={`flex items-center justify-end px-4 py-2 text-black ${
            item?.messageSenderId === currentUserId ? "ml-auto" : null
          }  ${
            item?.messageSenderId !== currentUserId
              ? "bg-white"
              : "bg-green-100"
          } rounded-lg shadow-md m-2 max-w-[50%] w-fit`}
        >
          <div>
            <Image
              src={item?.photoURL}
              alt="Picture of the author"
              width={500}
              height={500}
            />
            <p className="mt-1 text-xs text-gray-500">{item?.createdAt}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Images;
