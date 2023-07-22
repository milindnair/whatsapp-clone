import { formatDate } from "@/components/AppModal/helper";
import { auth, storage } from ".";
import { StorageReference, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { ImagesType } from "@/types";

export const uploadImage = async (file:File,paramsId:string) => {
    const formatteddate = formatDate(new Date());
    const fileName = `${paramsId}/${formatteddate}.jpg`;
    const storageRef = ref(storage,fileName);
    //upload to the storage bucket
    await uploadBytes(storageRef,file).then((snapshot) => {
        console.log("Uploaded a blob or file!",snapshot);
    })
    return fileName;
}

export const handleUpload = async (
    paramsId:string,
    setFile:React.Dispatch<React.SetStateAction<File | null>>,
    handleClose:() => void,
    file:File | null
) => {
    try{
        if(!file) return;
        await uploadImage(file,paramsId);
    }catch{
        console.log("error");
    } finally{
        setFile(null);
        handleClose();
    }
}

export const getStorageDownloadURL = async (storageRef:StorageReference):Promise<string> => {
    const url = await getDownloadURL(storageRef);
    return url;
};

export const fetchImages = async (
    listRef:StorageReference,
    setImages:React.Dispatch<React.SetStateAction<ImagesType[]>>
    ) => {
    //Find all the prefixes and items
    await listAll(listRef).then((res) => {
        const imagesArray : ImagesType[] = [];
        res.items.forEach(async (itemRef) => {
            //All the items under the listRef
           const imageURL = await  getStorageDownloadURL(itemRef);
           const imagesData = {
            photoURL: imageURL,
            createdAt: itemRef.name.split(".")[0],
            type: "storage",
            messageSenderId: auth?.currentUser?.uid,
          };
          imagesArray.push(imagesData);
          setImages(imagesArray);
        });
    });
}

