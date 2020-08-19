import React from 'react'

const ExpenditureTable = ({ spendings, editEntry, deleteEntry }) => {
  if (spendings.length > 0) {
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
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Spending</th>
          </tr>
        </thead>
        <tbody>
          {tableEntries}
        </tbody>
      </table>
    )
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Spending</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>--</td>
            <td>--</td>
            <td>--</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default ExpenditureTable