import * as React from 'react';
import * as classNames from 'classnames';

interface SortHeaderCellProps {
  isReverse?: boolean;
  isSorted?: string;
  sortKey: string;
  toggleSort?(sortKey: string): void;
}

export class SortHeaderCell extends React.PureComponent<SortHeaderCellProps> {
  public render() {
    const { isReverse, isSorted } = this.props;
    const cellClass = classNames(
      'table-sort',
      { active: isSorted },
    );
    const iconClass = classNames(
      'pr-2 fas',
      {
        'fa-sort': !isSorted,
        'fa-sort-down': isSorted && isReverse,
        'fa-sort-up': isSorted && !isReverse,
      },
    );

    return (
      <th onClick={this.handleClick} className={cellClass}>
        <i className={iconClass} />
        {this.props.children}
      </th>
    );
  }

  private handleClick = () => this.props.toggleSort(this.props.sortKey);
}

interface SortTableProps {
  className?: string;
  currentSortKey: string;
  isReverse: boolean;
  toggleSort(sortKey: string): void;
}

export const SortTableHead: React.SFC<SortTableProps> = (props) => (
  <thead className={props.className}>
    <tr>
      {React.Children.map(props.children, (th: JSX.Element) => {
        if (th.type === SortHeaderCell) {
          const sortKey = th.props.sortKey;
          return React.cloneElement(th, {
            isReverse: props.isReverse,
            isSorted: props.currentSortKey === sortKey,
            toggleSort: props.toggleSort,
            sortKey,
          });
        }
        return th;
      })}
    </tr>
  </thead>
);
