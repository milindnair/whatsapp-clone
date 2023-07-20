'use client';
import React from 'react'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ClickAwayListener, IconButton, } from '@mui/material';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import SignOutButton from '../SignOutButton/SignOutButton';

const MainScreenHeader:React.FC = () => {

    const [open,setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen(!open);
        console.log(open);
    };

    const handleClose = () => {
        setOpen(false);
    };

  return (
    <div className="sticky top-0 p-2 h-20 bg-gray-200 border-b border-gray-400 z-10 flex items-center justify-between">
        <div>
            <AccountCircleIcon/>
        </div>
        <ClickAwayListener onClickAway={handleClose}>
        <div className="flex gap-6 items-center">
          <IconButton>
            <VideocamOutlinedIcon />
          </IconButton>
          |
          <IconButton>
            <LocalPhoneOutlinedIcon />
          </IconButton>
          |
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          |
          <IconButton>
            < DeleteOutlinedIcon />
          </IconButton>
          |
          <SignOutButton open={open} handleToggle={handleToggle} />
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default MainScreenHeader;