"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Card from "./card";

interface CardData {
  id: string;
  title: string;
  userId: string;
}

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
      const response = await fetch("http://localhost:3000/api/data/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workspaces');
      }

      const data = await response.json();
      // Filter cards to only show the logged-in user's cards
      const userCards = data.filter((card: CardData) => card.userId === token);
      setCards(userCards);
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

  return (
    <div>
      <section className="px-4 m-10 lg:px-16 py-8">
        <motion.h2
          className="text-3xl font-bold text-zinc-800 mb-8 flex flex-row justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          Your Work
        </motion.h2>
      </section>

      {loading ? (
        <p>Loading...</p>
      ) : cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p>Progress is yet to begin</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 px-4">
          {cards.map((card) => (
            <Card 
              key={card.id} 
              id={card.id} 
              title={card.title}
              userId={card.userId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default YourWork;
