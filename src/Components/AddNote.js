import React, { useState, useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext';

function AddNote() {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const[note,setNote] = useState({title: "", description: "", tag: ""})
    const handleclick = (e) => {
        e.preventDefault();   // Page not reload 
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <div className="container my-2">
                <h2>Add Your Notes</h2>
                <form>
                    <div className="my-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="type" minLength={3} required className="form-control" value={note.title} id="title" name="title" onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="my-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" minLength={5} className="form-control"value={note.description}  onChange={onChange} id="description" name="description" />
                    </div>
                    <div className="my-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" value={note.tag} onChange={onChange} id="tag" name="tag" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>

        </>
    )
}

export default AddNote
