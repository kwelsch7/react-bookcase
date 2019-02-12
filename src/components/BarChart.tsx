import * as React from 'react';
import * as d3 from 'd3';

interface BarChartProps {
  height: number;
  width: number;
}

export class BarChart extends React.PureComponent<BarChartProps> {
  private ref: SVGSVGElement;

  public componentDidMount() {
    d3.select(this.ref)
    .append("circle")
    .attr("r", 5)
    .attr("cx", this.props.width / 2)
    .attr("cy", this.props.height / 2)
    .attr("fill", "red");
  }

  public render() {
    return (
      <svg className="graph-container" ref={(ref: SVGSVGElement) => this.ref = ref} width={this.props.width} height={this.props.height}>
      </svg>
    );
  }
}
