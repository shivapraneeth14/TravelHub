import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stays() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants',
        params: {
          locationId: '304554'
        },
        headers: {
          'x-rapidapi-key': '1afd3a60d5mshcb12b9590fbdee2p1d970djsnf24a2f73d2f1',
          'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        console.log(response.data.data.data);
        setRestaurants(response.data.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div key={restaurant.restaurantsId} className="border rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto">
              <img
                src={restaurant.heroImgUrl || 'https://via.placeholder.com/300'} 
                alt={restaurant.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
                <p className="text-gray-600 mb-2">{restaurant.parentGeoName}</p>
                <p className="text-yellow-500 mb-2">
                  Rating: {restaurant.averageRating} ({restaurant.userReviewCount} reviews)
                </p>
                <p className="text-gray-800 mb-4">Price: {restaurant.priceTag || 'N/A'}</p>
                <div className="flex justify-center">
                  <a
                    href={`https://www.tripadvisor.com/Restaurant_Review-g304554-d5913736-Reviews-Tuskers_Vegetarian_Dining_Bar-Mumbai_Maharashtra.html`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className=' text-center'>Loading restaurants ...</p>
        )}
      </div>
    </div>
  );
}

export default Stays;
