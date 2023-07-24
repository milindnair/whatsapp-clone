'use client';
import { IconButton } from "@mui/material";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import MoodIcon from "@mui/icons-material/Mood";
import { useState } from "react";
import { createNewChat } from "@/lib/firebase/messageController";
import { useParams } from "next/navigation";
import AppModal from "../AppModal";
import EmojiPicker from 'emoji-picker-react';

const MessageInput: React.FC = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Step 2: State for EmojiPicker

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message === "") return;
    else {
      await createNewChat(message, params?.id);
      setMessage("");
    }
  };

  // Step 2: Function to toggle EmojiPicker visibility
  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

  return (
    <>
    {showEmojiPicker && ( // Step 3: Conditionally render EmojiPicker
        <div className="bg-white">
        <EmojiPicker width={'100%'} onEmojiClick={(emoji)=>{setMessage(message+`${emoji.emoji}`)}} />
        </div>
      )}
    <div className="sticky bottom-0 z-10 h-20 bg-gray-200 border-t border-gray-400 flex flex-1 items-center justify-between py-6 px-4">
      <IconButton onClick={toggleEmojiPicker}> 
        <MoodIcon />
      </IconButton>
      <IconButton>
        <AppModal
          icon={<AttachFileIcon />}
          title="Upload Image"
          modalType="upload"
        />
      </IconButton>
      <form className="w-full" onSubmit={sendMessage}>
        <input
          className="w-full h-10 rounded-full border border-gray-400 px-4 text-black"
          type="text"
          placeholder="Type a message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </form>
      <IconButton>
        <KeyboardVoiceOutlinedIcon />
      </IconButton>
    </div>
    </>
  );
};

export default MessageInput;
