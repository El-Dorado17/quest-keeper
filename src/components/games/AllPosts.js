/*
This will house code for all users games as the intro page... MAYBE
*/
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AllPosts = () =>{

  
    const [cards, setCards] = useState([])
    const [filteredCards, setFilteredCards] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [users, setUsers] = useState([])
  
    const navigate = useNavigate()
  
    const localQuestUser = localStorage.getItem("quest_user")
    const questUserObject = JSON.parse(localQuestUser)
//    const loggedInUserName = questUserObject.name; 
  
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
  
    useEffect(() => {
      fetch("http://localhost:8088/users")
        .then((response) => response.json())
        .then((userArray) => {
          setUsers(userArray);
        });
    }, []);
  
  
  
  
      
    return (
      <>
      <section className='bg-gradient-to-b from-pink-300 to-blue-400'>
        <h2 className='text-2xl font-bold mb-4 pl-2 pt-2 '>Here's what everyone is playing!</h2>
        <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-4 pr-4'>
          {cards.map((card, index) => {
            return (
              <section className={`border border-gray-700 p-4 rounded-lg shadow-lg ${card.fullyFinished ? 'bg-gradient-to-b from-red-200 to-pink-300' : 'bg-purple-100'}`} key={card.id}>
              
                <div className='text-black-500 font-semibold flex justify-end'>
                  Platform: {platforms.find(platform => platform.id === card.platform)?.name}
                  <br/>
                  Game: {card.title}
                </div>
    
                <div className='mt-2'>
                  <p>0 out of {card.achievements} achievements</p>
                  <p>So far, I've played {card.hours} hours...</p>
                  <p>Main Story Complete?: {card.storyComplete ? 'Heck yeah!' : 'Not yet'}</p>
                  <p>Fully Finished?: {card.fullyFinished ? 'HELL YEAH!' : 'Nope'}</p>
                </div>
    
                <div className='border border-gray-500 rounded-lg mt-4'>
                  Notes:
                  <p className='text-gray-600'>{card.notes}</p>
                </div>
                <div className='flex justify-center text-sm'>Player: {card.postedByUser.name}</div>
              </section>
            );
          })}
        </article>
        </section>
      </>
    );
}