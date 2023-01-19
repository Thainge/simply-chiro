import React from 'react';
import { HashRouter as Router } from 'react-router-dom'
import { InputProvider } from './Context/contextProvider';
import RouterComponent from './Components/router';

function App() {
  return (
    <div>
      <InputProvider>
        <Router basename={''}>
          <RouterComponent />
        </Router>
      </InputProvider>
    </div>
  );
}

export default App;