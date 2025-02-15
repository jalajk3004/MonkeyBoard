"use client";

import { useState } from "react";
import { CanvasState, CanvasMode } from "../../../../../types/canvas";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

interface CanvasProps {
  boardId: string;
}

const MAX_LAYERS=100

const Canvas: React.FC<CanvasProps> = ({
  boardId,
}:CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None });


  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      {/* <Participants /> */}
      <Toolbar
        CanvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={false}
        canUndo={false}
        undo={() => {}}
        redo={() => {}}
      />
    </main>
  );
};

export default Canvas;
