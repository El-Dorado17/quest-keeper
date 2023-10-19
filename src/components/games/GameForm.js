import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const GameForm=()=> {

  const [card, setCard] = useState({
    platform: 0,
    title:"",
    currentAchievements: 0,
    achievements: 0,
    hours: 0,
    storyComplete: false,
    fullyFinished: false,
    postedByUser: 0,
    notes: ""
  })

  //const [cards, setCards] = useState([])

  const [platforms, setPlatforms] = useState([])

  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  const localQuestUser = localStorage.getItem("quest_user")
  const questUserObject = JSON.parse(localQuestUser)

  /*
    !Destructured Platforms
    I was destructring and assigning only the first element of the response to platformArray
      .then(([platformArray]) => {
  setPlatforms([platformArray]);
  });

  */
  useEffect(() => {
    fetch("https://quest-keeper-api.vercel.app/platforms")
      .then((response) => response.json())
      .then((platformArray) => {
        setPlatforms(platformArray);
      });
  }, []);

  useEffect(() => {
    fetch("https://quest-keeper-api.vercel.app/users")
      .then((response) => response.json())
      .then((userArray) => {
        setUsers(userArray);
      });
  }, []);


  const handleSaveButtonClick = (event) => {
    event.preventDefault();

    // eslint-disable-next-line
    const userId = users.id;

    const cardObjectToSendToAPI = {
      id: card.id,
      platform: card.platform,
      title: card.title,
      currentAchievements: card.currentAchievements,
      achievements: card.achievements,
      hours: card.hours,
      storyComplete: card.storyComplete,
      fullyFinished: card.fullyFinished,
      postedByUser: questUserObject,
      notes: card.notes,
    };

    // TODO: Perform the fetch() to POST the object to the API
    return fetch("https://quest-keeper-api.vercel.app/cards", {
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
    <article className='bg-gradient-to-b from-pink-300 to-blue-400 min-h-screen'>
    <form className="border border-black w-1/2 border rounded-lg p-2 mx-auto bg-purple-100">


      <h2 className="border border-black bg-white text-center py-2 rounded-t-lg font-semibold">Start Tracking a New Game</h2>

    <fieldset>
      <div className='my-4'>
        <label htmlFor='platform' className="block font-semibold">Platform:</label>
        <div></div>
        <select value={card.platform}
            onChange={(e)=>{const copy = {...card}
            copy.platform = parseInt(e.target.value)
            setCard(copy)
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
      <div className='pt-5 font-semibold'>
        <label htmlFor='achievements'>I have: </label>
        
        <input
        required
        autoFocus
        type="number"
        placeholder='17'
        className='border border-black w-20'
        value={card.currentAchievements}
        onChange={(e)=>{
          const copy = { ...card }
          copy.currentAchievements = e.target.value
          setCard(copy)
        }}
        /> out of 
     
        <label htmlFor='achievements'> </label>
        
        <input
        required
        autoFocus
        type="number"
        placeholder='17'
        className='border border-black w-20'
        value={card.achievements}
        onChange={(e)=>{
          const copy = { ...card }
          copy.achievements = e.target.value
          setCard(copy)
        }}
        /> Achievements
      </div>
    </fieldset>

    <fieldset>
      <div className='pt-5 font-semibold'>
        <label htmlFor='hours'>Playtime: </label>
        
        <input
        required
        autoFocus
        type="number"
        className='border border-black w-1/6'
        placeholder=' 10,000'
        value={card.hours}
        onChange={(e)=>{
          const copy = { ...card }
          copy.hours = e.target.value
          setCard(copy)
        }}
        /> hours...
      </div>
    </fieldset>

    {/* <fieldset>
      <div className='pt-5 font-semibold'>
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
    </fieldset> */}

    <fieldset>
      <div className='pt-5 font-semibold'>
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
      <div className='pt-5 pb-5 '>
        <label htmlFor='notes' className='font-semibold'> Game Notes: </label>
        <div></div>
        <textarea 
          required
          autoFocus
          className='w-3/4 p-2 border  border-black rounded '
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
        className="bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded my-4"
      >
        Add to My Games
      </button>

    </form>
    </article>

  )
}
