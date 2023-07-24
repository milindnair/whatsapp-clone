import { ContactsType } from "@/types";
import UploadModal from "./UploadModal";
import ContactList from "./ContactList";
import { IconModalType } from "./index.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";




export const handlerModalChilderen = (
    modalType:IconModalType,
    contacts:ContactsType[],
    handleClose: () => void) => {
        switch (modalType) {
            case 'upload':
                return <UploadModal handleClose={handleClose} />;
            case 'chat':
                return <ContactList contacts={contacts} handleClose={handleClose} />; 
            default:
                return ;
        }
};

export const chooseContact = (
    Contact:ContactsType,
    handleClose: () => void,
    router:AppRouterInstance) => {
        handleClose();
        router.push(`/chat/${Contact.id}`);
        
}

export function formatDate(date: number): string;
export function formatDate(date: Date): string;
export function formatDate(arg1: unknown): string {
  // doing the type at runtime instead of compile time
  if (typeof arg1 === "number") {
    // convert unix timestamp to date
    const d = new Date(arg1 * 1000);
    const fullDate = d.toLocaleString();
    const dateOnly = fullDate.split(",")[0];
    const timeOnly = fullDate.split(",")[1];   
    console.log(`${dateOnly} at ${timeOnly}`);
    return `${dateOnly} at ${timeOnly}`;
    // return `${timeOnly}`;
  } else {
    const todayDate = new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "numeric",
      day:"numeric" ,
      weekday: undefined,
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      second: undefined,
    });
    console.log(todayDate);
    return `${todayDate}`;
  }
} 


