import * as React from 'react';
import * as $ from 'jquery';

export class QuickOptionsList extends React.PureComponent {
  componentDidMount() {
    // const toolTippers = $('[data-toggle="tooltip"]') as any;
    // console.log(toolTippers);
    // toolTippers.tooltip();
    // ($('[data-toggle="tooltip"]') as any).tooltip();
    // (document.querySelectorAll('[data-toggle="tooltip"]') as any).tooltip();
  }
  
  componentDidUpdate() {
    // ($('[data-toggle="tooltip"]') as any).tooltip();
  }

  componentWillUnmount() {
    // ($('[data-toggle="tooltip"]') as any).tooltip('dispose');
  }

  render() {
    return (
      <ul className="nav quick-option-list">
        <li className="nav-item">
          <QuickOption iconClass="fas fa-fw fa-check-square" tooltipText="Add to 'Have Read'"/>
        </li>
        <li className="nav-item">
          <QuickOption iconClass="fas fa-fw fa-bookmark" tooltipText="Add to 'Wishlist'"/>
        </li>
        <li className="nav-item">
          <QuickOption iconClass="fas fa-fw fa-book-reader" tooltipText="Add to 'Am Reading'"/>
        </li>
      </ul>
    );
  }
}

interface QuickOptionProps {
  iconClass: string;
  tooltipText: string;
}

const QuickOption: React.SFC<QuickOptionProps> = ({ iconClass, tooltipText }) => (
  <button
    type="button"
    className="quick-option-button btn rounded-circle"
    data-toggle="tooltip"
    data-placement="top"
    title={tooltipText}
  >
    <i className={iconClass}/>
  </button>
);
