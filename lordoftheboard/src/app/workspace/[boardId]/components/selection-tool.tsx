"use client";

import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { memo } from "react";
import { Camera, Color } from "../../../../../types/canvas";
import { useMutation, useSelf } from "@liveblocks/react";
import { useDeleteLayers } from "@/hooks/use-delete";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "./colorpicker";
import { Button } from "@/components/ui/button";


interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((self) => self.presence.selection);

    const deleteLayers = useDeleteLayers();
    const selectionBounds = useSelectionBounds();

    const handleMoveToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");

        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection && selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection]
    );

    const handleMoveToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");

        const indices: number[] = [];

        const arr = liveLayerIds.toImmutable();

        for (let i = 0; i < arr.length; i++) {
          if (selection && selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayerIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );

    const handleColorChange = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x - camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(
            calc(${x}px - 50%),
            calc(${y - 16}px - 100%)
          )`,
        }}
      >
        <ColorPicker onChange={handleColorChange} />
        <div className="flex flex-col gap-y-0.5">
          
            <Button variant="board" size="icon" onClick={handleMoveToFront}>
              <BringToFront />
            </Button>
      
      
            <Button variant="board" size="icon" onClick={handleMoveToBack}>
              <SendToBack />
            </Button>
          
        </div>
        <div className="flex items-center pl-2 ml-2 border-l">
          
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
      
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";