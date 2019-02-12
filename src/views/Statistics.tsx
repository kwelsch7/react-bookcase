import * as React from 'react';
import { connect } from 'react-redux';
import * as classnames from 'classnames';
import { Book } from '../models';
import { AppState, getAmReadingBooks, getHaveReadBooks, getWishlistBooks } from '../redux';

interface StatisticsProps {
  amReadingBooks: Book[];
  haveReadBooks: Book[];
  wishlistBooks: Book[];
}

type ChartType = 'Bar'|'Pie'|'Radar';

export class StatisticsView extends React.PureComponent<StatisticsProps> {
  constructor(props: StatisticsProps) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <h2>
          <i className="fas fa-chart-line pr-2 mr-1"/>
          Statistics
        </h2>
        <p>
          A rudimentary analysis of the types of books you're into!
          Categories can be viewed with bar, radar, and pie charts, 
          and bookshelves can be toggled by clicking on the legend!
        </p>
        <div className="row">
          <div className="col">
            <ul className="list-unstyled list-group chart-picker-list">
              <ChartPickerItem active={} type="Bar" switchCharts={} />
              <ChartPickerItem active={} type="Radar" switchCharts={} />
              <ChartPickerItem active={} type="Pie" switchCharts={} />
            </ul>
          </div>
          <div className="col">
            {/* Actual chart */}
          </div>
        </div>
      </React.Fragment>
    );
  }
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
  active: boolean;
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
    const { active, type } = this.props;

    return (
      <li className={classnames('list-group-item', { active })} onClick={this.handleListItemClick}>
        <i className={this.iconClass}/>
        {type}
      </li>
    );
  }

  private handleListItemClick = () => this.props.switchCharts(this.props.type);
}
