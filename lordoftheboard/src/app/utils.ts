import { Camera } from "../../types/canvas";

export function pointerEventToCanvasPoint(e: React.PointerEvent, camera: Camera) {

    return {

        x: Math.round(e.clientX) - camera.x,

        y: Math.round(e.clientY) - camera.y,
    }}