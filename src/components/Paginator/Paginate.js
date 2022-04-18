import React from 'react';

import './Paginate.css';

const Paginate = props => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className='paginator-wrapper'>
      <ul className='pagination pagination-sm justify-content-end border-0'>
        {pageNumbers.map((number, i) => {
          let classes = 'page-item ';
          if (number === props.currentPage) {
            classes += 'active';
          }

          return (
            <li className={classes} key={i}>
              <a
                onClick={() => props.pageSelected(number)}
                href='!#'
                className='page-link'
              >{number}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginate;
