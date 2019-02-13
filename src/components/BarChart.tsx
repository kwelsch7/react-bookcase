import * as React from 'react';
import * as d3 from 'd3';
import { Book } from '../models';
import * as _ from 'lodash';

interface BarChartProps {
  data: Book[];
  height: number;
  width: number;
}

const barColors = ['#89023E', '#907AD6', '#81F4E1'];

export class BarChart extends React.PureComponent<BarChartProps> {
  private svgRef: SVGSVGElement;
  private xAxisRef: SVGGElement;
  private yAxisRef: SVGGElement;
  private xScale: d3.ScaleBand<string>; 
  private yScale: d3.ScaleLinear<number, number>;
  private categories: string[];
  private categoriesCountMap: { [key: string]: number };
  private margin = { top: 8, right: 16, bottom: 24, left: 32 };
  private transition = d3.transition('barchart').duration(250);

  constructor(props: BarChartProps) {
    super(props);
    this.setupEverything(props);
  }

  public componentDidMount() {
    this.drawAxes();
  }

  public componentDidUpdate(prevProps: BarChartProps) {
    if (prevProps.data !== this.props.data) {
      this.setupEverything(this.props);
      this.drawAxes();
    }
  }

  public render() {
    return (
      <svg className="graph-container" ref={ref => this.svgRef = ref} width={this.props.width} height={this.props.height}>
        <g transform={`translate(${this.margin.left},${this.margin.top})`}>
          <g ref={ref => (this.xAxisRef = ref)} transform={`translate(0,${this.getHeight()})`}/>
          <g ref={ref => (this.yAxisRef = ref)} />
          {this.categoriesCountMap &&
            Object.keys(this.categoriesCountMap).map(category =>
            <Bar
              key={category}
              x={this.xScale(category)}
              y={this.yScale(this.categoriesCountMap[category])}
              width={this.xScale.bandwidth()}
              height={this.getHeight() - this.yScale(this.categoriesCountMap[category])}
              fill={barColors[0]}
              transition={this.transition}
            />,
          )}
        </g>
      </svg>
    );
  }

  private getHeight = () => this.props.height - this.margin.top - this.margin.bottom;

  private getWidth = () => this.props.width - this.margin.left - this.margin.right;

  private setupEverything(props: BarChartProps) {
    this.setupCategories(props.data);
    this.setupXScale();
    this.setupYScale();
  }

  private drawAxes() {
    this.drawXAxis();
    this.drawYAxis();
  }

  private setupCategories(books: Book[]) {
    this.categories = _.flatten(books.map(book => book.categories || []));
    this.categoriesCountMap = {};
    // sort categories?
    this.categories.forEach(category => {
      if (Object.keys(this.categoriesCountMap).includes(category)) {
        this.categoriesCountMap[category]++;
      } else {
        this.categoriesCountMap[category] = 1;
      }
    });
  }

  private setupXScale(): void {
    this.xScale =
      d3.scaleBand()
        .domain(this.categories)
        .rangeRound([0, this.getWidth()])
        .padding(0.1);
  }

  private setupYScale(): void {
    this.yScale =
      d3.scaleLinear()
        .domain([0, Math.max(...Object.values(this.categoriesCountMap))])
        .rangeRound([this.getHeight(), 0]);
  }

  private drawXAxis() {
    d3.select(this.xAxisRef).call(d3.axisBottom(this.xScale));
  }

  private drawYAxis() {
    d3.select(this.yAxisRef)
      // .transition(this.transition)
      .call(d3.axisLeft(this.yScale));
  }
}

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  transition: d3.Transition<HTMLElement, {}, null, undefined>;
}

class Bar extends React.Component<BarProps> {
  private rectRef: SVGRectElement;

  public componentDidMount() {
    this.updateHeight();
  }

  public componentDidUpdate(prevProps: BarProps) {
    if (prevProps.height !== this.props.height) {
      this.updateHeight();
    }
  }

  private updateHeight() {
    const { y, height, transition } = this.props;

    d3.select(this.rectRef)
      // .transition(transition)
      .attr('y', y)
      .attr('height', height);
  }

  public render() {
    const { x, width, fill } = this.props;

    return <rect x={x} width={width} fill={fill} ref={ref => this.rectRef = ref} />;
  }
}
