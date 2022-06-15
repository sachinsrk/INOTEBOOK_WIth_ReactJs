const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE:1 Get login user detail: Post "/api/auth/getuser". login require
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const note = await Note.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Eternal Server Error Occured");
  }
});

//ROUTE:2 Add a new Note using: Post "/api/auth/addnote". login require
router.post( "/addnote",fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 charcters").isLength({ min: 5,}),
  ],
  async (req, res) => {
    try {
        const {title,description,tag} = req.body
      const errors = validationResult(req);
      //if there are error return bad request
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Eternal Server Error Occured");
    }
  }
);

//ROUTE:3 Update exixting note: Put "/api/auth/addnote". login require and update his own  note
router.put( "/updatenote/:id",fetchuser,
  async (req, res) => {
    try {
        // get body json
        const {title,description,tag} = req.body
        // create a new note
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //check whether note belong to same use3r or not and 
        //also check note exit or not
         let note =await Note.findById(req.params.id);
         if(!note){
          return  res.status(404).send("Note Found")
         }
         if(note.user.toString() !== req.user.id){
            return res.status().send("Unauthorize Access")
         }        

        // find the  note to be updated and update it
         note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
         res.json({note});

    //   res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Eternal Server Error Occured");
    }
  }
);
//ROUTE:4 Delete exixting note: delete "/api/auth/deletenote". login require and delete his own  note
router.delete( "/deletenote/:id",fetchuser,
  async (req, res) => {
    try {
       
        //check whether note belong to same use3r or not and 
        //also check note exit or not
         let note =await Note.findById(req.params.id);
         if(!note){
          return  res.status(404).send("Note Found")
         }
         if(note.user.toString() !== req.user.id){
            return res.status().send("Unauthorize Access")
         }        

        // find the  note to be delete and delete it
         note = await Note.findByIdAndDelete(req.params.id)
         res.json("Deleted succesfully");

    //   res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Eternal Server Error Occured");
    }
  }
);

module.exports = router;
