import * as React from 'react';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { ColorsObject, TypesString } from './BarChartAndLegend';
import { Book } from '../models';

interface BarChartProps {
  amReadingBooks: Book[];
  haveReadBooks: Book[];
  wishlistBooks: Book[];
  barColors: ColorsObject;
  showingTypes: TypesString[];
  height: number;
  width: number;
}

export class BarChart extends React.PureComponent<BarChartProps> {
  private svgRef: SVGSVGElement;
  private xAxisRef: SVGGElement;
  private yAxisRef: SVGGElement;
  private xScale: d3.ScaleBand<string>; 
  private yScale: d3.ScaleLinear<number, number>;
  private allCategories: string[];
  private maxCountSum: number;
  private categoriesCountMap: {
    amReading: { [key: string]: number },
    haveRead: { [key: string]: number },
    wishlist: { [key: string]: number },
  };
  private margin = { top: 8, right: 16, bottom: 24, left: 32 };
  private transition = d3.transition('barchart').duration(300); // backwards?

  constructor(props: BarChartProps) {
    super(props);
    this.setupEverything(props);
  }

  public componentDidMount() {
    this.drawAxes();
  }

  public componentDidUpdate(prevProps: BarChartProps) {
    if (prevProps.amReadingBooks !== this.props.amReadingBooks
        || prevProps.haveReadBooks !== this.props.haveReadBooks
        || prevProps.wishlistBooks !== this.props.wishlistBooks) {
      this.setupEverything(this.props);
      this.drawAxes();
    }
  }

  public render() {
    return (
      <svg className="graph-container" ref={ref => this.svgRef = ref} width={this.props.width} height={this.props.height}>
        <g transform={`translate(${this.margin.left},${this.margin.top})`}>
          {this.allCategories.map(category => this.getBarStackForCategory(category))}
          <g ref={ref => (this.xAxisRef = ref)} transform={`translate(0,${this.getHeight()})`}/>
          <g ref={ref => (this.yAxisRef = ref)} />
        </g>
      </svg>
    );
  }

  private getBarStackForCategory(category: string): JSX.Element {
    const { barColors, showingTypes } = this.props;
    const includeHaveRead = showingTypes.includes('haveRead');
    const includeAmReading = showingTypes.includes('amReading');
    const includeWishlist = showingTypes.includes('wishlist');
    const { amReading, haveRead, wishlist } = this.categoriesCountMap;
    const chartHeight = this.getHeight();
    const firstHeight = includeHaveRead ? chartHeight - this.yScale(haveRead[category] || 0) : 0;
    const secondHeight = includeAmReading ? chartHeight - this.yScale(amReading[category] || 0) : 0;
    const thirdHeight = includeWishlist ? chartHeight - this.yScale(wishlist[category] || 0) : 0;

    return (
      <React.Fragment key={category}>
        <Bar
          x={this.xScale(category)}
          y={chartHeight - firstHeight}
          width={this.xScale.bandwidth()}
          height={firstHeight}
          fill={barColors.haveRead}
          transition={this.transition}
        />
        <Bar
          x={this.xScale(category)}
          y={chartHeight - (firstHeight + secondHeight)}
          width={this.xScale.bandwidth()}
          height={secondHeight}
          fill={barColors.amReading}
          transition={this.transition}
        />
        <Bar
          x={this.xScale(category)}
          y={chartHeight - (firstHeight + secondHeight + thirdHeight)}
          width={this.xScale.bandwidth()}
          height={thirdHeight}
          fill={barColors.wishlist}
          transition={this.transition}
        />
      </React.Fragment>
    )
  }

  private getHeight = () => this.props.height - this.margin.top - this.margin.bottom;

  private getWidth = () => this.props.width - this.margin.left - this.margin.right;

  private setupEverything(props: BarChartProps) {
    const { amReadingBooks, haveReadBooks, wishlistBooks } = props;
    this.categoriesCountMap = { amReading: {}, haveRead: {}, wishlist: {} };
    this.categoriesCountMap.amReading = this.setupCategories(amReadingBooks);
    this.categoriesCountMap.haveRead = this.setupCategories(haveReadBooks);
    this.categoriesCountMap.wishlist = this.setupCategories(wishlistBooks);
    this.setupAllCategories();
    this.setupMaxCountSum();
    this.setupXScale();
    this.setupYScale();
  }

  private drawAxes() {
    this.drawXAxis();
    this.drawYAxis();
    // Add markers -- https://www.youtube.com/watch?v=4Tl_o7muaNk
  }

  private setupCategories(books: Book[]): { [key: string]: number } {
    const categories = _.sortBy(_.flatten(books.map(book => book.categories || [])));
    const bookcaseCategories: { [key: string]: number } = {};
    categories.forEach(category => {
      if (Object.keys(bookcaseCategories).includes(category)) {
        bookcaseCategories[category]++;
      } else {
        bookcaseCategories[category] = 1;
      }
    });
    return bookcaseCategories;
  }

  private setupAllCategories() {
    const { amReading, haveRead, wishlist } = this.categoriesCountMap;
    this.allCategories = _.sortBy(
      _.uniq(
        _.concat(
          Object.keys(amReading),
          Object.keys(haveRead),
          Object.keys(wishlist),
        )
      )
    );
  }

  private setupMaxCountSum() {
    const { amReading, haveRead, wishlist } = this.categoriesCountMap;
    let maxSum = 0;
    this.allCategories.forEach(category => {
      const sum = (amReading[category] || 0) + (haveRead[category] || 0) + (wishlist[category] || 0);
      if (sum > maxSum) {
        maxSum = sum;
      }
    });
    this.maxCountSum = maxSum;
  }

  private setupXScale(): void {
    this.xScale =
      d3.scaleBand()
        .domain(this.allCategories)
        .rangeRound([0, this.getWidth()])
        .padding(0.1);
  }

  private setupYScale(): void {
    this.yScale =
      d3.scaleLinear()
        .domain([0, this.maxCountSum])
        .rangeRound([this.getHeight(), 0]);
  }

  private drawXAxis() {
    d3.select(this.xAxisRef).call(d3.axisBottom(this.xScale));
  }

  private drawYAxis() {
    d3.select(this.yAxisRef)
      .transition(this.transition)
      .call(d3.axisLeft(this.yScale).ticks(4));
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

class Bar extends React.PureComponent<BarProps> {
  private rectRef: SVGRectElement;

  public componentDidMount() {
    this.updateHeight();
  }

  public componentDidUpdate(prevProps: BarProps) {
    if (prevProps.height !== this.props.height
        || prevProps.y !== this.props.y) {
      this.updateHeight();
    }
  }

  private updateHeight() {
    const { y, height, transition } = this.props;

    d3.select(this.rectRef)
      .transition(transition)
      .attr('y', y)
      .attr('height', height);
  }

  public render() {
    const { x, width, fill } = this.props;

    return <rect x={x} width={width} fill={fill} ref={ref => this.rectRef = ref} />;
  }
}
