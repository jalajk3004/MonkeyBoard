import { colorToCSS } from "@/app/utils";
import { RectangleLayer } from "../../../../../types/canvas";

interface RectangleProps {
    id: string;
    layer: RectangleLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};
export const Rectangle = ({
    id,
    layer,
    onPointerDown,
    selectionColor
}:RectangleProps)=> {
    console.log({
        id, layer
    })
    const { width,height, fill} = layer;
    return(
        <rect 
        className="drop-shadow-md"
        onPointerDown={(e)=>onPointerDown(e,id)}
        
        x={layer.x}
        y={layer.y}
        width={width}
        height={height}
        strokeWidth={1}
        fill={fill ? colorToCSS(fill):"#000"}
        stroke={selectionColor || "transparent"}>


        </rect>
    )
}