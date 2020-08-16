import React from 'react';
import FoodTable from './tables/FoodTable'

const App = () => {
  return (
    <div className="container">
      <h1>Viz-Money</h1>
      <div className="flex-parent">
        <div className="flex-child1">
          <h2>Food</h2>
        </div>
        <div className="flex-child2">
          <FoodTable />
        </div>
      </div>
    </div>
  );
}

export default App;