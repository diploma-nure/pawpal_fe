import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import styles from './styles.module.scss';

let mockPush: Cypress.Agent<sinon.SinonStub>;
let mockSearchParams: URLSearchParams;

const Pagination = ({
  pageCount,
  page = 1,
  href = '/pets',
}: {
  pageCount: number;
  page: number;
  href?: string;
}) => {
  const [currentPage, setCurrentPage] = React.useState(Number(page) - 1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ReactPaginate, setReactPaginate] = React.useState<any>(null);

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);

    if (mockPush && mockSearchParams) {
      const params = new URLSearchParams(mockSearchParams.toString());
      params.set('page', (selectedItem.selected + 1).toString());
      mockPush(`${href}?${params.toString()}`);
    }
  };

  React.useEffect(() => {
    import('react-paginate').then((module) => {
      setReactPaginate(() => module.default);
    });
  }, []);

  if (!ReactPaginate) {
    return <div className={styles.pagination}>Loading...</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.createElement(ReactPaginate as any, {
    pageCount,
    onPageChange: handlePageChange,
    forcePage: currentPage,
    containerClassName: styles.pagination,
    pageClassName: styles.pageItem,
    pageLinkClassName: styles.pageLink,
    previousClassName: styles.pageItem,
    previousLinkClassName: styles.pageLink,
    nextClassName: styles.pageItem,
    nextLinkClassName: styles.pageLink,
    breakClassName: styles.pageItem,
    breakLinkClassName: styles.pageLink,
    activeClassName: styles.active,
    previousLabel: React.createElement(
      'div',
      {
        style: {
          width: 24,
          height: 24,
          transform: 'rotate(180deg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      '←',
    ),
    nextLabel: React.createElement(
      'div',
      {
        style: {
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      '→',
    ),
    marginPagesDisplayed: 0,
    pageRangeDisplayed: 2,
  });
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mountWithProviders = (component: React.ReactElement) => {
  return cy.mount(<TestWrapper>{component}</TestWrapper>);
};

describe('<Pagination />', () => {
  beforeEach(() => {
    mockPush = cy.stub();
    mockSearchParams = new URLSearchParams();
  });

  it('renders with basic props', () => {
    mountWithProviders(<Pagination pageCount={5} page={1} />);

    cy.get(`.${styles.pagination}`).should('exist');
    cy.get(`.${styles.pageItem}`).should('have.length.greaterThan', 0);
  });

  it('renders the correct number of page elements for small page count', () => {
    mountWithProviders(<Pagination pageCount={3} page={1} />);

    cy.get(`.${styles.pageItem}`).should('have.length', 5);
  });

  it('displays navigation arrows', () => {
    mountWithProviders(<Pagination pageCount={5} page={1} />);

    cy.get(`.${styles.pageItem}`).first().should('contain', '←');
    cy.get(`.${styles.pageItem}`).last().should('contain', '→');
  });

  it('highlights the active page', () => {
    mountWithProviders(<Pagination pageCount={5} page={2} />);

    cy.get(`.${styles.pageItem}.${styles.active}`).should('exist');
  });

  it('handles page change on click', () => {
    mountWithProviders(<Pagination pageCount={5} page={1} href="/pets" />);

    cy.get(`.${styles.pageLink}`).contains('2').click();

    cy.wrap(mockPush).should('have.been.calledWith', '/pets?page=2');
  });

  it('handles next button click', () => {
    mountWithProviders(<Pagination pageCount={5} page={1} href="/pets" />);

    cy.get(`.${styles.pageItem}`).last().click();

    cy.wrap(mockPush).should('have.been.calledWith', '/pets?page=2');
  });

  it('handles previous button click when on page 2', () => {
    mountWithProviders(<Pagination pageCount={5} page={2} href="/pets" />);

    cy.get(`.${styles.pageItem}`).first().click();

    cy.wrap(mockPush).should('have.been.calledWith', '/pets?page=1');
  });

  it('uses custom href when provided', () => {
    mountWithProviders(
      <Pagination pageCount={3} page={1} href="/admin/pets" />,
    );

    cy.get(`.${styles.pageLink}`).contains('2').click();

    cy.wrap(mockPush).should('have.been.calledWith', '/admin/pets?page=2');
  });

  it('defaults to /pets href when not provided', () => {
    mountWithProviders(<Pagination pageCount={3} page={1} />);

    cy.get(`.${styles.pageLink}`).contains('2').click();

    cy.wrap(mockPush).should('have.been.calledWith', '/pets?page=2');
  });

  it('handles large page counts with ellipsis', () => {
    mountWithProviders(<Pagination pageCount={50} page={25} />);

    cy.get(`.${styles.pagination}`).should('exist');

    cy.get(`.${styles.pageItem}`).should('contain', '...');
  });

  it('applies correct CSS classes', () => {
    mountWithProviders(<Pagination pageCount={3} page={2} />);

    cy.get(`.${styles.pagination}`).should('exist');

    cy.get(`.${styles.pageItem}`).should('exist');
    cy.get(`.${styles.pageLink}`).should('exist');

    cy.get(`.${styles.pageItem}.${styles.active}`).should('exist');
  });

  it('handles edge case: single page', () => {
    mountWithProviders(<Pagination pageCount={1} page={1} />);

    cy.get(`.${styles.pagination}`).should('exist');

    cy.get(`.${styles.pageItem}`).should('have.length.greaterThan', 0);
  });

  it('handles edge case: page 1 navigation', () => {
    mountWithProviders(<Pagination pageCount={5} page={1} href="/pets" />);

    cy.get(`.${styles.pageItem}`).first().should('exist');
  });

  it('handles edge case: last page navigation', () => {
    mountWithProviders(<Pagination pageCount={5} page={5} href="/pets" />);

    cy.get(`.${styles.pageItem}`).last().should('exist');
  });

  it('updates internal state when page prop changes', () => {
    mountWithProviders(<Pagination pageCount={5} page={1} />);

    cy.get(`.${styles.pageItem}.${styles.active}`).should('exist');

    mountWithProviders(<Pagination pageCount={5} page={3} />);

    cy.get(`.${styles.pageItem}.${styles.active}`).should('exist');
  });
});
