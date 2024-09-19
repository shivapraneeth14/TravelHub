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
    image: {
      url: {
        type: String,  
        required: true
      },
      location: {
        type: {
          type: String,  
          required: true
        },
       
      }
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