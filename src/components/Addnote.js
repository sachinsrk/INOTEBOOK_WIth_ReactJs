import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

function Addnote() {
    const context =useContext(noteContext);
    const {addNote} = context;


    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description,note.tag);
        setNote({ title: "", description: "", tag: "" })
    }
    const onChange =(e) =>{
        setNote({...note,[e.target.name]:e.target.value})

    }
  return (
    <>
    <div className='container my-3'>
        <h2>Add Notes</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="title" className="form-control" id="title"  value={note.title} name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="description" className="form-control" value={note.description} id="description" name='description' onChange={onChange}  minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="tag" className="form-control" value={note.tag} id="tag" name='tag' onChange={onChange} />
          </div>
       
          <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </>
  )
}

export default Addnote
