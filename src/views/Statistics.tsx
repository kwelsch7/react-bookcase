import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';
import { BarChart } from '../components';
import { Book } from '../models';
import { AppState, getAmReadingBooks, getHaveReadBooks, getWishlistBooks } from '../redux';

interface StatisticsProps {
  amReadingBooks: Book[];
  haveReadBooks: Book[];
  wishlistBooks: Book[];
}

interface StatisticsState {
  currentChart: ChartType;
}

type ChartType = 'Bar'|'Pie'|'Radar';

export class StatisticsView extends React.PureComponent<StatisticsProps, StatisticsState> {
  constructor(props: StatisticsProps) {
    super(props);
    this.state = { currentChart: 'Bar' };
  }

  public render() {
    const { amReadingBooks, haveReadBooks, wishlistBooks } = this.props;
    const { currentChart } = this.state;
    return (
      <React.Fragment>
        <h2>
          <i className="fas fa-chart-line pr-2 mr-1"/>
          Statistics
        </h2>
        <p>
          A rudimentary analysis of the types of books you're into!
          Categories can be viewed with bar, radar, and pie charts, 
          and bookshelves can be toggled by clicking on the legend.
        </p>
        <div className="row">
          <div className="col-auto">
            <ul className="list-unstyled list-group chart-picker-list">
              <ChartPickerItem currentChart={currentChart} type="Bar" switchCharts={this.switchCharts} />
              <ChartPickerItem currentChart={currentChart} type="Radar" switchCharts={this.switchCharts} />
              <ChartPickerItem currentChart={currentChart} type="Pie" switchCharts={this.switchCharts} />
            </ul>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                {currentChart === 'Bar' &&
                  <BarChart
                    amReadingBooks={amReadingBooks}
                    haveReadBooks={haveReadBooks}
                    wishlistBooks={wishlistBooks}
                    height={400}
                    width={900}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private switchCharts = (type: ChartType): void => this.setState({ currentChart: type });
}

const mapStateToProps = (state: AppState): StatisticsProps => (
  {
    amReadingBooks: getAmReadingBooks(state),
    haveReadBooks: getHaveReadBooks(state),
    wishlistBooks: getWishlistBooks(state),
  }
);

export const StatisticsPage = connect(mapStateToProps)(StatisticsView);

interface ChartPickerItemProps {
  currentChart: ChartType;
  type: ChartType;
  switchCharts(type: ChartType): void;
}

class ChartPickerItem extends React.PureComponent<ChartPickerItemProps> {
  private iconClass: string;

  constructor(props: ChartPickerItemProps) {
    super(props);
    const { type } = props;
    this.iconClass = classnames('pr-2 fas', {
      'fa-chart-bar': type === 'Bar',
      'fa-chart-pie': type === 'Pie',
      'fa-asterisk': type === 'Radar',
    });
  }

  public render() {
    const { currentChart, type } = this.props;
    const classes = classnames('list-group-item', { active: type === currentChart });

    return (
      <li className={classes} onClick={this.handleListItemClick}>
        <i className={this.iconClass}/>
        {type}
      </li>
    );
  }

  private handleListItemClick = () => this.props.switchCharts(this.props.type);
}
