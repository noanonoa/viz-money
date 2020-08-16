import React, { useState } from 'react';
import FoodTable from './tables/FoodTable'
import AddForm from './forms/AddForm'

const App = () => {
  const foodData = [
    {id: 1, date: '8/9/2020', description: 'Popeyes', spending: 12.11},
    {id: 2, date: '8/12/2020', description: 'Jersey Mikes', spending: 11.22},
    {id: 3, date: '8/14/2020', description: 'Chick-fil-A', spending: 21.75}
  ]

  const [foods, setFoods] = useState(foodData)

  const addEntry = (entry) => {
    entry.id = foods.length + 1
    setFoods([...foods, entry])
  }
  const deleteEntry = (id) => {
    setFoods(foods.filter( entry => entry.id !== id ))
  }

  return (
    <div className="container">
      <h1>Viz-Money</h1>
      <div className="flex-parent">
        <div>
          <AddForm addEntry={addEntry} />
        </div>
        <div className="flex-child1">
          <h2>Food</h2>
        </div>
        <div className="flex-child2">
          <FoodTable foods={foods} deleteEntry={deleteEntry} />
        </div>
      </div>
    </div>
  );
}

export default App;