"use client";
import React, { useEffect, useState } from 'react'

interface CardData {
    id: string;
    title: string;
  }
  
  const Card = () => {
    const [cards, setCards] = useState<CardData[]>([]);
    const [title, setTitle] = useState("");
  
    // Fetch User's Cards
    const getCards = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return alert("No token found, please log in!");
  
      try {
        const response = await fetch("http://localhost:3000/api/data/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        const data = await response.json();
        setCards(data); // Update state with fetched cards
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
  
    // Add a Card
    
  
    // Delete a Card
    const deleteCard = async (id: string) => {
      const token = sessionStorage.getItem("token");
      if (!token) return alert("No token found, please log in!");
  
      try {
        await fetch(`http://localhost:3000/api/data/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
  
        setCards(cards.filter((card) => card.id !== id)); // Remove deleted card from state
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    };
  
    // Fetch cards on component mount
    useEffect(() => {
      getCards();
    }, []);
  return (
    <div>
        <div className='bg-slate-200 rounded-lg p-4 h-auto w-64 ml-16 shadow-2xl flex flex-col justify-between transition-all duration-300 transform hover:scale-105 hover:shadow-lg'>
            <div className='rounded-lg overflow-hidden'>
                <img src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg" />
            </div>
                <h1 className='text-3xl font-bold mt-2 px-2'>{title}</h1>
            <div className='flex flex-row items-center justify-between'>

                <button className='bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 w-1/2 m-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  whileHover={{ scale: 1.1 }}  '>Continue...</button>
            </div>

        </div>
      
    </div>
  )
}

export default Card;
