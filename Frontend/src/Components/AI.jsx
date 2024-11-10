import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AI = () => {
    const location = useSelector(state => state.travel.destination); 
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (location) {
            const fetchPlaces = async () => {
                setLoading(true);
                setError(null);
                try {
                    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/getplaces`, {
                        headers: {
                            location, 
                        },
                    });
                    setPlaces(response.data.places);
                } catch (err) {
                    setError('Unable to fetch details');
                } finally {
                    setLoading(false);
                }
            };
            fetchPlaces();
        }
    }, [location]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Travel Planner</h1>

            <div className="border border-gray-300 p-4 rounded-lg">
                {!location && (
                    <p className="text-center text-gray-500">Enter your location</p>
                )}
                
                {location && (
                    <>
                        <p className="text-center text-gray-700 mb-4">{location}</p>
                        {loading && <p className="text-center text-gray-500">Loading places...</p>}
                        {error && <p className="text-center text-red-500">{error}</p>}
                        {!loading && !error && places.length === 0 && (
                            <p className="text-center text-gray-500">No places found.</p>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {places.map((place, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <h3 className="text-lg font-semibold">{place.name}</h3>
                                    <p className="text-gray-600">Type: {place.type}</p>
                                    {place.coordinates ? (
                                        <p className="text-gray-500 text-sm">
                                            Coordinates: {place.coordinates.lat}, {place.coordinates.lon}
                                        </p>
                                    ) : (
                                        <p className="text-gray-500 text-sm">Coordinates not available</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AI;

