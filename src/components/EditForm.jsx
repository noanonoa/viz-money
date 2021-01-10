import React, { Fragment } from 'react'

const EditForm = ({ 
  spendingInfo,
  editEntry, 
  setEditEntry, 
  updateEntry, 
  handleEditEntry
}) => {
  // functions
  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // change currentEntry state with what's written in the modal inputs
    setEditEntry({ ...editEntry, [name]: value })
  }

  return (
    <Fragment>
      <button
        type="button" 
        className="btn btn-light btn-sm" 
        data-toggle="modal" 
        data-target={`#editForm${spendingInfo.id}`}
        onClick={() => handleEditEntry(spendingInfo)}
      >
        Edit
      </button>

      <div className="modal fade" id={`editForm${spendingInfo.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Spending</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body form-group">
              <form>
                <div className="form-group">
                  <label htmlFor="editDate">Date</label>
                  <input 
                    id={`editDate${spendingInfo.id}`}
                    className="form-control"
                    type="text"
                    name="date"
                    value={editEntry.date}
                    onChange={ (e) => handleInputChange(e) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editDescription">Description</label>
                  <input
                    id={`editDescription${spendingInfo.id}`}
                    className="form-control"
                    type="text"
                    name="description"
                    value={editEntry.description}
                    placeholder="Groceries, Hobbies, etc."
                    onChange={ (e) => handleInputChange(e) }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="editAmount">Amount</label>
                  <input
                    id={`"editAmount${spendingInfo.id}`}
                    className="form-control"
                    type="text"
                    name="amount"
                    value={editEntry.amount}
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
                onClick={() => updateEntry(editEntry.id, editEntry)}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default EditForm