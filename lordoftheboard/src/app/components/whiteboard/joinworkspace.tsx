"use client";
import { DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

const JoinWorkspace = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const joinWorkspace = () => {
    if (!url.trim()) {
      return alert("Workspace URL cannot be empty!");
    }

    // Ensure the URL starts with the correct format (basic validation)
    if (!url.startsWith("workspace/")) {
      return alert("Invalid workspace URL. Ensure it follows the correct format.");
    }

    toast.success("Joining Workspace...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    setTimeout(() => {
      router.push(url); // Redirect to the workspace
    }, 1000);

    setUrl("");
  };

  return (
    <Dialog>
      <ToastContainer />
      <DialogTrigger>Join Workspace</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Workspace URL</DialogTitle>
          <div className="p-1 m-1">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter workspace URL (e.g., /workspace/room-id)"
              className="w-full h-auto p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={joinWorkspace}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-4 w-full rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Join
          </button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default JoinWorkspace;
