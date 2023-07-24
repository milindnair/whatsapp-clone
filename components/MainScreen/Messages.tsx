import { DocumentData } from "firebase/firestore";
import React, { useCallback, useEffect } from "react";
import { formatDate } from "../AppModal/helper";
import { auth, storage } from "@/lib/firebase";
import { ImagesType } from "@/types";
import { fetchImages } from "@/lib/firebase/StorageHelper";
import { ref } from "firebase/storage";
import Image from "next/image";

// Add a property to identify the type of ImagesType
interface ImageDocument extends ImagesType {
  isImage: true;
  createdDate: string;
}

type Props = {
  data: DocumentData[];
  paramId: string;
};

const Messages: React.FC<Props> = ({ data, paramId }) => {
  const currentUserId = auth?.currentUser?.uid;
  const [Images, setImages] = React.useState<ImagesType[]>([]);
  const listRef = ref(storage, paramId);
  const handleData = useCallback(async () => {
    await fetchImages(listRef, setImages);
  }, [listRef]);
  useEffect(() => {
    handleData();
  }, []);

  console.log(data);
  console.log(Images);

  const formatTime = (timestampSeconds: any): string => {
    const date = new Date(timestampSeconds * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const updatedData: DocumentData[] = data.map((item) => ({
    ...item,
    createdAt: formatDate(item?.createdAt?.seconds).split("at")[1],
    createdDate: formatDate(item?.createdAt?.seconds).split("at")[0],
  }));

  const updatedImages: ImagesType[] = Images.map((item) => ({
    ...item,
    createdAt: item?.createdAt.split(",")[1].replace(".jpg", ""),
    createdDate: formatDate(item?.createdAt?.seconds).split(",")[0],
  }));

 // Sort updatedData in ascending order based on createdAt
updatedData.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

// Sort updatedImages in ascending order based on createdAt
updatedImages.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

// Merge updatedData and updatedImages into combinedData while maintaining the sorted order
const combinedData: (DocumentData | ImageDocument)[] = [
  ...updatedImages.map((image) => ({ ...image, isImage: true })),
  ...updatedData,
];

// Sort combinedData in ascending order based on createdDate and createdAt
combinedData.sort((a, b) => {
  const dateA = a.createdDate;
  const dateB = b.createdDate;

  // Compare the dates first
  if (dateA < dateB) {
    return -1;
  } else if (dateA > dateB) {
    return 1;
  } else {
    // If the dates are the same, compare the times
    const timeA = a.createdAt;
    const timeB = b.createdAt;

    return timeA.localeCompare(timeB);
  }
});

console.log(combinedData);

  return (
    <div>
      {combinedData?.map((item, index) => {
        if ("isImage" in item) {
          // Render ImagesType
          return (
            <div
              key={index}
              className={`flex items-center justify-end px-4 py-2 text-black ${
                item?.messageSenderId === currentUserId ? "ml-auto" : null
              }  ${
                item?.messageSenderId !== currentUserId ? "bg-white" : "bg-green-100"
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
          );
        } else {
          // Render DocumentData
          return (
            <div
              key={index}
              className={`flex items-center justify-end px-4 py-2 text-black ${
                item?.messageSenderId === currentUserId ? "ml-auto" : null
              }  ${
                item?.messageSenderId !== currentUserId ? "bg-white" : "bg-green-100"
              } rounded-lg shadow-md m-2 max-w-[50%] w-fit`}
            >
              <p>{item?.messageBody}</p>
              <p className="mt-1 ml-2 text-xs text-gray-500">{item?.createdAt}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Messages;
