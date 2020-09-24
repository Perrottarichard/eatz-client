import React from 'react';
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard'

function App() {

  const user = useSelector(state => state.activeUser.user)

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/dashboard'>
            {!user ? <Redirect to='/' />
              :
              <div>
                <Navbar />
                <Dashboard user={user} />
              </div>
            }
          </Route>
          <Route exact path='/'>
            {user ? <Redirect to='/dashboard' />
              :
              <LandingPage />
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
