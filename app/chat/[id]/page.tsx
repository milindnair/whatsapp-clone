import Image from "next/image";
import Whatsappbg from "../public/whatsapp-bg.png";

import { AllUsers } from "@/types";
import getUser from "@/lib/firebase/helper";
import ChatSidebar from "@/modules/ChatSidebar";
import MainScreen from "@/modules/MainScreen";


export default async function () {
  const fetchedUsers = await getUser();
  return (
    <main className="flex h-screen overflow-hidden">
      <div className="bg-white w-1/3 overflow-y-auto text-black image">
        <ChatSidebar data={fetchedUsers}/>
      </div>
      <div className="w-full overflow-y-auto chat">
        <MainScreen/>
      </div>
    </main>
  );
}
