import { configureStore } from '@reduxjs/toolkit';
import {Travelreducer} from './TravelSlice.js'

export const store = configureStore({
    reducer: {
        travel: Travelreducer, 
    },
});