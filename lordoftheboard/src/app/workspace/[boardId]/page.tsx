"use client";

import { useParams } from "next/navigation";

import { Room } from "@/app/Room";
import Canvas from "./components/canvas";

const Page = () => {
  const params = useParams(); // ✅ Correct way to access params
  const boardId = params.boardId as string; // Type assertion

  if (!boardId) {
    return <div>Error: Invalid board ID</div>;
  }

  return (
    <div>
      <Room roomId={boardId}>
        <Canvas boardId={boardId} />
      </Room>
    </div>
  );
};

export default Page;
