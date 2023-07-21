import Image from "next/image";
import React from "react";

interface UserAvatarProps {
  image: string;
  alt: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ image, alt }) => {
  return (
    <div style={{height:"50px",width:"50px",overflow:"hidden",borderRadius:"50%"}}>
      <Image
        src={image}
        alt={alt}
        width={50}
        height={50}
        className="bg-[black] object-cover cursor-pointer hover:opacity-80"
      />
    </div>
  );
};

export default UserAvatar;