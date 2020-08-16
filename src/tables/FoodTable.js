import React from 'react'

const FoodTable = () => {
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
        <td>Date of purchase</td>
        <td>Description of purchase</td>
        <td>Amount spent</td>
      </tbody>
    </table>
  )
}

export default FoodTable