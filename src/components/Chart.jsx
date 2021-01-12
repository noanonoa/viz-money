import React, { useRef, useEffect } from 'react'
import { select, axisBottom, scaleUtc, extent, axisLeft, scaleLinear, max, line } from 'd3'

const Chart = ({ spendings }) => {
  // d3 settings for Line Chart
  const svgRef = useRef()
  const data = Object.assign(spendings.map(({ date_created, amount }) => ({date: date_created.split('').splice(0,10).join(''), value: amount})), {y: "$ Spent"})
  const graphLine = line()
    .defined(d => !isNaN(d.value))
    .x(d => x(d.date))
    .y(d => y(d.value))
    
    // Line Chart display settings
    const width = 1000
    const height = 500
    const margin = {top: 20, right: 30, bottom: 30, left: 40}
  
  // Line Chart X, Y Axis
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
  
  const initialRender = () => {
    console.log('Chart -- ln 40', spendings)
    const svg = select(svgRef.current)
    svg.selectAll("path").remove()
    svg.selectAll("g").remove()
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
  }

  // FIXME: chart needs to be inside a callback
  useEffect(() => {
    initialRender()
    // console.log('Chart -- ln 40', spendings)
    // const svg = select(svgRef.current)
    // svg.selectAll("path").remove()
    // svg.selectAll("g").remove()
    // svg.attr("viewBox", [0, 0, width, height])
    // svg.append("g")
    //   .call(xAxis)
    // svg.append("g")
    //   .call(yAxis)
    // svg.append("path")
    //   .datum(data)
    //   .attr("fill", "none")
    //   .attr("stroke", "steelblue")
    //   .attr("stroke-width", 1.5)
    //   .attr("stroke-linejoin", "round")
    //   .attr("stroke-linecap", "round")
    //   .attr("d", graphLine)
  // }, [spendings, data, graphLine])
  }, [spendings, data, graphLine])
  
  return (
    <div className="viz-container">
      <svg className="chart" ref={svgRef}></svg>
      <style jsx="true">{`
        .viz-container,
        .chart {
          width: 100%;
          max-height: 500px;
        }
      `}</style>
    </div>
  )
}

export default Chart