import React, { Fragment, useState } from 'react'
import Header from './components/Header'
import Chart from './components/Chart'
import AddForm from './components/AddForm'
import SpendingsTable from './components/SpendingsTable'

const App = () => {
  // database
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
  // Format Date
  const month = () => {
    return ("0" + (new Date().getMonth() + 1)).slice(-2)
  }
  const date = () => {
    return ("0" + new Date().getDate()).slice(-2)
  }
  const year = new Date().getFullYear()
  const today = `${year}-${month()}-${date()}`

  // state management
  const initialFormState = { id: null, date: today, description: ``, amount: `` }
  
  // TODO: 'spendings' need to come from a database, This will need axios.get
  const [spendings, setSpendings] = useState(financialData)
  // 'addEntry' for AddForm
  const [addEntry, setAddEntry] = useState(initialFormState)
  // 'currentEntry' for EditForm
  const [editEntry, setEditEntry] = useState(initialFormState)

  // functions
  const addSpending = (entry) => {
    entry.id = spendings.length + 1
    setSpendings([...spendings, entry])
    // TODO: 'spending' comes from financial data.  This will need axios.put
  }
  
  const handleEditEntry = (editEntry) => {
    setEditEntry({ id: editEntry.id, date: editEntry.date, description: editEntry.description, amount: editEntry.amount })
  }
  const updateEntry = (id, updatedEntry) => {
    // console.log('coming from editForm line 84 --- "editEntry.Id, editEntry"')
    // console.log(id)
    // console.log(updatedEntry)
    
    setSpendings(spendings.map( entry => entry.id === id ? updatedEntry : entry ))
    // TODO: 'spendings' comes from financial data.  This will need axios.put
  }
  const deleteEntry = (id) => {
    // console.log('coming from SpendingsTable line 29 --- "spendingInfo.Id"')
    // console.log(id)

    setSpendings(spendings.filter( entry => entry.id !== id ))
    // TODO: 'spendings' comes from financial data.  This will need an axios.delete
  }

  return (
    <Fragment>
      <Header/>
      <Chart 
        spendings={spendings}
      />
      <AddForm
        addSpending={addSpending}
        initialFormState={initialFormState}
        addEntry={addEntry}
        setAddEntry={setAddEntry}
      />
      <SpendingsTable
        spendings={spendings}
        deleteEntry={deleteEntry}
        editEntry={editEntry}
        setEditEntry={setEditEntry}
        updateEntry={updateEntry}
        handleEditEntry={handleEditEntry}
      />
    </Fragment>
  );
}

export default App;