"use client";
import { useEffect, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { io } from "socket.io-client";

const socket = io();

const Canvas = ({ roomId }: { roomId: string }) => {
  const [lines, setLines] = useState<any[]>([]);

  useEffect(() => {
    if (!roomId) return; // Ensure roomId exists

    console.log(`Joining room: ${roomId}`);
    socket.emit("joinRoom", roomId);

    socket.on("draw", (data) => {
      setLines((prevLines) => [...prevLines, data.line]);
    });

    return () => {
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
