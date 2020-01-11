import React from 'react';
import {Route} from 'react-router-dom';
import NoteViewFolder from '../NoteViewFolder/NoteViewFolder';
import NoteView from '../NoteView/NoteView';
import NoteList from '../NoteList/NoteList';
import NoteListFolder from '../NoteListFolder/NoteListFolder';
import Header from '../Header/Header';
import NotefulContext from '../NotefulContext';
import config from '../config';
import AddNote from '../AddNote/AddNote';
import AddFolder from '../AddFolder/AddFolder';
import '../App/App.css';

class App extends React.Component {
  state = {
    notes: [],
    folders: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/folders`),
      fetch(`${config.API_ENDPOINT}/notes`)
    ])
      .then(([foldersRes, notesRes]) => {
        if(!notesRes.ok)
          return notesRes.json().then(e => Promise.reject(e));
        if(!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));
        
          return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({notes, folders});
      })
      .catch(error => {
        console.error({error});
      });       
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  addNote = note => {
    this.setState({
      notes: [ ...this.state.notes, note ],
    });
  }

  addFolder = folder => {
    this.setState({
      folders: [ ...this.state.folders, folder],
    });
  }

  // handleDeleteFolder = folderId => {
  //   this.setState({
  //     folders: this.state.folders.filter(folder => folder.id !== folderId)
  //   });
  // }

  renderFolderRoutes() {
    const {notes, folders} = this.state;
    console.log(notes);
    console.log(folders);
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route
            exact 
            key = {path}
            path = {path}
            component = {NoteListFolder}
          />
        ))}
        <Route
          path = '/note/:noteId'
          component = {NoteViewFolder}
        />
        <Route 
          path = '/add-folder' 
          component = {NoteViewFolder} 
        />
        <Route 
          path = '/add-note' 
          component = {NoteViewFolder} 
        />
      </>
    );
  }

  renderNoteRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key = {path}
                        path = {path}
                        component = {NoteList}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    component = {NoteView}
                />
                <Route 
                  path = '/add-folder' 
                  component = {AddFolder} 
                />
                <Route 
                  path = '/add-note' 
                  component = {AddNote}
                />
            </>
        );
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder
      // deleteFolder: this.deleteFolder
    };
    return(
      <NotefulContext.Provider value = {contextValue}>
        <div className = 'App'>
          <nav 
            className = 'folderNav'>
            {this.renderFolderRoutes()}
          </nav>
          <Header />
          <main 
            className = 'seeNotes'>
            {this.renderNoteRoutes()}
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}

export default App;