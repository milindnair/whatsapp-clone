import { auth } from "@/lib/firebase";
import { getSingleUserFromFirestore } from "@/lib/firebase/userController";
import { DocumentData } from "firebase/firestore";

export const handleContactInfo = async (
    chat: DocumentData | undefined,
    chatId: string
  ) => {
    // check if the current user is the same as the chatId and if thats the case then get the other users details
    if (auth?.currentUser?.uid === chatId) {
      console.log(auth?.currentUser);
        console.log("The current user is the same as the chatId");
      const otherUser = chat?.messages?.message[0]?.messageSenderId;
      const getOtherParticipant = await getSingleUserFromFirestore(otherUser);
      return getOtherParticipant;
    } else {
      console.log(auth?.currentUser);
        console.log("The current user is not the same as the chatId");
      const otherUser = chat?.messages?.message[0]?.messageRecipientId;
      const getOtherParticipant = await getSingleUserFromFirestore(otherUser);
      return getOtherParticipant;
    }
};