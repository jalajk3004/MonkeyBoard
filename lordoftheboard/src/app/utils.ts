import { Camera,Color, Point, Side, XYWH } from "../../types/canvas";

export function pointerEventToCanvasPoint(e: React.PointerEvent, camera: Camera) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    return {
        x: Math.round(e.clientX - rect.left) - camera.x,  
        y: Math.round(e.clientY - rect.top) - camera.y,
    };
}


const COLORS = [
    "#DC2626",
    "#D97706",
    "#059669",
    "#7C3AED", 
    "#DB2777"
];


export function connectionIdToColor(connectionId: number):string{
    return COLORS[connectionId%COLORS.length]
}

export function colorToCSS(color:Color){
    return `#${color.r.toString(16).padStart(2,"0")}${color.g.toString(16).padStart(2,"0")}${color.b.toString(16).padStart(2,"0")}`
}

export function resizeBound(
    bounds:XYWH,
    corner: Side,
    point:Point
):XYWH{
    const result = {
        x:bounds.x,
        y:bounds.y,
        width:bounds.width,
        height:bounds.height
    }

    if((corner&& Side.Left)===Side.Left){
        result.x = Math.min(point.x,bounds.x+bounds.width);
        result.width = Math.abs(bounds.x+bounds.width-point.x);
    }
    if((corner && Side.Right)===Side.Right){
        result.x = Math.min(point.x,bounds.x);
        result.width = Math.abs(point.x-bounds.x);
    }
    if((corner && Side.Top)===Side.Top){
        result.y = Math.min(point.y,bounds.y+bounds.height);
        result.height = Math.abs(bounds.y+bounds.height-point.y);

    }
    if((corner && Side.Bottom)===Side.Bottom){
        result.y = Math.min(point.y,bounds.y);
        result.height = Math.abs(point.y-bounds.y);

    }
    return result
}