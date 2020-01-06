import React from 'react';
import './App.css';
import STORE from './dummyStore'
import NoteListNav from './NoteListNav/NoteListNav'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePageMain from './NotePageMain/NotePageMain'
import NotePageNav from './NotePageNav/NotePageNav'
import { Route, Switch, Link } from 'react-router-dom';
import NotesContext from './NotesContext'


class App extends React.Component {
  state = STORE
  render() {

    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders
    }

    return (
      <div className="App">
        <NotesContext.Provider value={contextValue}>
          <header className="App-header">
            <h1><Link to={'/'}>Noteful</Link></h1>
          </header>

          <aside>
            {/* Show/hide components in SIDEBAR section based on route */}
            {/* Main Route */}
            <Route
              exact
              path='/'
              component={NoteListNav}
            />
            {/* Folder Route */}
            <Route
              exact
              path='/folders/:folderId' //:folderId will be the id of the folder in the url - for example localhost:3000/folders/kjdsh1234321ikdw
              component={NoteListNav}
            />
            {/* Note Route */}
            <Route
              exact
              path='/notes/:noteId'
              component={NotePageNav}
            />
          </aside>


          <main>
            {/* Show/hide components in 'MAIN' section based on route */}
            {/* Main Route */}
            <Route
              exact
              path='/'
              component={NoteListMain}
            />
            {/* Folder Route */}
            <Route
              exact
              path='/folders/:folderId' //:folderId will be the id of the folder in the url - for example localhost:3000/folders/kjdsh1234321ikdw
              component={NoteListMain}
            />
            {/* Note Route */}
            <Route
              exact
              path='/notes/:noteId'
              component={NotePageMain}
            />
          </main>
        </NotesContext.Provider>
      </div>
    );
  }
}

export default App;
