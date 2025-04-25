'use client';
import { colors } from '@/styles/colors';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Icon } from '../Icon/Icon';
import styles from './styles.module.scss';

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  initialPage?: number;
  className?: string;
}

export const Pagination = ({
  pageCount,
  onPageChange,
  initialPage = 0,
  className = '',
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
    onPageChange(selectedItem);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageChange}
      forcePage={currentPage}
      containerClassName={`${styles.pagination} ${className}`}
      pageClassName={styles.pageItem}
      pageLinkClassName={styles.pageLink}
      previousClassName={styles.pageItem}
      previousLinkClassName={styles.pageLink}
      nextClassName={styles.pageItem}
      nextLinkClassName={styles.pageLink}
      breakClassName={styles.pageItem}
      breakLinkClassName={styles.pageLink}
      activeClassName={styles.active}
      previousLabel={
        <Icon
          name="dropdown-arrow"
          fill={colors.darkBlue}
          width={24}
          height={24}
          style={{ transform: 'rotate(180deg)' }}
        />
      }
      nextLabel={
        <Icon
          name="dropdown-arrow"
          fill={colors.darkBlue}
          width={24}
          height={24}
        />
      }
      marginPagesDisplayed={0}
      pageRangeDisplayed={2}
    />
  );
};
