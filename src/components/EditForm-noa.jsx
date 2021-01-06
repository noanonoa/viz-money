import React, { Fragment, useState, useEffect } from 'react'

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
    <Fragment>
      <div className="d-flex justify-content-center mt-5">
        <button type="button" className="d-flex btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
          Add spending
        </button>
      </div>

      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Spending</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body form-group">
              <form onSubmit={ (e) => (e) }>
                <div className="form-group">
                  <label for="dateInput">Date</label>
                  <input 
                    id="dateInput"
                    className="form-control"
                    type="text"
                    name="date"
                    value={entry.date}
                    onChange={ (e) => handleInputChange(e) }
                  />
                </div>
                <div className="form-group">
                  <label for="descriptionInput">Description</label>
                  <input
                    id="descriptionInput"
                    className="form-control"
                    type="text"
                    name="description"
                    value={entry.description} placeholder="Groceries, Hobbies, etc."
                    onChange={ (e) => handleInputChange(e) }
                  />
                </div>
                <div class="form-group">
                  <label for="amountInput">Amount</label>
                  <input
                    id="amountInput"
                    className="form-control"
                    type="text"
                    name="amount"
                    value={entry.amount}
                    placeholder="100.00"
                    onChange={ (e) => handleInputChange(e) }
                />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={ (e) => (e) }>Add</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditForm