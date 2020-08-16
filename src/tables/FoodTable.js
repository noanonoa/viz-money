import React from 'react'

const FoodTable = ({ foods, deleteEntry }) => {
  console.log(`🌯🌮 this is the foods data (FoodTable.js):`, {foods})
  if (foods.length > 0) {
    const foodEntries = foods.map( food => {
      return (
        <tr key={food.id}>
          <td>{food.date}</td>
          <td>{food.description}</td>
          <td>
            -$ {food.spending}
          </td>
          <td>
            <button onClick={() => deleteEntry(food.id)}>delete</button>
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
          {foodEntries}
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

export default FoodTable