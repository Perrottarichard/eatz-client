import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/'>
            <LandingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
