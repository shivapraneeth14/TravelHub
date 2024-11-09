import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDestination,setDateFrom,setDateTo } from './TravelSlice';


function Header() {
  const dispatch = useDispatch();
  const [destination, setDestinationLocal] = useState('');
  const [dateFrom, setDateFromLocal] = useState('');
  const [dateTo, setDateToLocal] = useState('');

  const handleSearch = () => {
    dispatch(setDestination(destination));
    dispatch(setDateFrom(dateFrom));
    dispatch(setDateTo(dateTo));
    console.log(`Searching for ${destination} from ${dateFrom} to ${dateTo}`);
  };

  return (
    <div className='flex flex-col justify-end'>
      <div className='flex justify-evenly items-center w-full h-24 bg-white shadow-xl border-b border-gray-200'>
        <div className='font-bold text-3xl text-blue-500'>
            Travel <span className='text-gray-800'>Hub</span>
        </div>

        <div className='text-gray-700 font-medium text-lg'>
          <Link to="">Home</Link>
        </div>
        <div className='text-gray-700 font-medium text-lg'>
          <Link to="Stays">Stays</Link>
        </div>
        <div className='text-gray-700 font-medium text-lg'>
          <Link to="Ai">Your Planner</Link>
        </div>
        <div className='text-gray-700 font-medium text-lg'>
          <Link to="Group">Travel Mates</Link>
        </div>
        <div className='text-gray-700 font-medium text-lg'>
          <Link to="Social">Social</Link>
        </div>
        <div className='text-gray-700 font-medium text-lg'>
          <Link to="Profile">Profile</Link>
        </div>
      </div>

      <div className='w-full flex justify-center mt-4'>
        <div className='flex items-center bg-white shadow-lg rounded-lg p-4 border border-gray-200'>
          
          <div className='flex items-center'>
            <input 
              placeholder='Choose Destination' 
              className='w-full h-10 px-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300' 
              type="text" 
              value={destination}
              onChange={(e) => setDestinationLocal(e.target.value)} 
            />
          </div>
          <div className='h-10 flex items-center bg-white px-3'>
            <span className='text-gray-500 font-bold text-sm mr-2'>From</span>
            <input 
              className='w-full h-full px-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300' 
              type="date" 
              value={dateFrom}
              onChange={(e) => setDateFromLocal(e.target.value)} 
            />
          </div>

          <div className='h-10 flex items-center bg-white px-3'>
            <span className='text-gray-500 font-bold text-sm mr-2'>To</span>
            <input 
              className='w-full h-full px-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300' 
              type="date" 
              value={dateTo}
              onChange={(e) => setDateToLocal(e.target.value)} 
            />
          </div>

          <button 
            className='h-10 px-6 ml-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
