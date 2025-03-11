"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { LiveMap, LiveList, LiveObject } from "@liveblocks/client";
import { Layer } from "../../types/canvas";

interface RoomProps {
  children: ReactNode;
  roomId: string;
}



export function Room({ children, roomId }: RoomProps) {
  
  return (

    <LiveblocksProvider
      publicApiKey="pk_prod_ncfQSEmU3ZrLH0VbG4VwxYiUkRm782k2UoTsKtfK_4KPXazECglJR5XL8qBhFXvu"
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
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
