import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const EditForm = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState({
    // Initialize with default values or fetch the card data using cardId
  });

  // Fetch card data based on cardId when component mounts
  useEffect(() => {
    // Fetch card data using cardId and update the state
    // Example: fetch(`http://localhost:8088/cards/${cardId}`)
    //   .then(response => response.json())
    //   .then(cardData => setCard(cardData));
  }, [cardId]);

  const handleUpdateButtonClick = (event) => {
    event.preventDefault();

    // TODO: Perform the fetch() to update the card data
    // Example: fetch(`http://localhost:8088/cards/${cardId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(card),
    // })
    //   .then(response => response.json())
    //   .then(updatedCardData => {
    //     setCard(updatedCardData);
    //     navigate(`/gamelist/${cardId}`);
    //   });
  };

  return (
    <article className='bg-gradient-to-b from-pink-300 to-blue-400 min-h-screen'>
    <form className="border border-black w-1/2 border rounded-lg p-2 mx-auto">
      <h2 className="border border-black bg-blue-200 text-center py-2 rounded-t-lg font-semibold">Edit Game</h2>
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
