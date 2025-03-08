"use client";
import React from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from 'next/image'


type CardProps = {
  cardData: {
    id: string;
    title: string;
    userId: string;
    url: string;
  };
  onDelete: (id: string) => void; // Function passed from the parent
};

const Card = ({ cardData, onDelete }: CardProps) => {
  const router = useRouter();

  const handlesame = () => {
    try {
      router.push(cardData.url);
    } catch (error) {
      console.error("Error navigating:", error);
      alert("Failed to navigate. Please try again.");
    }
  };
  
  

  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return alert("No token found, please log in!");

    try {
      const response = await fetch(process.env.DELETECARD || `http://localhost:3000/api/data/delete/${cardData.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete workspace");
      }
      
      
      toast.success('Deleted Successfully!', {
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
        onDelete(cardData.id);
      }, 1000);
    } catch (error) {
      console.error("Error deleting card:", error);
      alert("Failed to delete workspace. Please try again.");
    }
  };

  return (
    <div>

      <ToastContainer />
    <div className="bg-slate-200 rounded-lg p-4 h-auto w-64 shadow-2xl flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
      <div className="rounded-lg overflow-hidden">
        <Image
        
          src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
          alt="Card Image"
          />
      </div>
      <h1 className="text-xl font-bold mt-2 px-2">{cardData.title}</h1>
      <div className="flex flex-row items-center justify-between">
        <button onClick={handlesame} className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 w-1/2 m-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
          Continue...
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
          Delete
        </button>
      </div>
    </div>
          </div>
  );
};

export default Card;
