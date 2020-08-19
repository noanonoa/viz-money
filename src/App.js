import React, { useState } from 'react';
import ExpenditureTable from './tables/ExpenditureTable'
import AddForm from './forms/AddForm'
import EditForm from './forms/EditForm'
import VizComponent from './components/VizComponent'

const App = () => {
  const financialData = [
    {id: 1, date: "2020-08-01", description: "Costco & Whole Foods", spending: 267.03},
    {id: 2, date: "2020-08-02", description: "Maria's Kitchen", spending: 20.00},
    {id: 3, date: "2020-08-03", description: "Airpods & Watering Can", spending: 270.45},
    {id: 4, date: "2020-08-04", description: "Target, Chipotle, Abreva & Boba", spending: 50.69},
    {id: 5, date: "2020-08-05", description: "Chipotle & Boba", spending: 31.02},
    {id: 6, date: "2020-08-06", description: "Whole Foods & Trader Joe's", spending: 52.22},
    {id: 7, date: "2020-08-07", description: "Boba", spending: 9.00},
    {id: 8, date: "2020-08-08", description: "El Zarape & Gas", spending: 66.01},
    {id: 9, date: "2020-08-09", description: "Boba, Alkaline Water & Popeyes", spending: 29.11},
    {id: 10, date: "2020-08-10", description: "Whole Foods & Quarters", spending: 76.52},
    {id: 11, date: "2020-08-12", description: "Raffi's Gift to Parents & Jersey Mike's", spending: 62.22},
    {id: 12, date: "2020-08-13", description: "Tender Greens", spending: 24.00},
    {id: 13, date: "2020-08-14", description: "Boba, Chick-fil-A & Nail Polish", spending: 48.30},
    {id: 14, date: "2020-08-15", description: "Trader Joe's, H Mart & Whole Foods", spending: 115.08},
    {id: 15, date: "2020-08-16", description: "Gas", spending: 20.00},
    {id: 16, date: "2020-08-17", description: "Haircut", spending: 115.00}
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
      <div>
        {editing ? (
          <div className="entry-form">
            <h2 className="sub-heading">Edit Entry</h2>
            <EditForm 
              setEditing={setEditing}
              currentEntry={currentEntry}
              updateEntry={updateEntry}
            />
          </div>
        ) : (
          <div className="entry-form">
            <h2 className="sub-heading">Add Entry</h2>
            <AddForm addEntry={addEntry} />
          </div>
        )}
        <div className="flex-child1">
          <h2 className="expenditure-heading">Expenditure</h2>
        </div>
        <div className="flex-child2">
          <ExpenditureTable spendings={spendings} deleteEntry={deleteEntry} editEntry={editEntry} />
        </div>
      </div>
    </div>
  );
}

export default App;