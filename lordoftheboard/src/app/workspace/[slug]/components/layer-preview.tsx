"use client"

import { useStorage } from "@liveblocks/react";
import React from "react";
import { memo } from "react";
import { LayerType } from "../../../../../types/canvas";
import { Rectangle } from "./rectangle";
interface LayerPreviewProps{
    id:string;
    onLayerPointDown:(e:React.PointerEvent,layerId:string)=>void;
    selectionColor?:string;
}

export const LayerPreview=memo(({
    id,
    onLayerPointDown,
    selectionColor
}:LayerPreviewProps)=>{
    
    const layer =useStorage((root)=>root.layers.get(id));
    if(!layer){
        return null
    }
    switch(layer.type){
        case LayerType.Rectangle:
            return(
                <Rectangle 
                id={id} 
                layer={layer}
                onPointerDown={onLayerPointDown}
                selectionColor={selectionColor}
               />
            )
            default:
                console.warn("Unknown Layer Type");
                return null
    }
});

LayerPreview.displayName="LayerPreview"