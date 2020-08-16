import React, { useState } from 'react';
import FoodTable from './tables/FoodTable'
import AddForm from './forms/AddForm'
import EditForm from './forms/EditForm'

const App = () => {
  const foodData = [
    {id: 1, date: '8/9/2020', description: 'Popeyes', spending: 12.11},
    {id: 2, date: '8/12/2020', description: 'Jersey Mikes', spending: 11.22},
    {id: 3, date: '8/14/2020', description: 'Chick-fil-A', spending: 21.75}
  ]

  const [foods, setFoods] = useState(foodData)
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, date: ``, description: ``, spending: `` }
  const [currentEntry, setCurrentEntry] = useState(initialFormState)

  const addEntry = (entry) => {
    entry.id = foods.length + 1
    setFoods([...foods, entry])
  }
  const editEntry = (entry) => {
    setEditing(true)

    setCurrentEntry({ id: entry.id, date: entry.date, description: entry.description, spending: entry.spending })
  }
  const updateEntry = (id, updatedEntry) => {
    setEditing(false)

    setFoods(foods.map( entry => entry.id === id ? updatedEntry : entry ))
  }
  const deleteEntry = (id) => {
    setEditing(false)

    setFoods(foods.filter( entry => entry.id !== id ))
  }

  return (
    <div className="container">
      <h1>Viz-Money</h1>
      <div className="flex-parent">
        {editing ? (
          <div>
            <h2>Edit Entry</h2>
            <EditForm 
              setEditing={setEditing}
              currentEntry={currentEntry}
              updateEntry={updateEntry}
            />
          </div>
        ) : (
          <div>
            <h2>Add Entry</h2>
            <AddForm addEntry={addEntry} />
          </div>
        )}
        <div className="flex-child1">
          <h2>Food</h2>
        </div>
        <div className="flex-child2">
          <FoodTable foods={foods} deleteEntry={deleteEntry} editEntry={editEntry} />
        </div>
      </div>
    </div>
  );
}

export default App;