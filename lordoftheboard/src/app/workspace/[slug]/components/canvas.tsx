"use client";

import React, { useCallback, useState } from "react";
import { CanvasState, CanvasMode, Camera, Color, LayerType,Point } from "../../../../../types/canvas";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "@liveblocks/react";
import { CursorPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/app/utils";
import {nanoid} from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";

interface CanvasProps {
  boardId: string;
}

const MAX_LAYERS=100

const Canvas: React.FC<CanvasProps> = ({
  boardId,
}:CanvasProps) => {
  const layerIds=useStorage((root)=>root.layerIds)
  const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None });
  const [camera, setCamera] = useState<Camera>({x:0,y:0})
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r:0,
    g:0,
    b:0,
  })

  const history = useHistory();
  const canUndo=useCanUndo();
  const canRedo= useCanRedo();
  const insertLayer =useMutation(({
    storage, setMyPresence
  },
  layerType: LayerType.Ellispe | LayerType.Note | LayerType.Text | LayerType.Rectangle ,
  position:Point,
)=>{
  const liveLayers = storage.get("layers")
  if(liveLayers.size>=MAX_LAYERS){
    return;
  }

  const liveLayersIds = storage.get("layerIds")
  const layerId = nanoid();
  const layer =new LiveObject({
    type:layerType,
    x:position.x,
    y:position.y,
    height:100,
    width:100,
    fill:lastUsedColor
  });
  liveLayersIds.push(layerId);
  liveLayers.set(layerId,layer);
  setMyPresence({selection:[layerId]},{addToHistory:true})
  console.log(`Layer inserted at x: ${position.x}, y: ${position.y}`); 
  setCanvasState({mode:CanvasMode.None})
},[lastUsedColor])

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
 
  const onPointerUp = useMutation(({}, e) => {
    const point = pointerEventToCanvasPoint(e, camera);
    
    console.log("Clicked at:", e.clientX, e.clientY);
    console.log("Canvas Position:", point);
    console.log("Camera Offset:", camera);

    if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
    }else{

    setCanvasState({ mode: CanvasMode.None });}
    history.resume();
}, [camera, canvasState, history, insertLayer]);

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
      onPointerUp={onPointerUp}
     >
        <g
        style={{
          transform:`translate(${camera.x}px,${camera.y}px)`
        }}>
          {layerIds?.map(layerId => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointDown={() => {}}
              selectionColor="#000"
            />
          ))}
          <CursorPresence/>
        </g>

      </svg>
    </main>
  );
};

export default Canvas;
