import React, { useState, useEffect } from 'react'

const EditForm = ({ setEditing, currentEntry, updateEntry }) => {
  const [entry, setEntry] = useState(currentEntry)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setEntry({ ...entry, [name]: value })
  }
  
  useEffect(() => {
    setEntry(currentEntry)
  }, [currentEntry])

  return (
    <div className="form-container">
      <form 
        onSubmit={(e) => {
          e.preventDefault()

          updateEntry(entry.id, entry)
        }}
      >
        <label>Date</label>
        <input 
          type="text"
          name="date"
          value={entry.date}
          onChange={handleInputChange}
        />
        <label>Description</label>
        <input
          type="text"
          name="Description"
          value={entry.description}
          onChange={handleInputChange}
        />
        <label>Amount</label>
        <input
          type="text"
          name="amount"
          value={entry.amount}
          onChange={handleInputChange}
        />
        <button>update</button>
        <button onClick={() => setEditing(false)}>cancel</button>
      </form>
    </div>
  )
}

export default EditForm