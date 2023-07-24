import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import LoaderGif from "@/app/preloader.gif";
import "./loader.css";

const Loader: React.FC = () => {
  return (
    <div className="grid place-items-center bg-white h-screen">
      <div className="image-container">
        <Image src={LoaderGif} alt="my gif" height={200} width={200} />
        <div className="image-shadow"></div>
      </div>
    </div>
  );
};

export default React.memo(Loader);
