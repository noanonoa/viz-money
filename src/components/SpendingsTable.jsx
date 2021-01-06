import React, { Fragment } from 'react'

const SpendingsTable = ({ spendings, editEntry, deleteEntry }) => {
  if (spendings.length > 0) {
    const tableEntries = spendings.map( entry => {
      return (
        <tr key={entry.id}>
          <td>{entry.date}</td>
          <td>{entry.description}</td>
          <td>
            -$ {entry.amount}
          </td>
          <td>
            <button className="btn btn-light btn-sm" onClick={() => editEntry(entry)}>edit</button>
            <button className="btn btn-light btn-sm" onClick={() => deleteEntry(entry.id)}>delete</button>
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