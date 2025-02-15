"use client";
import React from "react";
import { useOthers, useSelf } from "@liveblocks/react";
import { UserAvatar } from "./user-avatar";

const MAX_USERS = 2;

const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf(); // Renamed correctly
  const hasMoreUsers = users.length > MAX_USERS;

  return (
    <div className="absolute top-2 right-2 bg-white px-1.5 h-12 flex items-center rounded-md shadow-md">
      <div className="flex gap-x-2">
        {users.slice(0, MAX_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            
            
          />
        ))}
        
        {currentUser && currentUser.info && (
          <UserAvatar
            
            
          />
        )}

        {hasMoreUsers && <span className="text-gray-500">+{users.length - MAX_USERS}</span>}
      </div>
    </div>
  );
};

export default Participants;
