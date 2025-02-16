import { Camera,Color } from "../../types/canvas";

export function pointerEventToCanvasPoint(e: React.PointerEvent, camera: Camera) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    return {
        x: Math.round(e.clientX - rect.left) + camera.x,  
        y: Math.round(e.clientY - rect.top) + camera.y,
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