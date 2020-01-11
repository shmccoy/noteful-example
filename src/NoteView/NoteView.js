import React from 'react';
import Note from '../Note/Note';
import NotefulContext from '../NotefulContext';
import {findNote} from '../notes-helpers';
import PropTypes from 'prop-types';
import './NoteView.css'

export default class NoteView extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext

    handleDeleteNote = noteId => {
        this.props.history.push('/')
    }

    render() {
        const {notes = []} = this.context
        const {noteId} = this.props.match.params
        const note = findNote(notes, noteId) || {content: ''}
        return (
            <section className = 'noteView'>
                <Note 
                    id = {note.id}
                    name = {note.name}
                    modified = {note.modified}
                    onDeleteNote = {this.handleDeleteNote}
                />
                <div className='noteView-content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        )
    }
}

NoteView.propTypes = {
    match: PropTypes.object.isRequired
}