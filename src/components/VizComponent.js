import React, { useState, useRef, useEffect } from 'react'
import { select, axisBottom, scaleUtc, extent, axisLeft, scaleLinear, max, line } from 'd3'

const VizComponent = (props) => {
  const [foodData] = useState(props.foodData)
  const svgRef = useRef()
  const data = foodData.map(({ date, spending }) => ({date: new Date(date), value: spending}))
  const graphLine = line()
    .defined(d => !isNaN(d.value))
    .x(d => x(d.date))
    .y(d => y(d.value))
  const width = 700
  const height = 400
  const margin = {top: 20, right: 30, bottom: 30, left: 40}
  const x = scaleUtc()
    .domain(extent(data, d => d.date))
    .range([margin.left, width - margin.right])
  const y = scaleLinear()
    .domain([0, max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])
  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(axisBottom(x).ticks(width / 80).tickSizeOuter(0))
  const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(axisLeft(y))
    .call(g=> g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
      .attr("x", 3)
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(data.y))

      console.log((new Date("2009-09-09")))

  useEffect(() => {
    // console.log(`(@VizComponent.js) This is foodData props`, foodData)
    const svg = select(svgRef.current)
    
    svg.attr("viewBox", [0, 0, width, height])
    svg.append("g")
      .call(xAxis)
    svg.append("g")
      .call(yAxis)
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", graphLine)
  }, [foodData, data, graphLine])
  
  return (
    <div className="viz-container">
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default VizComponent