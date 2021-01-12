import React, { Fragment } from 'react'

const addForm = ({
  addEntry,
  setAddEntry,
  initialFormState,
  addSpending
}) => {
  // handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target 
    setAddEntry({ ...addEntry, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (!addEntry.date_created || !addEntry.description || !addEntry.amount) return

      addSpending(addEntry)
      setAddEntry(initialFormState)
      
    } catch (err) {
      console.error(err.message)
    }    
  }

  const resetForm = () => {
    setAddEntry(initialFormState)
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-center mt-5">
        <button
          type="button"
          className="d-flex btn btn-primary btn-lg"
          data-toggle="modal"
          data-target="#addForm"
          onClick={resetForm}
        >
          Add spending
        </button>
      </div>

      <div className="modal" id="addForm">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add Spending</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body form-group">
              <form onSubmit={ (e) => handleSubmit(e) }>
                <div className="form-group">
                  <label htmlFor="dateInput">Date</label>
                  <input 
                    id="dateInput"
                    className="form-control"
                    type="text"
                    name="date"
                    value={addEntry.date_created}
                    onChange={ (e) => handleInputChange(e) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="descriptionInput">Description</label>
                  <input
                    id="descriptionInput"
                    className="form-control"
                    type="text"
                    name="description"
                    value={addEntry.description} placeholder="Groceries, Hobbies, etc."
                    onChange={ (e) => handleInputChange(e) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amountInput">Amount</label>
                  <input
                    id="amountInput"
                    className="form-control"
                    type="text"
                    name="amount"
                    value={addEntry.amount}
                    placeholder="100.00"
                    onChange={ (e) => handleInputChange(e) }
                />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={ (e) => handleSubmit(e) }
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default addForm