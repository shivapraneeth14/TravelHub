import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Group() {
  const [userId, setUserId] = useState("");
  const { username } = useParams();
  const [groups, setGroups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    locationToGo: '',
    transport: '',
    fromDate: '',
    toDate: '',
    user: '',
  });

  useEffect(() => {
    console.log("Entered useEffect for fetching user ID");

    const getUserId = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/getuserid", { username });
        console.log("Response data for user ID:", response.data);

        setUserId(response.data.userid);
        setFormData(prev => ({
          ...prev,
          user: response.data.userid,
        }));
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    getUserId();
  }, [username]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        console.log("Fetching groups...");
        const response = await axios.post("http://localhost:3000/api/allcompanion");
        console.log("Groups response data:", response.data);

        setGroups(Array.isArray(response.data.groups) ? response.data.groups : []);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    getGroups();
  }, []);

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData);
      const response = await axios.post("http://localhost:3000/api/getcompanion", formData);
      alert('Companion request submitted successfully!');
      console.log('Submission response:', response.data);

      setFormData({
        locationToGo: '',
        transport: '',
        fromDate: '',
        toDate: '',
        user: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  const handleJoin = (groupId) => {
    alert(`You have joined group ${groupId}!`);
  };

  return (
    <div className='p-4'>
      <div className='flex justify-center'>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none'
          onClick={toggleForm}
        >
          Find Companion
        </button>
      </div>

      {showForm && (
        <div className='mt-8 flex justify-center'>
          <div className='w-full max-w-lg p-4 bg-gray-100 rounded-lg shadow-lg'>
            <h3 className='text-lg font-semibold mb-2'>Find a Companion</h3>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor='locationToGo' className='block text-gray-700'>Location to Go</label>
                <input
                  type='text'
                  id='locationToGo'
                  name='locationToGo'
                  value={formData.locationToGo}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='transport' className='block text-gray-700'>Transport</label>
                <input
                  type='text'
                  id='transport'
                  name='transport'
                  value={formData.transport}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='fromDate' className='block text-gray-700'>From Date</label>
                <input
                  type='date'
                  id='fromDate'
                  name='fromDate'
                  value={formData.fromDate}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='toDate' className='block text-gray-700'>To Date</label>
                <input
                  type='date'
                  id='toDate'
                  name='toDate'
                  value={formData.toDate}
                  onChange={handleChange}
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  required
                />
              </div>
              <input type='hidden' name='user' value={formData.user} />
              <button type='submit' className='px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none'>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <div className='flex flex-wrap justify-center gap-4 mt-8'>
        {Array.isArray(groups) && groups.length > 0 ? (
          groups.map(group => (
            <div key={group._id} className='w-full max-w-md mx-auto bg-white shadow-2xl transform transition-transform hover:scale-105 rounded-lg overflow-hidden'>
              {group.imageUrl && <img src={group.imageUrl} alt={`${group.locationToGo} view`} className='w-full h-48 object-cover' />}
              
              <div className='p-4'>
                <p className='text-gray-600 mt-2'>Location: {group.locationToGo}</p>
                <p className='text-gray-600 mt-2'>From: {new Date(group.fromDate).toLocaleDateString()}</p>
                <p className='text-gray-600 mt-2'>To: {new Date(group.toDate).toLocaleDateString()}</p>
                <p className='text-gray-600 mt-2'>Transport: {group.transport}</p>
                <button 
                  onClick={() => handleJoin(group._id)}
                  className='mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none'
                >
                  Join
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No groups found.</p>
        )}
      </div>
    </div>
  );
}

export default Group;
