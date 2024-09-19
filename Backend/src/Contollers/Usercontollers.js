import User from "../Models/User.model.js";
import bcrypt from 'bcrypt';
import Companion from "../Models/Companion.Model.js";
import Post from "../Models/Post.Model.js";

const saltroundes = 10;
const nominatimUrl = 'https://nominatim.openstreetmap.org/search';

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
                limit: 10 
            }
        });

        const places = response.data;

        res.status(200).json(places);
    } catch (error) {
        console.error("Error fetching nearby places:", error);
        res.status(500).json({ message: "Error fetching nearby places" });
    }
};

const getcompanion=async(req,res)=>{
    console.log("comanioning")
    try {
        const {  locationToGo, transport, fromDate, toDate, userId } = req.body;
        console.log(locationToGo)
        
    
        if ( !locationToGo || !transport || !fromDate || !toDate ) {
          return res.status(400).json({ success: false, message: 'All fields are required' });
        }
    
        const companion = new Companion({
          locationToGo,
          transport,
          fromDate,
          toDate,
          user: userId
        });
        if(!companion){
        return res.status(400).json({message:"no companion created"})
        }
    
        const savedCompanion = await companion.save();
    
        res.status(201).json({ success: true, companion: savedCompanion });
      } catch (error) {
        console.error('Error creating companion entry:', error);
        res.status(500).json({ success: false, message: 'Error creating companion entry' });
      }

}
const post= async(req,res)=>{
    console.log("posting")
    try {
        const { title, description, imageUrl, location, userId } = req.body;
    
        if (!title || !description || !imageUrl || !location || !userId) {
          return res.status(400).json({ success: false, message: 'All fields are required' });
        }
    
        const post = new Post({
          title,
          description,
          image: {
            url: imageUrl,
            location  
          },
          user: userId
        });
    
        const savedPost = await post.save();
    
        res.status(201).json({ success: true, post: savedPost });
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, message: 'Error creating post' });
      }
}
const getuserid = async (req, res) => {
    console.log("Request received with body:", req.body); 
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ message: "No username provided to get ID" });
    }

    try {
        const user = await User.findOne({ username });
        console.log("User found:", user);

        if (!user) {
            return res.status(400).json({ message: "No user found with the provided username" });
        }

        const userId = user._id;
        if(!userId){
            return res.status(400).json({message:"no user ID found"})
        }
        
        console.log(userId)
        return res.status(200).json({ message: "User ID fetched successfully", userId });
    } catch (error) {
        console.error("Internal server error:", error);
        return res.status(500).json({ message: "Unable to fetch the user ID" });
    }
}
export { Login, register,getNearbyPlaces,getcompanion,post,getuserid };
