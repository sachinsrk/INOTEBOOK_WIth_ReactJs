import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host ="http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    //Add Note
    const getNote = async () => {
        console.log("fetch");
         //ApiCall
         const response = await fetch(`${host}/api/note/fetchallnotes`, {
            method: 'GET',
            headers: {
                'auth-token':localStorage.getItem('token')
            }
        });
        const json = await response.json()
    
        setNotes(json)
    }

    //Add Note
    const addNote = async (title, description, tag) => {
        console.log("Adding A new note");
         //ApiCall
         const data={
            'title':title,
            'description':description,
            'tag':tag
         }
         const response = await fetch(`${host}/api/note/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });

        const note = await response.json();
        setNotes(notes.concat(note))
    }

    //Delete Note
    const deleteNote = async (id) => {
         //ApiCall

         const response = await fetch(`${host}/api/note/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
       
    }

    //Edit Note
    const editNote = async (id, title, description, tag) => {
        //ApiCall

        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag})
        });

   
        //new note for fEND update
        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
           
        }
        setNotes(newNotes)
    }
    


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNote }}>
            {props.children}
        </NoteContext.Provider>
    )


}

export default NoteState;