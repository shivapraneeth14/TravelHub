import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true, 
      trim: true       
    },
    description: {
      type: String,
      required: true,  
      trim: true        
    },
   imageUrl:{
    type:String,
    required:true,
   },
   location:{
    type:String,
    
   },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now  
    },
    updatedAt: {
      type: Date,
      default: Date.now  
    }
  });
  
  const Post = mongoose.model('Post', postSchema);
  
export default Post