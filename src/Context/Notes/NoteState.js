import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"
  let notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get All Notes

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setNotes(json);
  }

  //Add a Note 
  const addNote = async (title, description, tag) => {
    //TODO API 
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  }

  // Delete a Note 
  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    let newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // Edit a Note 
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();

    let newnotes = JSON.parse(JSON.stringify(notes));        // Cannot Update State Variable directly in React
    for (let index = 0; index < newnotes.length; index++) {
      if (newnotes[index]._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
    }
    setNotes(newnotes);
  }


  /*

  DEMO FOR USE STATE CONTEXT: 

  const s1 = {
      "name": "Harry"
  }
  const [state,setState] = useState(s1); 

  const update = () => {
      setTimeout(() => {
          setState({
              "name" : "Larry"
          })
      },1000);
  }
  return (
      <NoteContext.Provider value ={{state, update}}>
          {props.children}
      </NoteContext.Provider>
  )
  */

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;



