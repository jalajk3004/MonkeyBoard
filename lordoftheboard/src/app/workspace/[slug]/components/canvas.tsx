"use client";

import React, { useCallback, useState } from "react";
import { CanvasState, CanvasMode, Camera } from "../../../../../types/canvas";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useCanRedo, useCanUndo, useHistory, useMutation } from "@liveblocks/react";
import { CursorPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/app/utils";

interface CanvasProps {
  boardId: string;
}

const MAX_LAYERS=100

const Canvas: React.FC<CanvasProps> = ({
  boardId,
}:CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None });
  const [camera, setCamera] = useState<Camera>({x:0,y:0})
  const history = useHistory();
  const canUndo=useCanUndo();
  const canRedo= useCanRedo();

  const onWheel= useCallback((e:React.WheelEvent)=>{
    setCamera((camera)=>({
      x:camera.x-e.deltaX,
      y:camera.y-e.deltaY
    }))
    
  },[])

  const onPointMove = useMutation(({setMyPresence},e:React.PointerEvent)=>{
    e.preventDefault();
    const current=pointerEventToCanvasPoint(e,camera);
    setMyPresence({cursor:current})
  },[])

  const onPointerLeave = useMutation(({
    setMyPresence
  })=>{
    setMyPresence({cursor:null})
  },[])
 

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none overflow-hidden ">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        CanvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
      className="h-[100vh] w-[95vw] "
      onWheel={onWheel}
      onPointerMove={onPointMove}
      onPointerLeave={onPointerLeave}
     >
        <g>
          <CursorPresence/>
        </g>

      </svg>
    </main>
  );
};

export default Canvas;
