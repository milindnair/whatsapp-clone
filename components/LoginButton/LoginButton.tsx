'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { handleSignIn } from './helper';
const LoginButton = () => {
    const router = useRouter();
    
  return (
    <button className='p-4 border-black-rounded rounded-md border-2 hover:bg-gray-100 text-black' onClick={() => handleSignIn(router)}>
        Sign in with Google
    </button>
  )
}

export default LoginButton;
