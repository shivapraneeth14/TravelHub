import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Group() {
  const[userId,setuserid] = useState("")
  const {username } = useParams()
  


  const groups = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/600x400?text=Place+1',
      place: 'Place 1',
      location: 'Location 1',
      dateFrom: '2024-09-01',
      dateTo: '2024-09-07',
      transport: 'Bus'
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/600x400?text=Place+2',
      place: 'Place 2',
      location: 'Location 2',
      dateFrom: '2024-09-15',
      dateTo: '2024-09-20',
      transport: 'Train'
    },
  ];

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    locationToGo: '',
    transport: '',
    fromDate: '',
    toDate: '',
    user: '', 
  });

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
      const response = await axios.post("http://localhost:3000/api/getcompanion", formData);
      alert('Companion request submitted successfully!');
      console.log('Response:', response.data); 
      setFormData({
        locationToGo: '',
        transport: '',
        fromDate: '',
        toDate: '',
        userId: userId,  
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };
  useEffect(() => {
    console.log("Entered useEffect");

    const getUserId = async () => {
        try {
            const response = await axios.post("http://localhost:3000/api/getuserid", { username });

            console.log("Response data:", response.data);

              setuserid(response.data.userId);
            
        } catch (error) {
            console.error("Error fetching user ID:", error);
        }
    };
        getUserId();
    
});

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
        {groups.map(group => (
          <div key={group.id} className='w-full max-w-md mx-auto bg-white shadow-2xl transform transition-transform hover:scale-105 rounded-lg overflow-hidden'>
           
            {group.imageUrl && <img src={group.imageUrl} alt={`${group.place} view`} className='w-full h-48 object-cover' />}
            
            <div className='p-4'>
              <h2 className='text-xl font-bold text-gray-800'>{group.place}</h2>
              <p className='text-gray-600 mt-2'>Location: {group.location}</p>
              <p className='text-gray-600 mt-2'>From: {group.dateFrom}</p>
              <p className='text-gray-600 mt-2'>To: {group.dateTo}</p>
              <p className='text-gray-600 mt-2'>Transport: {group.transport}</p>
              {/* Join Button */}
              <button 
                onClick={() => handleJoin(group.id)}
                className='mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none'
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Group;

