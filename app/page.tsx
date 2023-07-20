import Image from "next/image";
import Whatsappbg from "../public/whatsapp-bg.png";
import ChatSidebar from "../modules/ChatSidebar";
import { AllUsers } from "@/types";
import getUser from "@/lib/firebase/helper";

export default async function Home() {
  const fetchedUsers = await getUser();
  // console.log(fetchedUsers);
  return (
    <main className="flex h-screen overflow-hidden">
      <div className="bg-white w-1/3 overflow-y-auto text-black">
        <ChatSidebar data={fetchedUsers}/>
      </div>
      <div className="w-full overflow-y-auto flex items-center justify-center bg-blue-500">
        <Image
          src={Whatsappbg}
          alt="Whatsapp background"
          height={2000}
          width={2000}
        />
      </div>
    </main>
  );
}
