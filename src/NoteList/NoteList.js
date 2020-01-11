import React from 'react';
import {Link} from 'react-router-dom';
import Note from '../Note/Note';
import Button from '../Button/Button';
import NotefulContext from '../NotefulContext';
import {getNotesForFolder} from '../notes-helpers';
import PropTypes from 'prop-types';
import './NoteList.css';

export default class NoteList extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext

    render() {
        const {folderId} = this.props.match.params
        const {notes = []} = this.context
        const notesForFolder = getNotesForFolder(notes, folderId)
        return (
            <section className = 'noteList'>
                <ul className = 'noteListUl'>
                    {notesForFolder.map(note =>
                        <li key = {note.id}>
                            <Note
                                id = {note.id}
                                name = {note.name}
                                modified = {note.modified}/>
                        </li>
                    )}
                </ul>
                <div className = 'noteList-buttonBox'>
                    <Button 
                        button = {Link}
                        to = '/add-note'
                        type = 'button'
                        className = 'noteList-addNote'>
                            Add note
                    </Button>
                </div>
            </section>
        )
    }
}

NoteList.propTypes = {
    match: PropTypes.object.isRequired
};