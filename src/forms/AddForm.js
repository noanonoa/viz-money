import React, { useState } from 'react'

const AddForm = (props) => {
  const month = () => {
    return ("0" + (new Date().getMonth() + 1)).slice(-2)
  }
  const date = () => {
    return ("0" + new Date().getDate()).slice(-2)
  }
  const year = new Date().getFullYear()
  const today = `${year}-${month()}-${date()}`

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
    <div className="form-container">
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
    </div>
  )
}

export default AddForm