import React, { useState } from 'react';
import FoodTable from './tables/FoodTable'
import AddForm from './forms/AddForm'
import EditForm from './forms/EditForm'
import VizComponent from './components/VizComponent'

const App = () => {
  const foodData = [
    {id: 1, date: "2020-08-09", description: "Popeyes", spending: 12.11},
    {id: 2, date: "2020-08-12", description: "Jersey Mikes", spending: 11.22},
    {id: 3, date: "2020-08-14", description: "Chick-fil-A", spending: 11.75},
    {id: 4, date: "2020-08-15", description: "Chick-fil-A", spending: 21.75},
    {id: 5, date: "2020-08-16", description: "Chick-fil-A", spending: 31.75},
    {id: 6, date: "2020-08-17", description: "Chick-fil-A", spending: 11.75},
    {id: 7, date: "2020-08-18", description: "Chick-fil-A", spending: 1.75},
    {id: 8, date: "2020-08-19", description: "Chick-fil-A", spending: 21.75}
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
      <VizComponent foods={foods} />
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