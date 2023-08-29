import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//import "./Games.css"

export const GameList=()=> {
  const [cards, setCards] = useState([])
  const [filteredCards, setFilteredCards] = useState([])
  const [platforms, setPlatforms] = useState([])
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  const localQuestUser = localStorage.getItem("quest_user")
  const questUserObject = JSON.parse(localQuestUser)
  const loggedInUserId = questUserObject.id; 

  useEffect(()=>{
    fetch("https://quest-keeper-api-esbux.ondigitalocean.app/cards?userId=${loggedInUserId}") 
      .then((response) => response.json())
      .then((cardsArray) => {
        const updatedCardsArray = cardsArray.map((card) => ({
          ...card,
          count: parseInt(localStorage.getItem(card.id)) || 0, // Initialize count from localStorage
          // platform: card.platform.id // Assuming platformId holds the ID of the platform
        }));
        setCards(updatedCardsArray);
        setFilteredCards(updatedCardsArray)
      })
  }, [loggedInUserId])


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











  const deleteButton = (cardObj) => {
    return (
      <button
        className="DeleteButton bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={() => {
          fetch(`https://quest-keeper-api-esbux.ondigitalocean.app/cards/${cardObj.id}`, {
            method: "DELETE",
          }).then(() => {
            fetch("https://quest-keeper-api-esbux.ondigitalocean.app/cards")
              .then((response) => response.json())
              .then((cardArray) => {
                setCards(cardArray);
              });
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        Quit Tracking
      </button>
    );
  };
  

  const editButton = (cardObj) => {
    return (
      <button onClick={() => navigate(`/editform/${cardObj.id}`)} // Pass card ID to the edit form route
      className="bg-cyan-300 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded inline-flex items-center">
        Edit
      </button>
    );
  };


    
  return (
    <>
    <section className='bg-gradient-to-b from-pink-300 to-blue-400 min-h-screen'>
      <h2 className='text-2xl font-bold mb-4 pl-2'>{questUserObject.name}'s Games:</h2>
      <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-4 pr-4'>
      {cards
        .filter((card) => card.postedByUser.id === loggedInUserId)
        .map((card, index) => {
          return (            
            <section className={`bg-gradient-to-b from-red-300 to-orange-100 p-4 rounded-lg shadow-lg  border-2 border-black ${card.fullyFinished ? 'border-4 border-black' : ''}`} key={card.id}>
              
              <div className='text-black-500 font-semibold flex justify-end'>
                Platform: {platforms.find(platform => platform.id === card.platform)?.name}
                <br/>
                Game: {card.title}
              </div>
  
              <div className='mt-2'>
              <p className="flex items-center space-x-2">
                <span >{card.currentAchievements} out of {card.achievements} achievements</span>
                  
              
              </p>


                <p>So far, I've played {card.hours} hours...</p> 
                <p>Main Story Complete?: {card.storyComplete ? 'Heck yeah!' : 'Not yet'}</p>
                <p>Fully Finished?: {card.fullyFinished ? 'HELL YEAH!' : 'Nope'}</p>
              </div>
  
              <div className='border border-gray-500 rounded-lg mt-4'>
                Notes:
                <p className='text-gray-600'>{card.notes}</p>
              </div>
              <div className='flex justify-between pt-4'>
                  {editButton(card)}
                  {deleteButton(card)}

              </div>
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
/*

(
    <>
      <h2 className='text-2xl font-bold mb-4'>Here are {questUserObject.id}'s games:</h2>
      <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cards.map((card, index) => {
          return (
            users.id === questUserObject.id ? (
              <section className='border border-gray-700 p-4 rounded-lg shadow-lg' key={card.id}>
                
                <div className='text-green-500 font-semibold'>
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
              </section>
             ) : null
          );
        })}
      </article>
    </>
  );

  */