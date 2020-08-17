import React, { useState, useRef, useEffect } from 'react'
import { select } from 'd3'

const VizComponent = (props) => {
  const [foodData, setFoodData] = useState(props.foodData)
  const svgRef = useRef()

  const width = "100%"
  const height = "100%"

  const xAxis = g => g

  useEffect(() => {
    console.log(`(@VizComponent.js) This is foodData props`, foodData)
    const svg = select(svgRef.current)
    
    svg.attr("viewBox", [0, 0, width, height])
    svg.append("g")
      .call(xAxis)
  }, [foodData])
  
  return (
    <div className="viz-container">
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default VizComponent