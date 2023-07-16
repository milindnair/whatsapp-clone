import Image from "next/image";
import Whatsappbg from "../public/whatsapp-bg.png";
import ChatSidebar from "../modules/ChatSidebar";
import { AllUsers } from "@/types";

const getUser = async () => {
  const staticData = await fetch("https://dummyjson.com/users", {
    cache: "force-cache",
  });
  const dynamicData = await fetch("https://dummyjson.com/users", {
    cache: "no-cache",
  });
  const revalidatedData = await fetch("https://dummyjson.com/users", {
    next: { revalidate: 10 },
  });
  const userData: AllUsers = await dynamicData.json();
  return userData;
};

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
