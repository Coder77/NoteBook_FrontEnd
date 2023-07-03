import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

function Notes() {

    const context = useContext(NoteContext);
    const { notes, getNotes, editNote} = context;
    let history=useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')) {
            getNotes();
        }
        else {
            history("/login");
        }
        // eslint-disable-next-line
    }, []);
    const refer = useRef(null);
    const ref = useRef(null);
    const[note,setNote] = useState({id: "", etitle: "", edescription: "", etag: "General"})

    const updateNote = (currentNote) => {
        refer.current.click();  
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }
    const handleclick = (e) => {

        ref.current.click();
        // e.preventDefault();   // Page not reload 
        editNote(note.id,note.etitle, note.edescription, note.etag);
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <>
            <AddNote />
            <button type="button" ref={refer} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                            <form>
                                <div className="my-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="type" minLength={3} required className="form-control" value={note.etitle} id="etitle" name="etitle" onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="my-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" minLength={5} required className="form-control" value ={note.edescription} onChange={onChange} id="edescription" name="edescription" />
                                </div>
                                <div className="my-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} onChange={onChange} id="etag" name="etag" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={ref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <h2>View Your Notes</h2>
                <div className="container"> {notes.length===0 && 'No notes to display'}</div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>

        </>
    )
}

export default Notes
