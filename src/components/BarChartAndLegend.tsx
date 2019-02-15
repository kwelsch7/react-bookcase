import * as React from 'react';
import * as classnames from 'classnames';
import { Book } from '../models';
import { BarChart } from './BarChart';

interface BarChartLegendProps {
  amReadingBooks: Book[];
  haveReadBooks: Book[];
  wishlistBooks: Book[];
}

interface LegendState {
  showingTypes: TypesString[];
}

export interface ColorsObject {
  amReading: string;
  haveRead: string;
  wishlist: string;
}

export type TypesString = 'amReading'|'haveRead'|'wishlist';

export class BarChartAndLegend extends React.PureComponent<BarChartLegendProps, LegendState> {
  private types: TypesString[] = ['amReading', 'haveRead', 'wishlist'];
  private typeText: { [key: string]: string } = { amReading: 'Am Reading', haveRead: 'Have Read', wishlist: 'Wishlist' };
  private colors: ColorsObject & { [key: string]: string } = { amReading: '#81F4E1', haveRead: '#89023E', wishlist: '#907AD6' };

  constructor(props: BarChartLegendProps) {
    super(props);
    this.state = { showingTypes: [...this.types] };
  }

  public render() {
    const { amReadingBooks, haveReadBooks, wishlistBooks } = this.props;
    const { showingTypes } = this.state;
    return (
      <React.Fragment>
        <ul className="list-inline legend-list">
          {this.types.map(type => (
            <LegendItem
              color={this.colors[type]}
              shown={showingTypes.includes(type)}
              type={type}
              typeText={this.typeText[type]}
              toggleShown={this.toggleShown}
              key={type}
            />
          ))}
        </ul>
        <BarChart
          amReadingBooks={amReadingBooks}
          haveReadBooks={haveReadBooks}
          wishlistBooks={wishlistBooks}
          barColors={this.colors}
          showingTypes={showingTypes}
          height={400}
          width={900}
        />
      </React.Fragment>
    );
  }

  private toggleShown = (type: TypesString) => {
    if (this.state.showingTypes.includes(type)) {
      this.setState(prevState => ({ showingTypes: prevState.showingTypes.filter(t => t !== type) }));
    }
    else {
      this.setState(prevState => {
        prevState.showingTypes.push(type);
        return { showingTypes: [...prevState.showingTypes] };
      });
    }
  }
}

interface LegendItemProps {
  color: string;
  shown: boolean;
  type: TypesString;
  typeText: string;
  toggleShown(type: TypesString): void;
}

class LegendItem extends React.PureComponent<LegendItemProps> {
  public render() {
    const { color, shown, typeText } = this.props;
    const iconClass = classnames('pr-2 fa-square', { 'fas': shown, 'far': !shown });
    return (
      <li onClick={this.handleClick} className="list-inline-item">
        <i className={iconClass} style={{ color }}/>
        {typeText}
      </li>
    )
  }

  private handleClick = () => this.props.toggleShown(this.props.type);
}
