import React from 'react';
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashMui from './pages/DashMui'
import SignUp from './pages/SignUp'

function App() {

  const user = useSelector(state => state.activeUser.user)

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/signup' component={SignUp} />
          <Route path='/dashboard'>
            {!user ? <Redirect to='/' />
              :
              <div>
                <DashMui user={user} />
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
