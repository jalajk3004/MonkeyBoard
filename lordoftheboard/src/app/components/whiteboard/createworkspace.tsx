"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bounce, toast, ToastContainer } from "react-toastify";

const CreateWorkspace = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const addCard = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return alert("No token found, please log in!");
    // if (!title.trim()) return alert("Title cannot be empty!");

    try {
      const response = await fetch(process.env.ADDCARD || "https://monkey-board-three.vercel.app/api/data/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, // Fixed token format
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Failed to create workspace");
      }


      const data = await response.json();
      const boardId = data.boardId;
      
      toast.success('Workspace Created!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    
      setTimeout(() => {
      
      router.push(`/workspace/${boardId}`);
    
    }, 1000);
      setTitle("");

      // Use the workspace ID from backend response if available
    } catch (error) {
      console.error("Error adding card:", error);
      alert("Failed to create workspace. Please try again.");
    }
  };

  return (
    <Dialog>
    <ToastContainer />
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
          <button
            onClick={addCard}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-4 w-full rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Create
          </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspace;
