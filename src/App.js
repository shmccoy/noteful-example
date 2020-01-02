import React from 'react';
import './App.css';
import STORE from './dummyStore'
import NoteListNav from './NoteListNav/NoteListNav'
import NoteListMain from './NoteListMain/NoteListMain'
import NotePageMain from './NotePageMain/NotePageMain'
import NotePageNav from './NotePageNav/NotePageNav'
import { Route, Switch, Link } from 'react-router-dom';


class App extends React.Component {
  state = STORE
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1><Link to={'/'}>Noteful</Link></h1>
        </header>

        <aside>
          {/* Show/hide components in sidebar section based on route */}
          {/* Main Route */}
          <Route
            exact
            path='/'
            render={() =>
              <NoteListNav folders={this.state.folders} />
            }
          />
          {/* Folder Route */}
          <Route
            exact
            path='/folders/:folderId'
            render={(props) =>
              <NoteListNav folders={this.state.folders} selected={props.match.params.folderId} />
            }
          />
          {/* Note Route */}
          <Route
            exact
            path='/notes/:noteId'
            render={(props) => {

              const selectedFolderId = this.state.notes.filter(
                note => note.id === props.match.params.noteId
              )[0].folderId

              return (
                <NotePageNav
                  {...this.state.folders.filter(
                    folder => folder.id === selectedFolderId
                  )[0]}
                />
              )
            }}
          />
        </aside>


        <main>
          {/* Show/hide components in 'main' section based on route */}
          {/* Main Route */}
          <Route
            exact
            path='/'
            render={() =>
              <NoteListMain notes={this.state.notes} />
            }
          />
          {/* Folder Route */}
          <Route
            exact
            path='/folders/:folderId'
            render={(props) => {
              return (
                <NoteListMain
                  notes={this.state.notes.filter(
                    note => note.folderId === props.match.params.folderId
                  )}
                />
              )
            }}
          />
          {/* Note Route */}
          <Route
            exact
            path='/notes/:noteId'
            render={(props) => {
              return (
                <NotePageMain
                  {...this.state.notes.find(
                    note => note.id === props.match.params.noteId
                  )}
                />
              )
            }}
          />
        </main>
      </div>
    );
  }
}

export default App;
