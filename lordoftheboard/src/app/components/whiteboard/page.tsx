"use client";
import { useEffect, useState, useRef } from "react";
import { Stage, Layer, Line } from "react-konva";
import { io } from "socket.io-client";

// ✅ Ensure it connects to the correct WebSocket server
const socket = io("http://localhost:3000");

const Canvas = ({ roomId }: { roomId: string }) => {
  const [lines, setLines] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username") || "Guest";
    setUsername(storedUsername);

    if (!roomId) return;

    socket.emit("joinRoom", { roomId, username: storedUsername });

    socket.on("userJoined", ({ username, roomId }) => {
      console.log(`Joining ${username}: ${roomId}`);
    });

    socket.on("draw", (data) => {
      setLines((prevLines) => [...prevLines, data.line]);
    });

    return () => {
      socket.off("userJoined");
      socket.off("draw");
    };
  }, [roomId]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {lines.map((line, i) => (
          <Line key={i} points={line.points} stroke="black" strokeWidth={5} />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
