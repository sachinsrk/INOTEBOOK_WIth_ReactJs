import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom'

function Note(props) {
    let navigate = useNavigate();
    const ref = useRef(null)
    const refCl = useRef(null)
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNote()
        // eslint-disable-next-line
        }
        else{
            navigate('/login')
        }
    }, [])
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({id:currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
      
    }
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "default" })

    const handleClick = (e) => {
        e.preventDefault();
       
        editNote(note.id,note.etitle,note.edescription,note.etag)
        refCl.current.click();
        props.showAlert("Updated  Succesfully","success")
       
        

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }
  

    return (
        <>
            <Addnote  showAlert={props.showAlert}/>
            <button type="button" className="btn btn-primary visually-hidden" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="title" className="form-control" id="title" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}  minLength={5} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="description" className="form-control" id="description" value={note.edescription} name='edescription' onChange={onChange} minLength={5} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">tag</label>
                                <input type="tag" className="form-control" id="tag" name='etag' value={note.etag} onChange={onChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refCl} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5}  onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">

                <h2>Your Note</h2>
                <div className="container mx-2">
                {notes.length===0 && "No Note to Display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Note
