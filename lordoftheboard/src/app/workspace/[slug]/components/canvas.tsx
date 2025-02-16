"use client";

import React, { useCallback, useMemo, useState } from "react";
import { CanvasState, CanvasMode, Camera, Color, LayerType, Point, Side, XYWH } from "../../../../../types/canvas";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useCanRedo, useCanUndo, useHistory, useMutation, useOthersMapped, useStorage } from "@liveblocks/react";
import { CursorPresence } from "./cursors-presence";
import { connectionIdToColor, pointerEventToCanvasPoint, resizeBound } from "@/app/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";
import e from "cors";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tool";
import { start } from "repl";
import { findIntersectingLayersWithRectangle } from "@/lib/utils";

interface CanvasProps {
  boardId: string;
}

const MAX_LAYERS = 100

const Canvas: React.FC<CanvasProps> = ({
  boardId,
}: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds)
  const [canvasState, setCanvasState] = useState<CanvasState>({ mode: CanvasMode.None });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  })

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const insertLayer = useMutation(({
    storage, setMyPresence
  },
    layerType: LayerType.Ellispe | LayerType.Note | LayerType.Text | LayerType.Rectangle,
    position: Point,
  ) => {
    const liveLayers = storage.get("layers")
    if (liveLayers.size >= MAX_LAYERS) {
      return;
    }

    const liveLayersIds = storage.get("layerIds")
    const layerId = nanoid();
    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100,
      width: 100,
      fill: lastUsedColor
    });
    liveLayersIds.push(layerId);
    liveLayers.set(layerId, layer);
    setMyPresence({ selection: [layerId] }, { addToHistory: true })
    console.log(`Layer inserted at x: ${position.x}, y: ${position.y}`);
    setCanvasState({ mode: CanvasMode.None })
  }, [lastUsedColor])

  const translateSelectedLayer = useMutation((
    {storage,self},
    point:Point, 
  )=>{
    if(canvasState.mode!==CanvasMode.Translating  ){
      return;
    }
    const offset = {
      x: point.x - canvasState.current.x,
      y: point.y - canvasState.current.y
    }
    const liveLayers=storage.get("layers")
    for (const id of self.presence.selection){
      const layer = liveLayers.get(id)
      if(layer){
        layer.update({
          x:layer.get("x")+ offset.x,
          y:layer.get("y")+ offset.y
        })
      }
    }
    setCanvasState({mode:CanvasMode.Translating,current:point})
  },[canvasState])

  const unselectedLayer = useMutation((
    {self,setMyPresence}
  )=>{
    if(self.presence.selection.length>0){
      setMyPresence({selection:[]},{addToHistory:true})
    }
  },[])

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });

      const ids = layerIds ? findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current
      ) : [];

      setMyPresence({ selection: ids });
    },
    [layerIds]
  );

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  const resizedSelectedLayer = useMutation((
    { storage, self },
    point: Point,
  ) => {
    if (canvasState.mode !== CanvasMode.Resizing) {
      return
    }
    const bounds = resizeBound(
      canvasState.initialBounds,
      canvasState.corner,
      point
    )
    const liveLayers = storage.get("layers")
    const layer = liveLayers.get(self.presence.selection[0])

    if (layer) {
      layer.update(bounds);
    }
  }, [canvasState])

  const onResizingHandlePointerDown = useCallback((
    corner: Side,
    initialBounds: XYWH
  ) => {
    history.pause();
    setCanvasState({
      mode: CanvasMode.Resizing,
      initialBounds,
      corner
    })
  }, [history])

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY
    }))

  }, [])

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();

    const current = pointerEventToCanvasPoint(e, camera);

    if(canvasState.mode===CanvasMode.Pressing ){
      startMultiSelection(current,canvasState.origin)
    }else if(canvasState.mode===CanvasMode.SelectionNet){
      updateSelectionNet(current,canvasState.origin)

    } else if(canvasState.mode===CanvasMode.Translating){

      translateSelectedLayer(current)

    }else if (canvasState.mode === CanvasMode.Resizing) {
      resizedSelectedLayer(current)
    }

    setMyPresence({ cursor: current })
  }, [
    camera,
    canvasState,
    resizedSelectedLayer,
    translateSelectedLayer
  ])

  const onPointerLeave = useMutation(({
    setMyPresence
  }) => {
    setMyPresence({ cursor: null })
  }, [])

  const onPointerDown = useCallback((
    e:React.PointerEvent,
  )=>{
    const point = pointerEventToCanvasPoint(e,camera)
    if(canvasState.mode===CanvasMode.Inserting){
      return
    }
    setCanvasState({origin:point,mode:CanvasMode.Pressing})
  },[camera,canvasState.mode,setCanvasState])

  const onPointerUp = useMutation(({ }, e) => {
    const point = pointerEventToCanvasPoint(e, camera);

    if(canvasState.mode===CanvasMode.None || 
      canvasState.mode===CanvasMode.Pressing
    ){
      unselectedLayer();
      setCanvasState({
        mode:CanvasMode.None
      })
      
    }else if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point);
    } else {

      setCanvasState({ mode: CanvasMode.None });
    }
    history.resume();
  }, [camera, canvasState, history, insertLayer,unselectedLayer]);


  const selections = useOthersMapped((other) => other.presence.selection)

  const onLayerPointDown = useMutation((
    { self, setMyPresence },
    e: React.PointerEvent,
    layerIds: string,
  ) => {
    if (canvasState.mode == CanvasMode.Pencil ||
      canvasState.mode == CanvasMode.Inserting
    ) {
      return
    }

    history.pause();
    e.stopPropagation();
    const point = pointerEventToCanvasPoint(e, camera);
    

    if (!self.presence.selection.includes(layerIds)) {
      setMyPresence({ selection: [layerIds] }, { addToHistory: true })
    }
    setCanvasState({ mode: CanvasMode.Translating, current: point })
  }, [setCanvasState, camera, history, canvasState.mode])

  const layerIdColorSelection = useMemo(() => {
    const layerIdColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;
      for (const layerId of selection) {
        layerIdColorSelection[layerId] = connectionIdToColor(connectionId)
      }
    }
    return layerIdColorSelection;
  }, [selections])

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
      <SelectionTools
        camera={camera}
        setLastUsedColor={setLastUsedColor}
      />
      <svg
        className="h-[100vh] w-[95vw] "
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px,${camera.y}px)`
          }}>
          {layerIds?.map(layerId => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointDown={onLayerPointDown}
              selectionColor={layerIdColorSelection[layerId]}
            />
          ))}
          <SelectionBox
            onResizingHandlePointerDown={onResizingHandlePointerDown}
          />
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
        </g>

      </svg>
    </main>
  );
};

export default Canvas;
