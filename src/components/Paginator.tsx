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
  showingHigh: number;
  showingLow: number;
  pageRange: number[];
  totalPages: number;
}

export class Paginator extends React.PureComponent<PaginatorProps, PaginatorState> {
  constructor(props: PaginatorProps) {
    super(props);
    this.state = this.getState(props);
  }

  public componentWillReceiveProps(nextProps: PaginatorProps) {
    if (this.props.activePage !== nextProps.activePage) {
      const newState = this.getState(nextProps);
      this.setState(newState);
    }
  }

  public render() {
    const { activePage, totalRecords, updatePageNumber } = this.props;
    const { showingHigh, showingLow, pageRange, totalPages } = this.state;
    return (
      <React.Fragment>
        <nav className="mt-3 d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item mr-3${activePage === 1 ? ' disabled' : ''}`}>
              <Link onClick={this.handlePrevClick} className="page-link" to={{ search: `?page=${activePage - 1}` }} aria-label="Previous">
                <span aria-hidden="true"><i className="fas fa-long-arrow-alt-left"/> Prev</span>
              </Link>
            </li>
            {pageRange.map(pageNumber =>(
              <PageItem
                activePage={activePage}
                pageNumber={pageNumber}
                updatePageNumber={updatePageNumber}
                key={pageNumber}
              />
            ))}
            <li className={`page-item ml-3${activePage === totalPages ? ' disabled' : ''}`}>
              <Link onClick={this.handleNextClick} className="page-link" to={{ search: `?page=${activePage + 1}` }} aria-label="Next">
                <span aria-hidden="true">Next <i className="fas fa-long-arrow-alt-right"/></span>
              </Link>
            </li>
          </ul>
        </nav>
        <div>Showing {showingLow} to {showingHigh} of {totalRecords} items.</div>
      </React.Fragment>
    );
  }

  private handlePrevClick = () => this.props.updatePageNumber(this.props.activePage - 1);

  private handleNextClick = () => this.props.updatePageNumber(this.props.activePage + 1);

  private getPageNav = (activePage: number, totalPages: number): number[] => {
    let startingPage = activePage - 5;
    if (startingPage < 1) {
      startingPage = 1;
    }
    let endingPage = startingPage + 9;
    if (endingPage > totalPages) {
      endingPage = totalPages;
      startingPage = endingPage - 9;
    }
    if (startingPage < 1) {
      startingPage = 1;
    }
    const pageRange: number[] = [];
    for(let pageNumber = startingPage; pageNumber <= endingPage; pageNumber++) {
      pageRange.push(pageNumber);
    }
    return pageRange;
  }

  private getState = (props: PaginatorProps) => {
    const { activePage, pageSize, totalRecords } = props;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const pageRange = this.getPageNav(activePage, totalPages);
    const showingLow = pageSize * (activePage - 1) + 1;
    let showingHigh = showingLow + pageSize - 1;
    showingHigh = showingHigh <= totalRecords ? showingHigh : totalRecords;
    return {
      showingHigh,
      showingLow,
      pageRange,
      totalPages,
    };
  }
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
