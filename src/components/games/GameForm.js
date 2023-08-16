import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const GameForm=()=> {

  const [card, setCard] = useState({
    id: 1,
    platform: 0,
    title:" ",
    achiements: 0,
    hours: 0,
    storyComplete: false,
    fullyFinished: false,
    postedByUser: 0
  })

  const [cards, setCards] = useState([])

  const [platforms, setPlatforms] = useState([])

  const navigate = useNavigate()



  /*
    !Destructured Platforms
    I was destructring and assigning only the first element of the response to platformArray
      .then(([platformArray]) => {
  setPlatforms([platformArray]);
  });

  */
  useEffect(() => {
    fetch("http://localhost:8088/platforms")
      .then((response) => response.json())
      .then((platformArray) => {
        setPlatforms(platformArray);
      });
  }, []);


  const handleSaveButtonClick = (event) => {
    event.preventDefault();


    const cardObjectToSendToAPI = {
      cardId: card.id,
      word: card.word,
      exampleSentence: card.exampleSentence,
      translatedWord: card.translatedWord,
      translatedExampleSentence: card.translatedExampleSentence,
      categoryId: card.categoryId,
      formal: card.formal,
    };

    // TODO: Perform the fetch() to POST the object to the API
    return fetch("http://localhost:8088/initialIndexCards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardObjectToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/cards"); //! idk what this means yet, find out after lunch. also fix
      });
  };








    
  return (
    <form className="gameForm">
      <h2 className="gameform_Title">Start a New Game</h2>

    <fieldset>
      <div className='form-group'>
        <label htmlFor='platform'>Platform:</label>
        <div></div>
        <select value={card.platform}
        onChange={(e)=>{const copy = {...card}
        copy.platform = parseInt(e.target.value)
        setCard(copy)
      }}
      >
        <option value="placeholder">Select a platform</option>
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



    </form>

  )
}
