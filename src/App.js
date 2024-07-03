import React from 'react';
import LocationForm from './components/LocationForm';
import LocationList from './components/LocationList';

function App() {
  return (
    <div className="App">
      <h1>TRAVEL APP</h1>
      <LocationForm />
      <LocationList />
    </div>
  );
}

export default App;
