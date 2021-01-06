import React, { Fragment, useState } from 'react'

const InputForm = (props) => {
  // get full date
  const month = () => {
    return ("0" + (new Date().getMonth() + 1)).slice(-2)
  }
  const date = () => {
    return ("0" + new Date().getDate()).slice(-2)
  }
  const year = new Date().getFullYear()
  const today = `${year}-${month()}-${date()}`

  // state  
  const initialFormState = { id: null, date: today, description: ``, amount: `` }
  const [entry, setEntry] = useState(initialFormState)

  // handlers
  const handleInputChange = (e) => {
    const { value, name } = e.target // e.target is the <input name={name} value={value} />

    setEntry({ ...entry, [name]: value }) // update state at <input name={name} value={value} />
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!entry.date || !entry.description || !entry.amount) return

    props.addEntry(entry)
    setEntry(initialFormState)
  }
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
              <form onSubmit={ (e) => handleSubmit(e) }>
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
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={ (e) => handleSubmit(e) }>Add</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default InputForm