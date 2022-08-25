import React from 'react';
import s from './pagination.module.scss';

interface PaginationPropsI {
  currentPage: number;
  pageNumbers: number[];
  paginate: (number: number) => void;
}

class Pagination extends React.Component<PaginationPropsI> {
  render() {
    return (
      <ul className={s.root}>
        {this.props.pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => this.props.paginate(number)}
            className={number === this.props.currentPage ? s.active : s.item}>
            {number}
          </li>
        ))}
      </ul>
    );
  }
}

export default Pagination;
