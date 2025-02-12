"use client";
import React from "react";

interface CardProps {
  id: string;
  title: string;
  userId: string;

}

const Card: React.FC<CardProps> = ({ id, title }) => {
  const handleDelete = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) return alert("No token found, please log in!");

    try {
      const response = await fetch(`http://localhost:3000/api/data/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete workspace');
      }

      window.location.reload();
    } catch (error) {
      console.error("Error deleting card:", error);
      alert("Failed to delete workspace. Please try again.");
    }
  };

  return (
    <div className="bg-slate-200 rounded-lg p-4 h-auto w-64 shadow-2xl flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
      <div className="rounded-lg overflow-hidden">
        <img
          src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
          alt="Card Image"
        />
      </div>
      <h1 className="text-3xl font-bold mt-2 px-2">{title}</h1>
      <div className="flex flex-row items-center justify-between">
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 w-1/2 m-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
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
  );
};

export default Card;
