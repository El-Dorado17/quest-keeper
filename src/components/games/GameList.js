import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "./Games.css"

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
      <h2>Your games:</h2>
      
      <article className='cards'>
        {cards.map((card, index)=>{
          return(
            <section className='card' key={card.id}>
              <div className='flip-card-front'>
                Platform: {platforms.find(platform => platform.id === card.platform)?.name}
                <br/>
                Game: {card.title}
                <br/>
                You have collected 0 out of {card.achievements} achievements
                <br/>
                So far you have played {card.hours} hours...
                <br/>
                story {card.storycomplete}
                <br/>
                fully finished {card.fullyFinished}
              </div>
              <div className='flip-card-back'>
                {card.notes} 
                
              </div>
            </section>
          )
        })}
      </article>
    </>
  )
}
