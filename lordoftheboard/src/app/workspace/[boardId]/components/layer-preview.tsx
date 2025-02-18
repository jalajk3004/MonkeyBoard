"use client"

import { useStorage } from "@liveblocks/react";
import React from "react";
import { memo } from "react";
import { LayerType } from "../../../../../types/canvas";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCSS } from "@/app/utils";
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
        case LayerType.Path:
            return(
                <Path
               
                key = {id}
                points={layer.points}
                onPointerDown={(e)=>onLayerPointDown(e,id)}
                x={layer.x}
                y={layer.y}
                fill={layer.fill ? colorToCSS(layer.fill): "#000"}
                stroke={selectionColor}
                />
            )
        case LayerType.Note:
            return(
                <Note
                id={id} 
                layer={layer}
                onPointerDown={onLayerPointDown}
                selectionColor={selectionColor}
                />
            )
        case LayerType.Text:
            return(
                <Text
                id={id} 
                layer={layer}
                onPointerDown={onLayerPointDown}
                selectionColor={selectionColor}
                />
        )
        case LayerType.Ellispe:
            return (
                <Ellipse
                id={id} 
                layer={layer}
                onPointerDown={onLayerPointDown}
                selectionColor={selectionColor}
                />
            )
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