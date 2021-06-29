import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

// Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Playlists from './components/Playlists/Playlists';
import PlaylistPage from './components/PlaylistPage/PlaylistPage';
// import Join from './components/Join/Join';
import Game from './components/Game/Game';
import { useEffect, useContext } from 'react';
import { DTBContext } from './contextAPI/DTBContext';

function App() {

  // USING useEffect & CONTEXT-API TO FETCH PLAYLISTS:
  const { playlist, playlists, setPlaylists } = useContext(DTBContext);
  useEffect(() => {
    let mounted = true;
    const fetchPlayLists = async () => {
      try {
        if (mounted) {
          // *** notice the "/" at the end!!!
          const baseURL = 'https://drop-the-beat-app.herokuapp.com';
          // const res = await axios({ method: 'GET', url: '/api/playlists' });
          const res = await axios({ method: 'GET', url: `${baseURL}/api/playlists` });
          setPlaylists(res.data);
        }
      } catch (e) {
        console.log(e);
      }
      return () => (mounted = false);
    };
    fetchPlayLists();
  }, [setPlaylists]);

  // Get currently selected playlist if it exists
  // const currentPlaylist = playLists.find((playlist) => playlist.playlistId === state.playlist);

  return (
    <Router>
      <div className='App'>
        {/* Navbar */}
        <Navbar />

        {/* Navigation Routes */}
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>

          <Route path='/playlists' exact>
            <Playlists playlists={playlists} />
          </Route>

          <Route path='/playlists/:id' exact>
            <PlaylistPage playlists={playlists} />
          </Route>

          {/* <Route path='/join' exact>
            <Join />
          </Route> */}

          <Route path='/game/:id' exact>
            {playlist ? (
              <Game playlist={playlist} />
            ) : (
              <Redirect to='/'>
                <Home />
              </Redirect>
            )}
          </Route>

          <Route path='*'>
            <h2>404 - Page Not Found</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
