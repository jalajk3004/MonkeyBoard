"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";

interface CardData {
  id: string;
  title: string;
}

const CreateWorkspace = () => {
  const router = useRouter();

  const [cards, setCards] = useState<CardData[]>([]);
  const [title, setTitle] = useState("");

  const addCard = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return alert("No token found, please log in!");
    if (!title) return alert("Title cannot be empty!");

    try {
      const response = await fetch("http://localhost:3000/api/data/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          title,
          userId: token }),
      });
      if (!response.ok) {
        throw new Error('Failed to create workspace');
      }

      const data = await response.json();
      setTitle(""); // Clear input field
      router.refresh(); // Refresh the page to show new data
    } catch (error) {
      console.error("Error adding card:", error);
      alert("Failed to create workspace. Please try again.");
    }
  };

  const handleCreateWorkspace = () => {
    const roomId = uuidv4();
    router.push(`/workspace/${roomId}`);
  };

  const handleButtonClick = () => {
    handleCreateWorkspace();
    addCard();
  };

  return (
    <Dialog>
      <DialogTrigger>Create your Workspace</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write A Title</DialogTitle>
          
          <div className="p-1 m-1">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter workspace title"
            className="w-full h-auto p-2 border border-gray-300 rounded-lg"
          />
        </div>
          <DialogTrigger onClick={handleButtonClick} className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-4 w-full rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">Create</DialogTrigger>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  );
};

export default CreateWorkspace;
