import { configureStore } from '@reduxjs/toolkit';
import Travelreducer from './TravelSlice'; 

export const store = configureStore({
    reducer: {
        travel: Travelreducer, 
    },
});