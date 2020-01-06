import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import NotesContext from '../NotesContext'

class NoteListMain extends React.Component {

  static contextType = NotesContext;

  /*
  function that takes an array of notes and filters them against the :folderId
  in the url if it exists, otherwise just return the entire notes array
  */
  getNotesForFolder = (notesArray) => {
    if (this.props.match.params.folderId) {
      return notesArray.filter((note) => {
        return note.folderId === this.props.match.params.folderId
      })
    }

    return notesArray
  }

  render() {

    const notes = this.getNotesForFolder(this.context.notes)

    return (
      <div className="Main">
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => {
            return (
              <Note modified={note.modified} key={note.id} id={note.id } name={note.name} />
            )
          })}
        </ul>
        <button>New Note</button>
      </div>
    );
  }
}

NoteListMain.defaultProps = {
  notes: []
}

export default NoteListMain;
