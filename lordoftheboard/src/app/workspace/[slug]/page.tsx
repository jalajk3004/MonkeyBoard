"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { FC } from "react";
import Canvas from "./components/canvas";



const Page: FC = () => {
  const params = useParams(); 
  return (
    <div >
      <Canvas />
    </div>
  );
};

export default Page;
