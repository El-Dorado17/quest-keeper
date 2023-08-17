import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//import "./Games.css"

export const GameList=()=> {
  const [cards, setCards] = useState([])
  const [filteredCards, setFilteredCards] = useState([])
  const [platforms, setPlatforms] = useState([])

  const navigate = useNavigate()

  const localQuestUser = localStorage.getItem("quest_user")
  const questUserObject = JSON.parse(localQuestUser)

  useEffect(()=>{
    fetch("http://localhost:8088/cards") //!  ?_expand=platform   not working 
      .then((response) => response.json())
      .then((cardsArray) => {
        const updatedCardsArray = cardsArray.map((card) => ({
          ...card,
          // platform: card.platform.id // Assuming platformId holds the ID of the platform
        }));
        setCards(updatedCardsArray);
        setFilteredCards(updatedCardsArray)
      })
  }, [])


  useEffect(
    () => {
      fetch("http://localhost:8088/platforms")
        .then((response) => response.json())
        .then((platformArray) => {
          setPlatforms(platformArray);
        });
    },
    [] // When this array is empty, you are observing initial component state
  );





    
  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>My games:</h2>
      
      <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cards.map((card, index) => {
          return (
            <section className='border border-gray-700 p-4 rounded-lg shadow-lg' key={card.id}>
              <div className='text-green-500 font-semibold'>
                Platform: {platforms.find(platform => platform.id === card.platform)?.name}
                <br/>
                Game: {card.title}
              </div>
  
              <div className='mt-2'>
                <p>0 out of {card.achievements} achievements</p>
                <p>So far, I've played {card.hours} hours...</p>
                <p>Main Story Complete?: {card.storycomplete ? 'Heck yeah!' : 'Not yet'}</p>
                <p>Fully Finished?: {card.fullyFinished ? 'HELL YEAH!' : 'Nope'}</p>
              </div>
  
              <div className='border border-gray-500 rounded-lg mt-4'>
                Notes:
                <p className='text-gray-600'>{card.notes}</p>
              </div>
            </section>
          );
        })}
      </article>
    </>
  );
  
}
