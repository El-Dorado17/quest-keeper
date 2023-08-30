/*
I LOVE YOU MIKAYLA DORADO!

This will house code for all users games as the intro page... MAKE IT HAPPEN
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
      fetch("https://quest-keeper-api-esbux.ondigitalocean.app/cards") //!  ?_expand=platform   not working 
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
        fetch("https://quest-keeper-api-esbux.ondigitalocean.app/platforms")
          .then((response) => response.json())
          .then((platformArray) => {
            setPlatforms(platformArray);
          });
      },
      [] // When this array is empty, you are observing initial component state
    );
  
    useEffect(() => {
      fetch("https://quest-keeper-api-esbux.ondigitalocean.app/users")
        .then((response) => response.json())
        .then((userArray) => {
          setUsers(userArray);
        });
    }, []);
  
  
  
  
      
    return (
      <>
      <section className='bg-gradient-to-b from-pink-300 to-blue-400 min-h-screen'>
        <h2 className='text-2xl font-bold mb-4 pl-2 pt-2 '>Checkout what all users playing!</h2>
        <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-4 pr-4'>
          {cards.map((card, index) => {
            return (
              <section className={`bg-gradient-to-b from-red-300 to-orange-100 p-4 rounded-lg shadow-lg  border-2 border-black ${card.fullyFinished ? 'border-4 border-black' : ''}`} key={card.id}>
              
                <div className='text-black-500 font-semibold flex justify-end'>
                  Platform: {platforms.find(platform => platform.id === card.platform)?.name}
                  <br/>
                  Game: {card.title}
                </div>
    
                <div className='mt-2'>
                  <p>{card.currentAchievements} out of {card.achievements} achievements</p>
                  <p>So far, I've played {card.hours} hours...</p>
                  <p>Main Story Complete?: {card.storyComplete ? 'Heck yeah!' : 'Not yet'}</p>
                  <p>Fully Finished?: {card.fullyFinished ? 'HELL YEAH!' : 'Nope'}</p>
                </div>
    
                <div className='text-black-500 border border-black rounded-lg mt-4'>
                  Notes:
                  <p className='text-black-500'>{card.notes}</p>
                </div>
                <div className='flex justify-center text-md'>Posted by: {card.postedByUser.name}</div>
                  {card.fullyFinished && (
                    <div className='flex justify-center mt-3'> 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-9 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
  )}
</section>
            );
          })}
        </article>
        </section>
      </>
    );
}