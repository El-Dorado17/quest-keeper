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
    fetch("http://localhost:8088/cards?userId=${loggedInUserId}") 
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








  const initialCount = parseInt(localStorage.getItem('count')) || 0
  const [count, setCount] = useState(initialCount)

  const increment = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              count: card.count < card.achievements ? card.count + 1 : card.count,
            }
          : card,
      )
    );
  };
  
  const decrement = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, count: Math.max(0, card.count - 1) } : card, alert('This number is cap') 
      )
    );
  };
  
  
  const reset = (cardId) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, count: 0 } : card
      )
    );
  };
  

  useEffect(()=>{
    //update local storage when count changes
    localStorage.setItem('count', count.toString())
  }, [count])



/*
<button onClick={increment}> +1 </button> 
<button onClick={decrement}> -1 </button>
<button onClick={reset}> reset </button>

*/








  const deleteButton = (cardObj) => {
    return (
      <button
        className="DeleteButton bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={() => {
          fetch(`http://localhost:8088/cards/${cardObj.id}`, {
            method: "DELETE",
          }).then(() => {
            fetch("http://localhost:8088/cards")
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
  



    
  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>{questUserObject.name}'s Games:</h2>
      <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {cards
        .filter((card) => card.postedByUser.id === loggedInUserId)
        .map((card, index) => {
          return (            
            <section className='border border-gray-700 p-4 rounded-lg shadow-lg' key={card.id}>
              
              <div className='text-green-500 font-semibold'>
                Platform: {platforms.find(platform => platform.id === card.platform)?.name}
                <br/>
                Game: {card.title}
              </div>
  
              <div className='mt-2'>
              <p className="flex items-center space-x-2">
                <span className="text-gray-600">{card.count} out of {card.achievements} achievements</span>
                  
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => increment(card.id)}
                  >
                    +
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => decrement(card.id)}
                  >
                    -
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => reset(card.id)}
                  >
                    Reset
                  </button>
              </p>


                <p>So far, I've played {card.hours} hours...</p> 
                <p>Main Story Complete?: {card.storyComplete ? 'Heck yeah!' : 'Not yet'}</p>
                <p>Fully Finished?: {card.fullyFinished ? 'HELL YEAH!' : 'Nope'}</p>
              </div>
  
              <div className='border border-gray-500 rounded-lg mt-4'>
                Notes:
                <p className='text-gray-600'>{card.notes}</p>
              </div>
              <div className='self-end'>
                  {deleteButton(card)}
              </div>
            </section>
          );
        })}
      </article>
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