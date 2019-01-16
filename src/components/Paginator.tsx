import * as React from 'react';
import { Link } from 'react-router-dom';

interface PaginatorProps {
  activePage: number;
  className?: string;
  pageSize: number;
  totalRecords: number;
  updatePageNumber(newPage: number): void;
}

interface PaginatorState {
  highRange: number;
  lowRange: number;
  range: number[];
  totalPages: number;
}

// NOTE -- Consider making this like Google's paginator, which doesn't supply a "First" and "Last" page option
//   -- in part because the api keeps returning new "totals" on each return, and partially because of the nature of
//   -- looking for a "relevant" result rather than a particular one hiding somewhere in the pages

export class Paginator extends React.PureComponent<PaginatorProps, PaginatorState> {
  constructor(props: PaginatorProps) {
    super(props);
    const { activePage, pageSize, totalRecords } = props;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const range: number[] = [];
    for(var pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      range.push(pageNumber);
    }
    const lowRange = pageSize * (activePage - 1) + 1;
    let highRange = lowRange + pageSize - 1;
    highRange = highRange <= totalRecords ? highRange : totalRecords;
    this.state = {
      highRange,
      lowRange,
      range,
      totalPages,
    };
  }

  public componentWillReceiveProps(nextProps: PaginatorProps) {
    if (this.props.activePage !== nextProps.activePage) {
      const { activePage, pageSize, totalRecords } = nextProps;
      const lowRange = pageSize * (activePage - 1) + 1;
      let highRange = lowRange + pageSize - 1;
      highRange = highRange <= totalRecords ? highRange : totalRecords;
      this.setState({ highRange, lowRange });
    }
  }

  public render() {
    const { activePage, totalRecords, updatePageNumber } = this.props;
    const { highRange, lowRange, range, totalPages } = this.state;
    return (
      <React.Fragment>
        <nav className="mt-3 mb-2">
          <ul className="pagination">
            <li className={`page-item${activePage === 1 ? ' disabled' : ''}`}>
              <Link onClick={this.handlePrevClick} className="page-link" to={{ search: `?page=${activePage - 1}` }} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            {range.map(pageNumber =>(
              <PageItem
                activePage={activePage}
                pageNumber={pageNumber}
                updatePageNumber={updatePageNumber}
                key={pageNumber}
              />
            ))}
            <li className={`page-item${activePage === totalPages ? ' disabled' : ''}`}>
              <Link onClick={this.handleNextClick} className="page-link" to={{ search: `?page=${activePage + 1}` }} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div>Showing {lowRange} to {highRange} of {totalRecords} items.</div>
      </React.Fragment>
    );
  }

  private handlePrevClick = () => this.props.updatePageNumber(this.props.activePage - 1);

  private handleNextClick = () => this.props.updatePageNumber(this.props.activePage + 1);
}

interface PageItemProps {
  activePage: number;
  pageNumber: number;
  updatePageNumber(newPage: number): void;
}

class PageItem extends React.PureComponent<PageItemProps> {
  public render() {
    const { activePage, pageNumber } = this.props;
    return (
      <li className={`page-item${activePage === pageNumber ? ' active' : ''}`}>
        <Link onClick={this.handleClick} className="page-link" to={{ search: `?page=${pageNumber}` }}>
          {pageNumber}
        </Link>
      </li>
    );
  }

  private handleClick = () => this.props.updatePageNumber(this.props.pageNumber);
}
