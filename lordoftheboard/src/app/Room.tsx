"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";
import { Layer } from "../../types/canvas";
import { SidebarWrapper } from "./components/sidemenu/SidebarWrapper";

interface RoomProps {
  children: ReactNode;
  roomId: string;
}



export function Room({ children, roomId }: RoomProps) {
  
  return (

    <LiveblocksProvider
      publicApiKey="pk_prod_33FJvG28Mdf_OFNJ_zjUeDDYc_e4sd3cm7vXJGJ151odN67ybeBCi19IVd_mK_LP"
      throttle={16}
    >
      <RoomProvider
        id={roomId} 
        initialPresence={{
          cursor: null,
          selection: [],
          pencilDraft: null,
          penColor: null,
        }}
        initialStorage={{
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <SidebarWrapper>{children}</SidebarWrapper>
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
