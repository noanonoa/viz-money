import React, { Fragment, useState } from 'react'
import Header from './components/Header'
import Chart from './components/Chart'
import SpendingsTable from './components/SpendingsTable'
import InputForm from './components/InputForm'
import EditForm from './components/EditForm'

const App = () => {
  const financialData = [
    {id: 1, date: "2020-08-01", description: "Costco & Whole Foods", amount: 267.03},
    {id: 2, date: "2020-08-02", description: "Maria's Kitchen", amount: 20.00},
    {id: 3, date: "2020-08-03", description: "Airpods & Watering Can", amount: 270.45},
    {id: 4, date: "2020-08-04", description: "Target, Chipotle, Abreva & Boba", amount: 50.69},
    {id: 5, date: "2020-08-05", description: "Chipotle & Boba", amount: 31.02},
    {id: 6, date: "2020-08-06", description: "Whole Foods & Trader Joe's", amount: 52.22},
    {id: 7, date: "2020-08-07", description: "Boba", amount: 9.00},
    {id: 8, date: "2020-08-08", description: "El Zarape & Gas", amount: 66.01},
    {id: 9, date: "2020-08-09", description: "Boba, Alkaline Water & Popeyes", amount: 29.11},
    {id: 10, date: "2020-08-10", description: "Whole Foods & Quarters", amount: 76.52},
    {id: 11, date: "2020-08-12", description: "Raffi's Gift to Parents & Jersey Mike's", amount: 62.22},
    {id: 12, date: "2020-08-13", description: "Tender Greens", amount: 24.00},
    {id: 13, date: "2020-08-14", description: "Boba, Chick-fil-A & Nail Polish", amount: 48.30},
    {id: 14, date: "2020-08-15", description: "Trader Joe's, H Mart & Whole Foods", amount: 115.08},
    {id: 15, date: "2020-08-16", description: "Gas", amount: 20.00},
    {id: 16, date: "2020-08-17", description: "Haircut", amount: 115.00}
  ]

  const [spendings, setSpendings] = useState(financialData)
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, date: ``, description: ``, amount: `` }
  const [currentEntry, setCurrentEntry] = useState(initialFormState)

  const addEntry = (entry) => {
    entry.id = spendings.length + 1
    setSpendings([...spendings, entry])
    console.log(entry)
    console.log(entry.id)
  }
  const editEntry = (entry) => {
    setEditing(true)

    setCurrentEntry({ id: entry.id, date: entry.date, description: entry.description, amount: entry.amount })
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
    <Fragment>
      <Header/>
      <Chart spendings={spendings} />
      {editing ? (
        <EditForm 
          setEditing={setEditing}
          currentEntry={currentEntry}
          updateEntry={updateEntry}
        />
      ) : (
        <InputForm addEntry={addEntry} />
      )}
      <SpendingsTable spendings={spendings} deleteEntry={deleteEntry} editEntry={editEntry} />
    </Fragment>
  );
}

export default App;