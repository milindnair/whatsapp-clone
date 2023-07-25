'use client';
import { auth } from '@/lib/firebase'
import { chatsCollection } from '@/lib/firebase/messageController'
import { getSnapshotDoc } from '@/lib/firebase/userController'
import { ChatMessageType } from '@/types'
import { DocumentData, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import Search from './Search';
import Archived from './Archived';

const FirestoreChat: React.FC = () => {
  const [chats, setChats] = useState<DocumentData>([]);
  const [searchName, setSearchName] = useState("");

  const handleSearchNameChange = (name: string) => {
    setSearchName(name);
  };

  useEffect(() => {
    onSnapshot(chatsCollection, (snapshot) => {
      const snapshotRef = snapshot.docs.map((doc) => getSnapshotDoc(doc));
      const messageList = snapshotRef;
      setChats(messageList);
    });
  }, []);

  return (
    <div>
      <Search onChange={handleSearchNameChange} />
      <Archived />
      {chats
        .filter((chat: DocumentData) => {
          // Check if the chatData contains the searchName in any part of the chat
          if (!searchName) return true; // If searchName is empty, show all chats
  
          const lowerCaseSearchName = searchName.toLowerCase();
          const chatDataStr = JSON.stringify(chat).toLowerCase();
  
          return chatDataStr.includes(lowerCaseSearchName);
        })
        .map((chat: DocumentData, index: number) => (
          <Link href={`/chat/${chat?.link}`} key={index}>
            <Chat chatData={chat} />
          </Link>
        ))}
    </div>
  );
  
};

export default FirestoreChat;
