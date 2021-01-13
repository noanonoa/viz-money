import React, { useRef, useEffect } from 'react'
import { select, axisBottom, scaleUtc, extent, axisLeft, scaleLinear, max, line } from 'd3'

const Chart = ({ spendings }) => {
  const svgRef = useRef()

  const visualize = (spendings) => {
    // d3 settings for Line Chart
    const data = Object.assign(spendings.map(({ date_created, amount }) => ({date_created: new Date(date_created.split('').splice(0,10).join('')), value: Number(amount)})), {y: "$ Spent"})
    console.log(data)
    // FIXME: the graph's yAxis (amount spent) needs to accumulate when the date is the same as other entries
    // FIXME: the chart displays weirdly when amounts are far apart in value
    const graphLine = line()
      .defined(d => !isNaN(d.value))
      .x(d => x(d.date_created))
      .y(d => y(d.value))

    // Line Chart display settings relative to div.viz-container
    const width = 1000
    const height = 500
    const margin = {top: 20, right: 30, bottom: 30, left: 40}
    // const margin = {top: 0, right: 0, bottom: 0, left: 0}

    // Line Chart X, Y Axis
    const x = scaleUtc()
      .domain(extent(data, d => d.date_created))
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

    // console.log(y.domain())
    // console.log(y.range())

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
  
  useEffect(() => {
    visualize(spendings)    
  }, [spendings])
  
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