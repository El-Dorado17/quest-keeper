import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const GameForm=()=> {

  const [card, setCard] = useState({
    id: 1,
    platform: 0,
    title:"",
    achievements: 0,
    hours: 0,
    storyComplete: false,
    fullyFinished: false,
    postedByUser: 0,
    notes: ""
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
      platform: card.platform,
      title: card.title,
      achievements: card.achievements,
      hours: card.hours,
      storyComplete: card.storyComplete,
      fullyFinished: card.fullyFinished,
      notes: card.notes,
    };

    // TODO: Perform the fetch() to POST the object to the API
    return fetch("http://localhost:8088/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardObjectToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/gamelist"); 
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

    <fieldset>
      <div className='form-group'>
        <label htmlFor='title'>Title: </label>
        <input
          required
          autoFocus
          type="text"
          className='form-control'
          placeholder="Super Monkey Ball"
          value={card.title}
          onChange={(e)=>{
            const copy = { ...card };
            copy.title = e.target.value;
            setCard(copy);
          }}
        />
      </div>
    </fieldset>

    <fieldset>
      <div className='form-group'>
        <label htmlFor='achievements'>Achievements: </label>
        
        <input
        required
        autoFocus
        type="number"
        placeholder='17'
        className='form-control'
        value={card.achievements}
        onChange={(e)=>{
          const copy = { ...card }
          copy.achievements = e.target.value
          setCard(copy)
        }}
        />
      </div>
    </fieldset>

    <fieldset>
      <div className='form-group'>
        <label htmlFor='hours'>Playtime: </label>
        
        <input
        required
        autoFocus
        type="number"
        className='form-control'
        placeholder='10,000'
        value={card.hours}
        onChange={(e)=>{
          const copy = { ...card }
          copy.hours = e.target.value
          setCard(copy)
        }}
        /> hours...
      </div>
    </fieldset>

    <fieldset>
      <div className='form-group'>
        <label htmlFor='story'>Story Complete?</label>
        <input
        type='checkbox'
        value={card.storyComplete}
        onChange={(evt) => {
          const copy = { ...card };
          copy.storyComplete = evt.target.checked;
          setCard(copy);
        }}
         />
      </div>
    </fieldset>

    <fieldset>
      <div className='form-group'>
        <label htmlFor='fully'>Game fully finished?</label>
        <input
        type='checkbox'
        value={card.fullyFinished}
        onChange={(evt) => {
          const copy = { ...card };
          copy.fullyFinished = evt.target.checked;
          setCard(copy);
        }}
         />
      </div>
    </fieldset>

    <fieldset>
      <div className='form-group'>
        <label htmlFor='notes'> Player Notes: </label>
        <input
          required
          autoFocus
          type="text"
          className='form-control'
          placeholder='"In the shadows, to the left"'
          value={card.notes}
          onChange={(e)=>{
            const copy = { ...card };
            copy.notes = e.target.value;
            setCard(copy);
          }}
        />
      </div>
    </fieldset>

    <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="create_button"
      >
        Add to My Games
      </button>

    </form>

  )
}
