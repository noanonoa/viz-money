import React, { Fragment } from 'react'

const SpendingsTable = ({ spendings, editEntry, deleteEntry }) => {
  if (!spendings.length > 0) {
    const tableEntries = spendings.map( entry => {
      return (
        <tr key={entry.id}>
          <td>{entry.date}</td>
          <td>{entry.description}</td>
          <td>
            -$ {entry.spending}
          </td>
          <td>
            <button onClick={() => editEntry(entry)}>edit</button>
            <button onClick={() => deleteEntry(entry.id)}>delete</button>
          </td>
        </tr>
      )
    })
    return (
      <Fragment>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Spending</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableEntries}
            </tbody>
          </table>
        </div>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div id="spendingsTable">
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
        </div>
      </Fragment>
    )
  }
}

export default SpendingsTable