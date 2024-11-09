import mongoose from "mongoose";

const companionSchema = new mongoose.Schema({
  
  locationToGo: {
    type: String,
    required: true, 
    trim: true       
  },
  transport: {
    type: String,
    required: true,  
    trim: true       
  },
  fromDate: {
    type: Date,
    required: true  
  },
  toDate: {
    type: Date,
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
  createdAt: {
    type: Date,
    default: Date.now  
  },
  updatedAt: {
    type: Date,
    default: Date.now  
  }
});

const Companion = mongoose.model('Companion', companionSchema);

export default Companion
