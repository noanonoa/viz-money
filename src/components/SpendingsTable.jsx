import React, { Fragment } from 'react'
import EditForm from './EditForm'

const SpendingsTable = ({ 
  spendings, 
  deleteEntry, 
  editEntry, 
  setEditEntry, 
  updateEntry,
  handleEditEntry
}) => {
  if (spendings.length > 0) {
    const tableEntries = spendings.map( spendingInfo => {
      return (
        <tr key={spendingInfo.id}>
          <td>{spendingInfo.date}</td>
          <td>{spendingInfo.description}</td>
          <td>
            -$ {spendingInfo.amount}
          </td>
          <td>
            <EditForm 
              spendingInfo={spendingInfo}
              editEntry={editEntry}
              setEditEntry={setEditEntry}
              updateEntry={updateEntry}
              handleEditEntry={handleEditEntry}
            />
            <button className="btn btn-light btn-sm" onClick={() => deleteEntry(spendingInfo.id)}>delete</button>
          </td>
        </tr>
      )
    })
    return (
      <Fragment>
        <table className="table text-center mt-5">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableEntries}
          </tbody>
        </table>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <table className="table text-center mt-5">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>--</td>
              <td>--</td>
              <td>--</td>
              <td>--</td>
            </tr>
          </tbody>
        </table>
      </Fragment>
    )
  }
}

export default SpendingsTable