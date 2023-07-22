import SidebarHeader from "@/components/Sidebar/SidebarHeader";
import Search from "@/components/Sidebar/Search";
import Archived from "@/components/Sidebar/Archived";
import { AllUsersType,AllUsers } from "@/types";
import Chat from "@/components/Sidebar/Chat";
import { Firestore } from "firebase/firestore";
import FirestoreChat from "@/components/Sidebar/FirestoreChat";
type Props = {
  data: AllUsers;
};

const ChatSidebar: React.FC<Props> = ({ data }) => {
  const { users } = data;
  return (
    <div className="w-full h-full ">
      <SidebarHeader />
      <Search />
      <Archived />
      <FirestoreChat />
      {!!users && users.map((user:AllUsersType) => (
       <Chat key={user.id} data={user} />
      ))}
      <p className="text-center text-sm p-2">
        Your personal messages are end-to-end-encrypted
      </p>
    </div>
  );
};

export default ChatSidebar;
