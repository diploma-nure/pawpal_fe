'use client';
import { colors } from '@/styles/colors';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Icon } from '../Icon/Icon';
import styles from './styles.module.scss';

interface PaginationProps {
  pageCount: number;
  page: number;
  href?: string;
}

export const Pagination = ({
  pageCount,
  page = 1,
  href = '/pets',
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(Number(page) - 1);
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', (selectedItem.selected + 1).toString());

    push(`${href}?${params.toString()}`);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={handlePageChange}
      forcePage={currentPage}
      containerClassName={styles.pagination}
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
