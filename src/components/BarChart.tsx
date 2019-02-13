import * as React from 'react';
import * as d3 from 'd3';
import { Book } from '../models';
import { scaleBand, scaleLinear } from 'd3';
import * as _ from 'lodash';

interface BarChartProps {
  data: Book[];
  height: number;
  width: number;
}

export class BarChart extends React.PureComponent<BarChartProps> {
  private svgRef: SVGSVGElement;

  public componentDidMount() {
    this.drawChart(this.props.data);
  }

  public componentWillReceiveProps(nextProps: BarChartProps) {
    if (nextProps.data !== this.props.data) {
      this.drawChart(nextProps.data);
    }
  }

  public render() {
    return (
      <svg className="graph-container" ref={ref => this.svgRef = ref} width={this.props.width} height={this.props.height}/>
    );
  }

  private drawChart(books: Book[]) {
    const categories = _.flatten(books.map(book => book.categories || []));
    const categoriesCountMap: { [key: string]: number } = {};
    // sort categories?
    categories.forEach(category => {
      if (Object.keys(categoriesCountMap).includes(category)) {
        categoriesCountMap[category]++;
      } else {
        categoriesCountMap[category] = 1;
      }
    });
    d3.select(this.svgRef)
    .append('g')
    .call(d3.axisBottom(
      scaleBand()
      .domain(categories)
      .rangeRound([this.props.width, 0])
    ))
    .append('g')
    .call(d3.axisLeft(
      scaleLinear()
      .domain([0, Math.max(...Object.values(categoriesCountMap))])
      .rangeRound([this.props.height, 0])
    ))
    // .append("rect")
    // .attr("width", this.props.width / 2)
    // .attr("height", this.props.height / 2)
    // .attr("fill", "green");
  }
}
