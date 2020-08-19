import React, { useState } from 'react';
import ExpenditureTable from './tables/ExpenditureTable'
import AddForm from './forms/AddForm'
import EditForm from './forms/EditForm'
import VizComponent from './components/VizComponent'

const App = () => {
  const financialData = [
    {id: 1, date: "2020-08-09", description: "Popeyes", spending: 12.11},
    {id: 2, date: "2020-08-12", description: "Jersey Mikes", spending: 11.22},
    {id: 3, date: "2020-08-14", description: "Chick-fil-A", spending: 11.75},
    {id: 4, date: "2020-08-15", description: "Whole Foods", spending: 21.75},
    {id: 5, date: "2020-08-16", description: "Trader Joe's", spending: 31.75},
    {id: 6, date: "2020-08-17", description: "In N Out", spending: 11.75},
    {id: 7, date: "2020-08-18", description: "Chick-Fil-A", spending: 1.75},
    {id: 8, date: "2020-08-19", description: "Tender Greens", spending: 21.75}
  ]

  const [spendings, setSpendings] = useState(financialData)
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, date: ``, description: ``, spending: `` }
  const [currentEntry, setCurrentEntry] = useState(initialFormState)

  const addEntry = (entry) => {
    entry.id = spendings.length + 1
    setSpendings([...spendings, entry])
  }
  const editEntry = (entry) => {
    setEditing(true)

    setCurrentEntry({ id: entry.id, date: entry.date, description: entry.description, spending: entry.spending })
  }
  const updateEntry = (id, updatedEntry) => {
    setEditing(false)

    setSpendings(spendings.map( entry => entry.id === id ? updatedEntry : entry ))
  }
  const deleteEntry = (id) => {
    setEditing(false)

    setSpendings(spendings.filter( entry => entry.id !== id ))
  }

  return (
    <div className="container">
      <h1>Viz-Money</h1>
      <VizComponent spendings={spendings} />
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
          <h2>Expenditure</h2>
        </div>
        <div className="flex-child2">
          <ExpenditureTable spendings={spendings} deleteEntry={deleteEntry} editEntry={editEntry} />
        </div>
      </div>
    </div>
  );
}

export default App;