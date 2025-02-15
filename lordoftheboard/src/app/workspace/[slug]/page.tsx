    "use client";

    import dynamic from "next/dynamic";
    import { useParams } from "next/navigation";
    import { FC } from "react";
    import Canvas from "./components/canvas";
    import { Room } from "@/app/Room";



    interface BoardIdPage {
      params:{
        boardId:string
      }
    }

    const Page=({
      params,
    }:BoardIdPage)=>{ 
      return (
        <div >
          <Room roomId={params.boardId}>
            <Canvas boardId={params.boardId} />
          </Room>
        </div>
      );
    };

    export default Page;
