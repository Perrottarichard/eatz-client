import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/signup' component={SignUp} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
