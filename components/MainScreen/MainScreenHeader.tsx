'use client';
import React from 'react'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ClickAwayListener, IconButton, } from '@mui/material';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SignOutButton from '../SignOutButton/SignOutButton';
import { useEffect } from 'react';
import { deleteChatFromFirestore, getSingleChatFromFirestore } from '@/lib/firebase/messageController';
import { useParams, useRouter } from 'next/navigation';
import { handleContactInfo } from './helper';
import { DocumentData } from 'firebase/firestore';
import UserAvatar from '../UserAvatar/UserAvatar';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';


const MainScreenHeader:React.FC = () => {
  const router = useRouter();
    const params = useParams();
    const [open,setOpen] = React.useState(false);
    const [contactInfo,setContactInfo] = React.useState<null | DocumentData | undefined>(null);
    const handleToggle = () => {
        setOpen(!open);
        console.log(open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
      // get the chat from firestore and see if it exists
      getSingleChatFromFirestore(params?.id)
        .then(async (chat) => {
          //  check the user  and see if they are the sender or receiver
          console.log(chat);
          const filterContact = await handleContactInfo(chat, params?.id);
          console.log(filterContact);
          setContactInfo(filterContact);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, [params?.id]);

    console.log(contactInfo);


  return (
    <div className="sticky top-0 p-2 h-20 bg-[#075E54] border-b border-gray-400 z-10 flex items-center justify-between">
      <div className='flex gap-3'>
      <IconButton onClick={() => router.push("/")}>
          <ArrowBackOutlinedIcon  className='back' style={{color:"white"}} />
        </IconButton>
        {contactInfo ? (
          <div className="flex items-center gap-2 overflow-hidden text-[#fff] ">
            <UserAvatar image={contactInfo?.photo} alt={contactInfo?.name} />
            <strong className='text-lg'>{contactInfo?.name}</strong>
          </div> 
        ) : (
          <AccountCircleIcon />
        )}
        
      </div>
      <ClickAwayListener onClickAway={handleClose}>
        <div className="flex gap-6 items-center text-white">
          <IconButton>
            <VideocamOutlinedIcon style={{color:"white"}} />
          </IconButton>
          <IconButton>
            <LocalPhoneOutlinedIcon style={{color:"white"}}/>
          </IconButton>
          |
          <IconButton>
            <SearchOutlinedIcon style={{color:"white"}}/>
          </IconButton>
          <IconButton
            onClick={() => deleteChatFromFirestore(params?.id, router)}
          >
            <DeleteOutlineOutlinedIcon style={{color:"white"}}/>
          </IconButton>
          <SignOutButton open={open} handleToggle={handleToggle} />
        </div>
      </ClickAwayListener>
    </div>
  );
};


export default MainScreenHeader;