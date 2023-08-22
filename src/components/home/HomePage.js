import React from "react";

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-300 to-blue-500 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="text-4xl font-bold mb-4">Welcome to Quest Keeper</div>
        <p className="text-lg mb-6">
          Keep track of gaming achievements & progress in one place.
        </p>
        <div className="flex justify-center space-x-6">
        </div>
      </div>
    </div>
  );
};
