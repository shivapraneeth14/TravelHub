import { Router } from "express";
import { Login,register,getNearbyPlaces,getcompanion,post,getuserid } from "../Contollers/Usercontollers.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(Login); 
router.route('/nearby').post(getNearbyPlaces);
router.route("/getcompanion").post(getcompanion)
router.route("/addpost").post(post)
router.route("/getuserid").post(getuserid)

export default router;
