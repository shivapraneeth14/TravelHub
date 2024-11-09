import { Router } from "express";
import {allposts,getplaces,userprofile ,allcompanions, getuserbyid,Login,register,getNearbyPlaces,getcompanion,post } from "../Contollers/Usercontollers.js";
import upload from "../MIddleware/Mutlter.js";
const router = Router();

router.route("/register").post(register);
router.route("/login").post(Login); 
router.route('/nearby').post(getNearbyPlaces);
router.route("/getcompanion").post(getcompanion)
router.route("/addpost").post(upload.single('imageUrl'),post)
router.route("/getuserid").post( getuserbyid)
router.route("/allcompanion").post(allcompanions);
router.route("/allposts").post(allposts)
router.route("/getplaces").get(getplaces)
router.route("/userprofile").get(userprofile)

export default router;
