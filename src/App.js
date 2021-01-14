import React, { Fragment, useState, useEffect } from 'react'
import Header from './components/Header'
import Chart from './components/Chart'
import AddForm from './components/AddForm'
import SpendingsTable from './components/SpendingsTable'
import axios from 'axios'

//TODO: add Budget component

const App = () => {
  // database
  // const financialData = [
  //   {id: 1, date: "2020-08-01", description: "Costco & Whole Foods", amount: 267.03},
  //   {id: 2, date: "2020-08-02", description: "Maria's Kitchen", amount: 20.00},
  //   {id: 3, date: "2020-08-03", description: "Airpods & Watering Can", amount: 270.45},
  //   {id: 4, date: "2020-08-04", description: "Target, Chipotle, Abreva & Boba", amount: 50.69},
  //   {id: 5, date: "2020-08-05", description: "Chipotle & Boba", amount: 31.02},
  //   {id: 6, date: "2020-08-06", description: "Whole Foods & Trader Joe's", amount: 52.22},
  //   {id: 7, date: "2020-08-07", description: "Boba", amount: 9.00},
  //   {id: 8, date: "2020-08-08", description: "El Zarape & Gas", amount: 66.01},
  //   {id: 9, date: "2020-08-09", description: "Boba, Alkaline Water & Popeyes", amount: 29.11},
  //   {id: 10, date: "2020-08-10", description: "Whole Foods & Quarters", amount: 76.52},
  //   {id: 11, date: "2020-08-12", description: "Raffi's Gift to Parents & Jersey Mike's", amount: 62.22},
  //   {id: 12, date: "2020-08-13", description: "Tender Greens", amount: 24.00},
  //   {id: 13, date: "2020-08-14", description: "Boba, Chick-fil-A & Nail Polish", amount: 48.30},
  //   {id: 14, date: "2020-08-15", description: "Trader Joe's, H Mart & Whole Foods", amount: 115.08},
  //   {id: 15, date: "2020-08-16", description: "Gas", amount: 20.00},
  //   {id: 16, date: "2020-08-17", description: "Haircut", amount: 115.00}
  // ]

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
  const initialFormState = { user_id: 1, date_created: today, description: ``, amount: `` }
  
  const [spendings, setSpendings] = useState([])
  // 'addEntry' for AddForm
  const [addEntry, setAddEntry] = useState(initialFormState)
  // 'currentEntry' for EditForm
  const [editEntry, setEditEntry] = useState(initialFormState)
  // 'totalSpent'
  const [totalSpent, setTotalSpent] = useState(0)
  // functions
  const addSpending = async (entry) => {
    // console.log(entry)
    // entry.id = spendings.length + 1
    // setSpendings([...spendings, entry])
    // 'spending' goes to database.  This will need axios.post
    try {
      // post a new entry...
      // console.log(entry.user_id)
      await axios.post('http://localhost:3001/spendings', {
        user_id: entry.user_id,
        date_created: entry.date_created,
        description: entry.description,
        amount: entry.amount
      })
        // ...then get the spending_id
        .then(result => {
          // console.log('new spending created! the spending_id is:', result.data.spending_id)
          // console.log('result data', result.data)
          const allSpendings = result.data
          setSpendings(allSpendings)
        })
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleEditEntry = async (editEntry) => {
    try {
      // get spending_id from database...
      await axios.get(`http://localhost:3001/spendings/${editEntry.spending_id}`)
        // ...then state of opened editForm needs to display the result
        .then(result => {
          const dbEntry = result.data
        
        setEditEntry(dbEntry)
        })
    } catch (err) {
      console.error(err.message)
    }
  }

  const updateEntry = async (id, updatedEntry) => {
    // console.log('coming from editForm line 84 --- "editEntry.Id, editEntry"')
    // console.log(id)
    // console.log(updatedEntry)
    
    // setSpendings(spendings.map( entry => entry.id === id ? updatedEntry : entry ))
    // 'spendings' comes from financial data.  This will need axios.put
    try {
      await axios.put(`http://localhost:3001/spendings/${id}`, {
        date_created: updatedEntry.date_created.split('').splice(0,10).join(''),
        description: updatedEntry.description,
        amount: updatedEntry.amount
      })
        .then(async (allSpendings) => {
          // console.log(allSpendings.data)
          // await axios.get('http://localhost:3001/spendings')
          // .then(allSpendings => {
            setSpendings(allSpendings.data)
          // }) 

          // setSpendings(spendings.map( entry => entry.spending_id === id ? updatedEntry : entry ))
        })
    } catch (err) {
      console.error(err.message)
    }
  }

  const deleteEntry = async (id) => {
    // console.log('coming from SpendingsTable line 29 --- "spendingInfo.Id"')
    // console.log(id)

    // 'spendings' comes from financial data.  This will need an axios.delete
    try {
      await axios.delete(`http://localhost:3001/spendings/${id}`)
        .then(async (allSpendings) => {
          // console.log(allSpendings.data)
            setSpendings(allSpendings.data)
        })
          // setSpendings(spendings.filter( entry => entry.spending_id !== id ))
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect( () => {
    // 'spendings' need to come from a database, This will need axios.get
    axios.get('http://localhost:3001/spendings')
      .then(allSpendings => {
        // console.log('App.js -- ln 95', allSpendings.data)
        setSpendings(allSpendings.data)
      })
  }, [setSpendings])

  return (
    <Fragment>
      <div className="App">
        <Header/>
        <Chart 
          spendings={spendings}
          totalSpent={totalSpent}
          setTotalSpent={setTotalSpent}
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
    </div>
    </Fragment>
  );
}

export default App;