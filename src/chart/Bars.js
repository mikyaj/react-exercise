import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, this.props.maxValue])
      .range(['#112175', '#1c3ad4'])
      .interpolate(interpolateLab)
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    const bars = (
      data.map(datum =>
        <rect
          key={datum.repoName}
          x={xScale(datum.repoName)}
          y={yScale(datum.stars)}
          height={height - margins.bottom - scales.yScale(datum.stars)}
          width={xScale.bandwidth()}
          fill={this.colorScale(datum.stars)}
        />,
      )
    )

    return (
      <g>{bars}</g>
    )
  }
}