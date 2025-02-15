export function pointerEventToCanvasPoint(e: React.PointerEvent, camera: Camera) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

    return {
        x: Math.round(e.clientX - rect.left) + camera.x,  // ✅ Adjusts with camera
        y: Math.round(e.clientY - rect.top) + camera.y,
    };
}
