import User from "../Models/User.model.js";
import bcrypt from 'bcrypt';
import Companion from "../Models/Companion.Model.js";
import Post from "../Models/Post.Model.js";
import path from 'path';
import fileUploader from "../Utils/cloudinary.js";
import axios from 'axios'
// import fs from "fs";
// import * as THREE from 'three';
// import { loadImage } from 'canvas'; 
// import { Jimp } from "jimp";
// import { JSDOM } from 'jsdom';
// import { fileURLToPath } from 'url';
// import cv from 'opencv4nodejs'
//  // Import Three.js
// import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'; // Import GLTFExporter

// const { window } = new JSDOM('<!doctype html><html><body></body></html>');
// global.document = window.document;
// global.window = window;
const saltroundes = 10;
// const nominatimUrl = 'https://nominatim.openstreetmap.org/search';

// const processGLB = async (inputPath, dimensions, outputPath) => {
//     return new Promise((resolve, reject) => {
//         const textureLoader = new THREE.TextureLoader();
//         textureLoader.load(inputPath, (texture) => {
//             const width = dimensions.width || 1;
//             const height = dimensions.height || 1;

//             const geometry = new THREE.PlaneGeometry(width, height);
//             const material = new THREE.MeshBasicMaterial({ map: texture });
//             const mesh = new THREE.Mesh(geometry, material);

//             const scene = new THREE.Scene();
//             scene.add(mesh);

//             const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
//             camera.position.z = 2;

//             const exporter = new GLTFExporter();
//             exporter.parse(scene, (result) => {
//                 const gltfJson = JSON.stringify(result, null, 2);
//                 fs.writeFileSync(outputPath, gltfJson);
//                 console.log(`GLTF file created at: ${outputPath}`);
//                 resolve();
//             }, { binary: false });
//         }, undefined, (error) => {
//             console.error('An error occurred while loading the texture:', error);
//             reject(error);
//         });
//     });
// };

async function generatebothtoken(userid) {
    try {
        const user = await User.findOne({ _id: userid });
        if (!user) {
            throw new Error("User not found");
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Error generating tokens");
    }
}

const register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("Back end start", username);
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Credentials not provided" });
        }
        const user = await User.findOne({ 
            $or: [
                { username },
                { email }
            ]
        });
        if (user) {
            console.log(user);
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedpassword = await bcrypt.hash(password, saltroundes);
        if (!hashedpassword) {
            return res.status(400).json({ message: "Password is not hashed" });
        }

        console.log("Hashed password", hashedpassword);

        const newUser = new User({
            username,
            password: hashedpassword,
            email
        });

        console.log("New user", newUser);

        const savedUser = await newUser.save();
        if (savedUser) {
            return res.status(201).json({ message: "User created successfully" });
        } else {
            return res.status(500).json({ message: "User not created" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const Login = async (req, res) => {
    const { loginname, password } = req.body;
    console.log(loginname, password);
    if ([loginname, password].some((field) => field?.trim() === "")) {
        return res.status(400).json({ message: "Enter the credentials" });
    }
    try {
        const user = await User.findOne({ $or: [{ username: loginname }, { email: loginname }] });
        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        console.log("User", user);

        const passwordCorrect = await user.isPasswordCorrect(password);
        if (!passwordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        console.log("Correct password");

        const { accessToken, refreshToken } = await generatebothtoken(user._id);
        const loggedinuser = await User.findById(user._id).select("-password");

        console.log("Access token:", accessToken);
        console.log("Refresh token:", refreshToken);
        console.log(loggedinuser);
        console.log("Login successful");

        res.cookie("accessToken", accessToken, { secure: true, httpOnly: true, sameSite: 'Strict' });
        res.cookie("refreshToken", refreshToken, { secure: true, httpOnly: true, sameSite: 'Strict' });
        res.status(200).json({ message: "Logged in successfully", accessToken, refreshToken, loggedinuser });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const userprofile = async (req, res) => {
    try {
        const { username } = req.query; 
        console.log(username)
        if (!username) {
            return res.status(400).json({ message: "No username found" });  }

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "No user found" });  }

        res.status(200).json({ message: "User found", user }); 
    } catch (error) {
        console.error('Error fetching user profile:', error); 
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getNearbyPlaces = async (req, res) => {
    const { location } = req.body;
    console.log(location);

    if (!location) {
        return res.status(400).json({ message: "Location is required" });
    }

    try {
        
        const response = await axios.get(nominatimUrl, {
            params: {
                q: location,
                format: 'json',
                limit: 10 ,
            }
        });

        const places = response.data;

        res.status(200).json(places);
    } catch (error) {
        console.error("Error fetching nearby places:", error);
        res.status(500).json({ message: "Error fetching nearby places" });
    }
};
const getuserbyid = async(req,res)=>{
    try {
        const {username} = req.body;
        if(!username){
            return res.status(500).json({message:"no username found to search"});

        }
        const user = await User.findOne({username:username});
        if(!user){
            return res.status(400).json({message:"no user found by username"})
        }
        console.log("user found",user);
        const userid = user._id;
        if(!userid){
            return res.status(404).Json({message:"no user id found while searching"})
        }
        return res.status(200).json({message:"usedid found,",userid})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"INternal server erroor"});
    }
}
const getcompanion=async(req,res)=>{
    console.log("comanioning")
    try {
        const {  locationToGo, transport, fromDate, toDate, user } = req.body;
        console.log(locationToGo)
        console.log(user);
        console.log(fromDate)
        console.log(toDate)
        console.log(transport)
    
        if ( !locationToGo || !transport || !fromDate || !toDate ) {
          return res.status(400).json({ success: false, message: 'All fields are required' });
        }

    
        const companion = new Companion({
          locationToGo,
          transport,
          fromDate,
          toDate,
          user: user
        });
        if(!companion){
        return res.status(400).json({message:"no companion created"})
        }
    
      await companion.save();
      console.log("companion saved")
    
        res.status(201).json({ success: true,message:"comapnion saved succesfullly"});
      } catch (error) {
        console.error('Error creating companion entry:', error);
        res.status(500).json({ success: false, message: 'Error creating companion entry' });
      }

}
const post = async (req, res) => {
    console.log("Posting...");
    try {
        const { title, description, location, userId } = req.body;
        const file = req.file; 
       console.log(file)
        if (!title || !description || !file || !userId) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const imagefile = await fileUploader(file.path); 
    
      
        const imageurl = imagefile.secure_url;

        const post = new Post({
            title,
            description,
            imageUrl: imageurl,
            location,
            user: userId
        });

       await post.save();
      console.log("post saved")
        res.status(201).json({ success: true});
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, message: 'Error creating post' });
    }
};
const allposts = async(req,res)=>{
    try {
        const posts = await Post.find()
        console.log(posts)
        if(!posts){
            return res.status(500).json({message:"no posts found"})
        }
        return res.status(200).json({message:"found found",posts})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"INternal server error"})
    }
}
const allcompanions = async( req,res)=>{
 try {
    const groups = await Companion.find();
    console.log(groups);
    if(!groups){
        return res.status(400).json({message:"no Groups found"})
    }
    return res.status(200).json({message:"the groups found",groups})
 } catch (error) {
    console.log(error);
    return res.status(500).json({message:'INternal server error'})
 }
}

const getplaces = async (req, res) => {
    try {
        const location = req.headers.location;
        if (!location) {
            return res.status(400).send("Location header is required");
        }

        console.log(`Location received: ${location}`);
        const coordinates = await getCoordinates(location);
        
        if (!coordinates) {
            return res.status(404).send("Coordinates not found for the provided location");
        }

        const latMin = parseFloat(coordinates.lat) - 0.1;
        const latMax = parseFloat(coordinates.lat) + 0.1;
        const lonMin = parseFloat(coordinates.lon) - 0.1;
        const lonMax = parseFloat(coordinates.lon) + 0.1;

        const overpassQuery = `[out:json];
            (
                node(${latMin},${lonMin},${latMax},${lonMax})[tourism];
                node(${latMin},${lonMin},${latMax},${lonMax})[historic];
                node(${latMin},${lonMin},${latMax},${lonMax})[leisure~"park|nature_reserve"];
                node(${latMin},${lonMin},${latMax},${lonMax})[amenity~"place_of_worship|theatre|cinema"];
            );
            out;`;

        const placesResponse = await axios.get('https://overpass-api.de/api/interpreter', {
            params: { data: overpassQuery },
            headers: {
                'User-Agent': 'TravelHub/1.0 (shivakandala@gmail.com)',
            }
        });

        const places = placesResponse.data.elements.map(element => ({
            name: element.tags.name || "Unknown",
            type: element.tags.tourism || element.tags.historic || element.tags.amenity,
            coordinates: {
                lat: element.lat,
                lon: element.lon
            },
            additional_info: {
                ...element.tags
            }
        }));

        res.json({ places });
    } catch (error) {
        console.error("Error retrieving places data:", error.message);
        res.status(500).send("Error retrieving places data");
    }
};

const getCoordinates = async (location) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: location,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'TravelHub/1.0 (shivakandala@gmail.com)',
            }
        });

        if (response.data.length === 0) {
            console.log("No places found for the specified location");
            return null;
        }

        const { lat, lon } = response.data[0];
        console.log("Coordinates found:", lat, lon);
        return { lat, lon };
    } catch (error) {
        console.error("Error retrieving coordinates:", error.message);
        return null;
    }
};
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//  const blueprintfile = async (req, res) => {
//     if (req.file) {
//         console.log('File uploaded:', req.file);

//         // Process the image with OpenCV
//         const imagePath = path.join(__dirname, req.file.path);
//         const image = await cv.imreadAsync(imagePath);

//         // Convert to grayscale for processing
//         const grayImage = image.bgrToGray();
//         const edges = grayImage.canny(100, 200);

//         // Find contours (could represent walls, doors, etc.)
//         const contours = edges.findContours(cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

//         // Analyze contours and create a basic representation for 3D model
//         const walls = contours.map(contour => {
//             const rect = contour.boundingRect();
//             return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
//         });

//         // Respond with processed data for the 3D model
//         res.status(200).json({ message: 'File uploaded successfully', walls });
//     } else {
//         res.status(400).json({ message: 'File upload failed' });
//     }
// };




export {allposts, Login, register,getNearbyPlaces,getcompanion,post, getuserbyid,allcompanions,getplaces,userprofile };
