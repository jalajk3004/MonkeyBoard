"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";


interface RoomProps{
    children:ReactNode
    roomId:string
}
export function Room({ children,roomId }: RoomProps) {
  return (
    <LiveblocksProvider publicApiKey={"pk_prod_33FJvG28Mdf_OFNJ_zjUeDDYc_e4sd3cm7vXJGJ151odN67ybeBCi19IVd_mK_LP"}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}