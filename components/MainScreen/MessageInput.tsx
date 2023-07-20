'use client';
import { IconButton } from "@mui/material";
import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import MoodIcon from "@mui/icons-material/Mood";
import { useState } from "react";


const MessageInput: React.FC = () => {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    console.log("send message");
  };
  return (
    <div className="sticky bottom-0 z-10 h-20 bg-gray-200 border-t border-gray-400 flex flex-1 items-center justify-between py-6 px-4">
      <IconButton>
        <MoodIcon />
      </IconButton>
      <IconButton>
        <AttachFileIcon />
      </IconButton>
      <form className="w-full" onSubmit={sendMessage}>
        <input
          className="w-full h-10 rounded-full border border-gray-400 px-4 text-black"
          type="text"
          placeholder="Type a message"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
      <IconButton>
        <KeyboardVoiceOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default MessageInput;
