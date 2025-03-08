"use client";
import React, { useState, useEffect } from "react";
import Card from "./card";


type CardData = {
  id: string;
  title: string;
  userId: string;
  url: string;
};

const YourWork = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  const getCards = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(process.env.FETCHALL || "http://localhost:3000/api/data/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch workspaces");
      }

      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      alert("Failed to fetch workspaces. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  // Function to remove a deleted card from the UI
  const handleDelete = (id: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <div>
      <section className="px-4 m-10 lg:px-16 py-8">
        <h2 className="text-3xl font-bold text-zinc-800 mb-8">Your Work</h2>
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          
          <p>No workspaces found. Start by creating one!</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 px-4">
          {cards.map((card) => (
            <Card key={card.id} cardData={card} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default YourWork;
