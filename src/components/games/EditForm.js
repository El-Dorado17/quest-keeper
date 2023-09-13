import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const EditForm = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState("");

  const [currentCard, setCurrentCard] = useState({
    platform: 0,
    title:"",
    currentAchievements: 0,
    achievements: 0,
    hours: 0,
    storyComplete: false,
    fullyFinished: false,
    postedByUser: 0,
    notes: ""
  });

  // Fetch card data based on cardId when component mounts
  useEffect(() => {
    // Fetch card data using cardId and update the state
      fetch(`https://quest-keeper-api-esbux.ondigitalocean.app/cards/${cardId}`) //
        .then(response => response.json())
        .then(cardData => setCurrentCard(cardData));
  }, [cardId]);

  const [platforms, setPlatforms] = useState([]); // Add platforms state

  // Fetch platforms data
  useEffect(() => {
    fetch("https://quest-keeper-api-esbux.ondigitalocean.app/platforms")
      .then((response) => response.json())
      .then((platformArray) => {
        setPlatforms(platformArray);
      });
  }, []);



  const handleUpdateButtonClick = (event) => {
    event.preventDefault();

    // TODO: Perform the fetch() to update the card data
    fetch(`https://quest-keeper-api-esbux.ondigitalocean.app/cards/${cardId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentCard),
    })
      .then(response => response.json())
      .then(updatedCardData => {
        setCurrentCard(updatedCardData);
        navigate(`/gamelist`);
      });
  };

  return (
    <article className='bg-gradient-to-b from-pink-300 to-blue-400 min-h-screen'>
    <form className="border border-black w-1/2 border rounded-lg p-2 mx-auto">
      <h2 className="border border-black bg-blue-200 text-center py-2 rounded-t-lg font-semibold">Edit Game</h2>
      
      <fieldset>
      <div className='my-4'>
        <label htmlFor='platform' className="block font-semibold">Platform:</label>
        <div></div>
        <select value={currentCard.platform}
            onChange={(e)=>{const copy = {...currentCard}
            copy.platform = parseInt(e.target.value)
            setCurrentCard(copy)
          }}
          className="w-full border border-black rounded px-2 py-1 mt-1"
          >
            <option value="placeholder" className=''>Select a platform...</option>
            {platforms.map((platform)=>{
              return(
                <option value={platform.id} key={platform.id}>
                  {platform.id}) {platform.name}
                </option>
              )
            })}
        </select>
      </div>
    </fieldset>

    <fieldset>
      <div className='pt-5 '>
        <label htmlFor='title' className='font-semibold'>Title: </label>
        <input
          required
          autoFocus
          type="text"
          className='border border-black rounded w-1/2'
          placeholder="  Portal 2 "
          value={currentCard.title}
          onChange={(e)=>{
            const copy = { ...currentCard };
            copy.title = e.target.value;
            setCurrentCard(copy);
          }}
        />
      </div>
    </fieldset>

    <fieldset>
      <div className='pt-5 font-semibold'>
        <label htmlFor='achievements'>I have: </label>
        
        <input
        required
        autoFocus
        type="number"
        placeholder='17'
        className='border border-black w-10'
        value={currentCard.currentAchievements}
        onChange={(e) => {
          const newValue = parseInt(e.target.value);
          if (newValue <= currentCard.achievements) {
            const copy = { ...currentCard }
            copy.currentAchievements = newValue;
            setCurrentCard(copy);
            setValidationError(""); // Clear validation error
          } else {
            setValidationError("Current achievements cannot be greater than total achievements.");
          }
        }}
        // onChange={(e)=>{
        //   const copy = { ...currentCard }
        //   copy.currentAchievements = e.target.value
        //   setCurrentCard(copy)
        // }}
        /> out of 
     
        <label htmlFor='achievements'> </label>
        
        <input
        required
        autoFocus
        type="number"
        placeholder='17'
        className='border border-black w-10'
        value={currentCard.achievements}
        onChange={(e)=>{
          const copy = { ...currentCard }
          copy.achievements = e.target.value
          setCurrentCard(copy)
        }}
        /> Achievements
      </div>
    </fieldset>
    <p className="text-red-500">{validationError}</p> {/* Display validation error */}

    <fieldset>
      <div className='pt-5 font-semibold'>
        <label htmlFor='hours'>Playtime: </label>
        
        <input
        required
        autoFocus
        type="number"
        className='border border-black w-1/6'
        placeholder=' 10,000'
        value={currentCard.hours}
        onChange={(e)=>{
          const copy = { ...currentCard }
          copy.hours = e.target.value
          setCurrentCard(copy)
        }}
        /> hours...
      </div>
    </fieldset>

    <fieldset>
      <div className='pt-5 font-semibold'>
        <label htmlFor='story'>Story Complete?</label>
        <input
        required // r?
        autoFocus // r?
        type="checkbox"
        checked = {currentCard.storyComplete}
        value={currentCard.storyComplete}
        onChange={(evt) => {
          const copy = { ...currentCard };
          copy.storyComplete = evt.target.checked;
          setCurrentCard(copy);
        }}
         />
      </div>
    </fieldset>

    <fieldset>
      <div className='pt-5 font-semibold'>
        <label htmlFor='fully'>Game fully finished?</label>
        <input
        type="checkbox"
        checked = {currentCard.fullyFinished}
        value={currentCard.fullyFinished}
        onChange={(evt) => {
          const copy = { ...currentCard };
          copy.fullyFinished = evt.target.checked;
          setCurrentCard(copy);
        }}
         />
      </div>
    </fieldset>

    <fieldset>
      <div className='pt-5 pb-5 '>
        <label htmlFor='notes' className='font-semibold'> Game Notes: </label>
        <div></div>
        <textarea 
          required
          autoFocus
          className='w-3/4 p-2 border  border-black rounded '
          placeholder='"In the shadows, to the left"'
          value={currentCard.notes}
          onChange={(e)=>{
            const copy = { ...currentCard };
            copy.notes = e.target.value;
            setCurrentCard(copy);
          }}
        />
      </div>
    </fieldset>
      {/* Edit form fields similar to GameForm */}
      {/* Remember to populate input values with card data */}
      {/* Replace handleSaveButtonClick with handleUpdateButtonClick */}
      <button
        onClick={handleUpdateButtonClick}
        className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded my-4"
      >
        Update Game
      </button>
    </form>
    </article>
  );
};
