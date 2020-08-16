import React, { useState } from 'react'

const AddForm = (props) => {
  const month = new Date().getMonth() + 1
  const date = new Date().getDate()
  const year = new Date().getFullYear()
  const today = `${month}/${date}/${year}`

  const initialFormState = { id: null, date: today, description: ``, spending: `` }
  const [entry, setEntry] = useState(initialFormState)

  const handleInputChange = (e) => {
    const { value, name } = e.target

    setEntry({ ...entry, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!entry.date || !entry.description || !entry.spending) return

    props.addEntry(entry)
    setEntry(initialFormState)
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label>Date</label>
      <input 
        type="text" 
        name="date" 
        value={ entry.date } 
        onChange={ handleInputChange } 
      />
      <label>Description</label>
      <input 
        type="text" 
        name="description" 
        value={ entry.description } 
        onChange={ handleInputChange }
      />
      <label>Spending</label>
      <input 
        type="text" 
        name="spending" 
        value={ entry.spending } 
        onChange={ handleInputChange }
      />
      <button>Add</button>
    </form>
  )
}

export default AddForm