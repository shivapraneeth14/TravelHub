import React, { useState } from 'react';
import axios from 'axios';

function Social() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      userProfilePicture: 'https://via.placeholder.com/48?text=User+1',
      userName: 'User 1',
      location: 'Location 1',
      image: 'https://via.placeholder.com/600x400?text=Post+1',
      description: 'Description of Post 1'
    },
    {
      id: 2,
      userProfilePicture: 'https://via.placeholder.com/48?text=User+2',
      userName: 'User 2',
      location: 'Location 2',
      image: 'https://via.placeholder.com/600x400?text=Post+2',
      description: 'Description of Post 2'
    },
   
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    imageUrl: '',
    location: '',
    userId: '' 
  });

  const [showForm, setShowForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost((prevPost) => ({
          ...prevPost,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = async () => {
    // if (Object.values(newPost).some(field => !field)) {
    //   alert('Please fill out all fields');
    //   return;
    // }

    try {
      const response = await axios.post('http://localhost:3000/api/post', newPost);
      if (response.data.success) {
        setPosts((prevPosts) => [
          ...prevPosts,
          { id: prevPosts.length + 1, ...newPost }
        ]);
        setNewPost({
          title: '',
          description: '',
          imageUrl: '',
          location: '',
          userId: ''
        });
        setShowForm(false); 
      } else {
        alert('Error creating post');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          {showForm ? 'Cancel' : 'Add Post'}
        </button>
      </div>

      {showForm && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a New Post</h2>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="location"
            value={newPost.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mb-4"
          />
          {newPost.imageUrl && (
            <img
              src={newPost.imageUrl}
              alt="Preview"
              className="w-full h-60 object-cover rounded-lg shadow-md mb-4"
            />
          )}
          <textarea
            name="description"
            value={newPost.description}
            onChange={handleInputChange}
            placeholder="Description"
            rows="4"
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleAddPost}
            className="py-2 px-6 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Add Post
          </button>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-6">
        {posts.map(post => (
          <div key={post.id} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center mb-4">
              <img
                src={post.userProfilePicture} 
                alt="User"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{post.userName}</h3>
                <p className="text-gray-600">Visited {post.location}</p>
              </div>
            </div>

            <div className="mb-4">
              <img
                src={post.image} 
                alt={post.description}
                className="w-full h-60 object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="flex justify-between items-center">
              <button className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                Like
              </button>
              <button className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                Comment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Social;


