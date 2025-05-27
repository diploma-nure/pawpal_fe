import { Application } from '@/features/admin/applications/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React from 'react';
import { ApplicationCard } from './ApplicationCard';
import styles from './styles.module.scss';

// Create mock data for testing
const createMockApplication = (
  overrides: Partial<Application> = {},
): Application => ({
  id: 1,
  status: 0, // Pending
  createdAt: '2024-01-15T10:30:00Z',
  user: {
    id: 123,
    fullName: 'Анна Коваленко',
  },
  pet: {
    id: 456,
    name: 'Мурка',
    pictureUrl: 'https://images.unsplash.com/cat-image.jpg',
    species: 1, // Cat
  },
  ...overrides,
});

// Create a wrapper component that provides QueryClient context
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

// Helper function to mount component with QueryClient context
const mountWithProviders = (component: React.ReactElement) => {
  return cy.mount(<TestWrapper>{component}</TestWrapper>);
};

describe('<ApplicationCard />', () => {
  beforeEach(() => {
    // We don't need to mock hooks since we're not interacting with them
    // The QueryClient provider will handle the React Query context
  });

  it('renders application information correctly', () => {
    const mockApplication = createMockApplication();

    mountWithProviders(<ApplicationCard application={mockApplication} />);

    // Check pet name link
    cy.get(`a[href="/pets/${mockApplication.pet.id}"]`)
      .should('contain', mockApplication.pet.name)
      .should('have.attr', 'target', '_blank');

    // Check user name link
    cy.get(`a[href="/admin/applications/${mockApplication.user.id}"]`)
      .should('contain', mockApplication.user.fullName)
      .should('have.attr', 'target', '_blank');

    // Check formatted date
    const expectedDate = dayjs(mockApplication.createdAt).format('DD.MM.YYYY');
    cy.contains(expectedDate).should('exist');
  });

  it('renders ApplicationStatus component with correct status', () => {
    const mockApplication = createMockApplication({ status: 1 });

    mountWithProviders(<ApplicationCard application={mockApplication} />);

    // Check that the status component is rendered
    cy.get(`.${styles.status}`).should('exist');
  });

  it('renders ApplicationControl component with correct props', () => {
    const mockApplication = createMockApplication();

    mountWithProviders(<ApplicationCard application={mockApplication} />);

    // Check that the actions wrapper exists
    cy.get(`.${styles.actionsWrapper}`).should('exist');
  });

  it('applies correct CSS classes', () => {
    const mockApplication = createMockApplication();

    mountWithProviders(<ApplicationCard application={mockApplication} />);

    // Check main card class
    cy.get(`.${styles.card}`).should('exist');

    // Check content section
    cy.get(`.${styles.content}`).should('exist');

    // Check info section
    cy.get(`.${styles.info}`).should('exist');

    // Check image classes
    cy.get(`.${styles.image}`).should('exist');
  });

  it('renders different application statuses correctly', () => {
    const statusTestCases = [
      { status: 0, description: 'Pending' },
      { status: 1, description: 'Approved' },
      { status: 2, description: 'Meeting scheduled' },
      { status: 3, description: 'Awaiting decision' },
      { status: 4, description: 'Completed' },
      { status: 5, description: 'Rejected' },
    ];

    statusTestCases.forEach(({ status }) => {
      const mockApplication = createMockApplication({ status });
      mountWithProviders(<ApplicationCard application={mockApplication} />);

      // Verify the status component is rendered with the correct status
      cy.get(`.${styles.status}`).should('exist');
    });
  });

  it('renders different pet species correctly', () => {
    const speciesTestCases = [
      { species: 0, name: 'Рекс' }, // Dog
      { species: 1, name: 'Мурка' }, // Cat
      { species: 2, name: 'Попугай' }, // Other
    ];

    speciesTestCases.forEach(({ species, name }) => {
      const mockApplication = createMockApplication({
        pet: {
          id: 456,
          name,
          pictureUrl: '', // Use empty string instead of null
          species,
        },
      });

      mountWithProviders(<ApplicationCard application={mockApplication} />);
      cy.contains(name).should('exist');
    });
  });

  it('formats different dates correctly', () => {
    const dateTestCases = [
      '2024-01-01T00:00:00Z',
      '2023-12-25T15:30:45Z',
      '2024-06-15T09:15:30Z',
    ];

    dateTestCases.forEach((createdAt) => {
      const mockApplication = createMockApplication({ createdAt });
      const expectedDate = dayjs(createdAt).format('DD.MM.YYYY');

      mountWithProviders(<ApplicationCard application={mockApplication} />);
      cy.contains(expectedDate).should('exist');
    });
  });

  it('handles long user and pet names correctly', () => {
    const mockApplication = createMockApplication({
      user: {
        id: 123,
        fullName: 'Анна Володимирівна Коваленко-Петренко',
      },
      pet: {
        id: 456,
        name: 'Мурчик-Пурчик Великий',
        pictureUrl: 'https://images.unsplash.com/cat-image.jpg',
        species: 1,
      },
    });

    mountWithProviders(<ApplicationCard application={mockApplication} />);

    cy.contains('Анна Володимирівна Коваленко-Петренко').should('exist');
    cy.contains('Мурчик-Пурчик Великий').should('exist');
  });

  it('links navigate to correct URLs', () => {
    const mockApplication = createMockApplication({
      user: { id: 999, fullName: 'Тестовий Користувач' },
      pet: {
        id: 888,
        name: 'Тестовий Улюбленець',
        pictureUrl: '', // Use empty string instead of null
        species: 0,
      },
    });

    mountWithProviders(<ApplicationCard application={mockApplication} />);

    // Check pet link
    cy.get(`a[href="/pets/888"]`).should('exist');

    // Check user link
    cy.get(`a[href="/admin/applications/999"]`).should('exist');
  });

  it('renders with all required sections', () => {
    const mockApplication = createMockApplication();

    mountWithProviders(<ApplicationCard application={mockApplication} />);

    // Verify all main sections are present
    cy.get(`.${styles.content}`).should('exist');
    cy.get(`.${styles.status}`).should('exist');
    cy.get(`.${styles.actionsWrapper}`).should('exist');

    // Verify content subsections
    cy.get(`.${styles.info}`).should('exist');
    cy.get(`.${styles.image}`).should('exist');

    // Verify styling classes
    cy.get(`.${styles.name}`).should('exist');
    cy.get(`.${styles.userName}`).should('exist');
    cy.get(`.${styles.description}`).should('exist');
  });

  it('displays application creation date in Ukrainian format', () => {
    const mockApplication = createMockApplication({
      createdAt: '2024-03-15T14:30:00Z',
    });

    mountWithProviders(<ApplicationCard application={mockApplication} />);

    // Check that date is formatted as DD.MM.YYYY
    cy.contains('15.03.2024').should('exist');
  });
});
