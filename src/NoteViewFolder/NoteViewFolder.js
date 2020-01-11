import React from 'react';
import Button from '../Button/Button';
import NotefulContext from '../NotefulContext';
import {findNote, findFolder} from '../notes-helpers';
import PropTypes from 'prop-types';
import './NoteViewFolder.css';

export default class NoteViewFolder extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }
    static contextType = NotefulContext;

    render() {
        const {notes, folders,} = this.context
        const {noteId} = this.props.match.params
        const note = findNote(notes, noteId) || {}
        const folder = findFolder(folders, note.folderId)
        return (
            <div className = 'noteViewFolder'>
                {/* <AddFolder /> */}
                <Button
                    button = 'button'
                    role = 'link'
                    onClick = {() => this.props.history.goBack()}
                    className = 'noteViewFolder-goBack'>
                    Go Back
                </Button>
                {folder && (
                    <h3 className = 'noteViewFolder-folderName'>
                        {folder.name}
                    </h3>
                )}
            </div>
        )
    }
}

NoteViewFolder.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
}