import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const { username } = useParams();
    const [profile, setProfile] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await axios.get(`${process.env.BACKEND_URL}/api/userprofile`, {
                    params: { username }
                });
                setProfile(response.data.user); 
                console.log(response);
            } catch (error) {
                setError('Error fetching user profile');
                console.error('Error fetching user profile:', error);
            } finally {
                setLoading(false);
            }
        };

        getUserProfile();
    }, [username]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
                <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
                {profile && (
                    <div>
                        <h2 className="text-xl font-semibold">{profile.name}</h2>
                        <p className="text-gray-700">Email: {profile.email}</p>
                        <p className="text-gray-700">Username: {profile.username}</p>
                      
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;


