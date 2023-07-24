'use client';
import Image from "next/image";
import Whatsappbg from "../public/whatsapp-bg.png";
import ChatSidebar from "../modules/ChatSidebar";
import { AllUsers } from "@/types";
import getUser from "@/lib/firebase/helper";
import './homepage.css';
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();
  const fetchedUsers = await getUser();
  const isLoggedIn = auth?.currentUser;

  // console.log(fetchedUsers);
  if(!isLoggedIn) {
    router.push("/login");
  }
  console.log(isLoggedIn);

  return (
    <main className="flex h-screen overflow-hidden">
      <div className="bg-white w-1/3 overflow-y-auto text-black chat">
        <ChatSidebar data={fetchedUsers}/>
      </div>
      <div className="w-full overflow-y-auto flex items-center justify-center bg-blue-500 image">
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
