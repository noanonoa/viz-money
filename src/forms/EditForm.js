import React, { useState } from 'react'

const EditForm = ({ setEditing, currentEntry, updateEntry }) => {
  const [entry, setEntry] = useState(currentEntry)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setEntry({ ...entry, [name]: value })
  }

  return (
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
      <label>Spending</label>
      <input
        type="text"
        name="spending"
        value={entry.spending}
        onChange={handleInputChange}
      />
      <button>update</button>
      <button onClick={() => setEditing(false)}>cancel</button>
    </form>
  )
}

export default EditForm