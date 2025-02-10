"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { FC } from "react";

const Canvas = dynamic(() => import("../../components/whiteboard/page"), {
  ssr: false,
});

const Page: FC = () => {
  const params = useParams(); 
  return (
    <div>
      <h1>Room: {params.slug}</h1>
      <Canvas roomId={params.slug as string} />
    </div>
  );
};

export default Page;
