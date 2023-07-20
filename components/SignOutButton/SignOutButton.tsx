import React from 'react'
import { IconButton, } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

type Props = {
    handleToggle: () => void;
    open: boolean;
}

const SignOutButton:React.FC<Props> = ({handleToggle,open}) => {
    
    const router = useRouter();

    const signOutFromWhatsapp = () => {
      console.log("sign out from whatsapp");
      auth.signOut();
      router.push("/login");
    };
  
  
    return (
    <div className='flex flex-col relative'>
        <IconButton onClick={handleToggle}>
            <KeyboardArrowDownIcon/>
        </IconButton>
        {open ? (
        <button
          className="absolute top-10 bottom-2 right-3 h-full bg-white text-gray-700 p-2 rounded-md shadow-md w-20 hover:bg-gray-300 transition duration-200 ease-in-out z-11"
          onClick={signOutFromWhatsapp}
        >
          SignOut
        </button>
      ) : null}  
    </div>
  )
}

export default SignOutButton