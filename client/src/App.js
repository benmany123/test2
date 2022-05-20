import React from 'react';
import Header from './components/headers/Header'
import MainPages from './components/mainpages/Pages'
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
