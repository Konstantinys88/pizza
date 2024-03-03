import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';

type PaginationProps = {
    onChangePage: any
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel='...'
            nextLabel='>'
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageRangeDisplayed={8}
            pageCount={2}
            previousLabel='<'
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
