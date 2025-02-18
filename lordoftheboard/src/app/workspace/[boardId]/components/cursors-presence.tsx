"use client"

import { shallow, useOthersConnectionIds, useOthersMapped } from "@liveblocks/react"
import { memo } from "react"
import { Cursor } from "./cursor";
import { Path } from "./path";
import { colorToCSS } from "@/app/utils";

const Cursors= ()=>{
    const ids=useOthersConnectionIds();
    return (
        <>
        {ids.map((connectionId)=>(
            <Cursor
            key={connectionId}
            connectionId= {connectionId}
            
            />
        ))}
        </>
    )
}

const Draft = () => {
    const others = useOthersMapped(
      (other) => ({
        pencilDraft: other.presence.pencilDraft,
        pencilColor: other.presence.penColor,
      }),
      shallow
    );
  
    return (
      <>
        {others.map(([key, other]) => {
          if (other.pencilDraft) {
            return (
              <Path
                key={key}
                x={0}
                y={0}
                points={other.pencilDraft}
                fill={other.pencilColor ? colorToCSS(other.pencilColor) : "#000"}
              />
            );
          }
          return null;
        })}
      </>
    );
  };

export const CursorPresence = memo(()=>{
    return(
        <>
            <Draft/>
            <Cursors/>
        </>
    )
})


CursorPresence.displayName = "CursorPresence"