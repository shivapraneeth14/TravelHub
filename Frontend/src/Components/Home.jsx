import React from 'react';


function Home() {
  
  return (
    <div className="container mx-auto p-6">
      {/* Header Section */}
      <header className="text-center py-10 bg-blue-600 text-white rounded-lg">
        <h1 className="text-5xl font-bold">Welcome to Travel Hub</h1>
        <p className="text-xl mt-4">Plan trips, share moments, and find your perfect travel companion!</p>
      </header>

      {/* Features Section */}
      <section className="my-12">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Travel Planner */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">Travel Planner</h3>
            <p className="text-gray-600">Plan your perfect trip by exploring top destinations, creating itineraries, and booking hotels and activities, all in one place.</p>
          </div>

          {/* Posting Photos/Videos */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-purple-600 mb-4">Share Your Journey</h3>
            <p className="text-gray-600">Post and share your travel experiences with photos and videos to inspire other travelers around the world.</p>
          </div>

          {/* Finding a Travel Companion */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-bold text-green-600 mb-4">Find a Companion</h3>
            <p className="text-gray-600">Connect with like-minded travelers, find companions for your journeys, and explore new places together.</p>
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <section className="my-12">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Featured Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hotel 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <img
              className="rounded-lg mb-4"
              src="https://via.placeholder.com/300"
              alt="Hotel 1"
            />
            <h3 className="text-2xl font-bold text-blue-700">Luxury Beach Resort</h3>
            <p className="text-gray-600 mt-2">Experience the best in luxury at this top-rated beachside resort.</p>
          </div>

          {/* Hotel 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <img
              className="rounded-lg mb-4"
              src="https://via.placeholder.com/300"
              alt="Hotel 2"
            />
            <h3 className="text-2xl font-bold text-blue-700">Mountain Retreat</h3>
            <p className="text-gray-600 mt-2">Escape to the serene mountains in this peaceful retreat.</p>
          </div>

          {/* Hotel 3 */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <img
              className="rounded-lg mb-4"
              src="https://via.placeholder.com/300"
              alt="Hotel 3"
            />
            <h3 className="text-2xl font-bold text-blue-700">City Center Hotel</h3>
            <p className="text-gray-600 mt-2">Stay in the heart of the city and enjoy the vibrant atmosphere.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;


