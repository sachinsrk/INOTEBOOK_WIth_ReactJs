const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
//Bycript pass
//JWT client safety
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_Secret ='good$dayone'

//ROUTE:1 create a user using: Post "/api/auth/createuser". no login require
router.post( "/createuser",
  [
    body("name","name can not be null or less than 3 charcter").isLength({ min: 3 }),
    body("email","Email has to be valid ").isEmail(),
    body("password","password can not be null or less than 5 charcter").isLength({ min: 5 }),
  ],
 async (req, res) => {
    let success = false;
    //if there are error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
          //check whether the user exit already 
        let user = await User.findOne({email: req.body.email});
          if(user){
              return res.status(400).json({error: "Sorry a user with this email is alerady exit"})
          }
          // bycrypt password
          const salt = await bcrypt.genSalt(10);
        const  secPass = await bcrypt.hash(req.body.password, salt);
        user =  await User.create({
              name: req.body.name,
              email: req.body.email,
              password: secPass,
            })
          //   .then(user => res.json(user))
          //   .catch(err=>{console.log(err)
          //     res.json({error: 'Please enter unique value for email'})
          // })
          const data={
            user:{
              id: user.id
            }
          }
          //JWT  METHOD
          success= true;
          const authToken = jwt.sign(data, JWT_Secret);
          //sending response
          res.json({success,authToken})
          // const user = User(req.body);
          // user.save();
    }catch(error){
      console.error(error.message);
      res.status(500).send("Some Error Occured")
    }
 
  }
);

//ROUTE:2 Authenticate a user using: Post "/api/auth/login". no login require
router.post( "/login",
  [
    body("email","Email has to be valid ").isEmail(),
    body("password","password can not be null").exists(),
  ],
  async (req, res) => {
   let success=false;
    //if there are error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{email,password} = req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }

      const passwordComp = await bcrypt.compare(password, user.password)
      if(!passwordComp){
        return res.status(400).json({error:"Please try to login with correct credentials"});
        
      }

      const data={
        user:{
          id: user.id
        }
      }
      //JWT  METHOD
      const authToken = jwt.sign(data, JWT_Secret);
      //sending response
      success=true;
      res.json({success,authToken})
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Eternal Server Error Occured")
    }





  }
)

//ROUTE:3 Get login user detail: Post "/api/auth/getuser". login require
router.post( "/getuser", fetchuser , async (req, res) => {
        try{
              userId = req.user.id;
              const user = await User.findById(userId).select("-password")
              res.send(user)
            } catch (error) {
              console.error(error.message);
              res.status(500).send("Eternal Server Error Occured")
            }
  }
)


module.exports = router;