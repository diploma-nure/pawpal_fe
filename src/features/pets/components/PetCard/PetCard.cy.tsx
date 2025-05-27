import { PaginatedPet } from '@/features/pets/types';
import { PetCard } from './PetCard';
import styles from './styles.module.scss';

// Create mock data for testing
const createMockPet = (
  overrides: Partial<PaginatedPet> = {},
): PaginatedPet => ({
  id: 1,
  name: 'Buddy',
  species: 1, // Dog
  gender: 0, // Male
  size: 1, // Medium
  age: 2, // 3-7 years
  hasSpecialNeeds: false,
  description: 'A friendly dog looking for a loving home.',
  pictureUrl: 'https://images.unsplash.com/pet-image.jpg',
  ...overrides,
});

describe('<PetCard />', () => {
  beforeEach(() => {
    // Mock the hooks before each test
    cy.stub().as('useGetUser');
    cy.stub().as('useTokenValid');
  });

  it('renders pet information correctly', () => {
    const mockPet = createMockPet();

    cy.mount(<PetCard pet={mockPet} />);

    // Check pet name
    cy.contains(mockPet.name).should('exist');

    // Check pet image attributes
    cy.get('img').should('have.attr', 'alt', `Pet ${mockPet.name}`);

    // Check description
    cy.contains(mockPet.description).should('exist');

    // Check details link
    cy.get('a').should('have.attr', 'href', '/pets/1');
    cy.contains('Детальніше').should('exist');
  });

  it('renders gender tag correctly for male pets', () => {
    const mockPet = createMockPet({ gender: 0 }); // Male

    cy.mount(<PetCard pet={mockPet} />);

    cy.contains('Хлопчик').should('exist');
  });

  it('renders gender tag correctly for female pets', () => {
    const mockPet = createMockPet({ gender: 1 }); // Female

    cy.mount(<PetCard pet={mockPet} />);

    cy.contains('Дівчина').should('exist');
  });

  it('renders age tag correctly', () => {
    const mockPet = createMockPet({ age: 2 }); // 3-7 years

    cy.mount(<PetCard pet={mockPet} />);

    cy.contains('3–7 років').should('exist');
  });

  it('renders different age tags correctly', () => {
    // Test different age values
    const ageTestCases = [
      { age: 0, expected: 'До 1 року' },
      { age: 1, expected: '1–3 роки' },
      { age: 3, expected: '7–10 років' },
      { age: 4, expected: '10+ років' },
    ];

    ageTestCases.forEach(({ age, expected }) => {
      const mockPet = createMockPet({ age });
      cy.mount(<PetCard pet={mockPet} />);
      cy.contains(expected).should('exist');
    });
  });

  it('renders size tag correctly', () => {
    const mockPet = createMockPet({ size: 1 }); // Medium

    cy.mount(<PetCard pet={mockPet} />);

    cy.contains('Середній').should('exist');
  });

  it('renders different size tags correctly', () => {
    const sizeTestCases = [
      { size: 0, expected: 'Маленький' },
      { size: 1, expected: 'Середній' },
      { size: 2, expected: 'Великий' },
    ];

    sizeTestCases.forEach(({ size, expected }) => {
      const mockPet = createMockPet({ size });
      cy.mount(<PetCard pet={mockPet} />);
      cy.contains(expected).should('exist');
    });
  });

  it('renders special needs tag correctly for pets without special needs', () => {
    const mockPet = createMockPet({ hasSpecialNeeds: false });

    cy.mount(<PetCard pet={mockPet} />);

    cy.contains('Без особливостей').should('exist');
  });

  it('renders special needs tag correctly for pets with special needs', () => {
    const mockPet = createMockPet({ hasSpecialNeeds: true });

    cy.mount(<PetCard pet={mockPet} />);

    cy.contains('З особливостями').should('exist');
  });

  it('applies custom className when provided', () => {
    const mockPet = createMockPet();
    const customClass = 'custom-pet-card';

    cy.mount(<PetCard pet={mockPet} className={customClass} />);

    cy.get(`.${customClass}`).should('exist');
  });

  it('renders correct details link with different pet IDs', () => {
    const mockPet = createMockPet({ id: 123 });

    cy.mount(<PetCard pet={mockPet} />);

    cy.get('a').should('have.attr', 'href', '/pets/123');
  });

  it('renders all tag variants', () => {
    const mockPet = createMockPet();

    cy.mount(<PetCard pet={mockPet} />);

    // Check that tags container exists and has 4 children (gender, age, size, special needs)
    cy.get(`.${styles.tags}`).should('exist');
    cy.get(`.${styles.tags} > *`).should('have.length', 4);
  });

  it('handles long pet descriptions correctly', () => {
    const longDescription =
      'This is a very long description that should be displayed correctly in the pet card component without breaking the layout or causing any issues with the text overflow. It contains multiple sentences and should wrap properly within the card layout.';
    const mockPet = createMockPet({ description: longDescription });

    cy.mount(<PetCard pet={mockPet} />);

    cy.contains(longDescription).should('exist');
    cy.get(`.${styles.description}`).should('contain.text', longDescription);
  });

  it('handles special characters in pet name correctly', () => {
    const mockPet = createMockPet({ name: "Мурзик-O'Malley" });

    cy.mount(<PetCard pet={mockPet} />);

    cy.contains("Мурзик-O'Malley").should('exist');
    cy.get('img').should('have.attr', 'alt', "Pet Мурзик-O'Malley");
  });

  it('renders pet card with proper structure', () => {
    const mockPet = createMockPet();

    cy.mount(<PetCard pet={mockPet} />);

    // Check main card structure
    cy.get(`.${styles.card}`).should('exist');
    cy.get(`.${styles.imageContainer}`).should('exist');
    cy.get(`.${styles.content}`).should('exist');
    cy.get(`.${styles.header}`).should('exist');
    cy.get(`.${styles.name}`).should('exist');
    cy.get(`.${styles.tags}`).should('exist');
    cy.get(`.${styles.description}`).should('exist');
    cy.get(`.${styles.detailsLink}`).should('exist');
  });

  it('renders image with correct dimensions', () => {
    const mockPet = createMockPet();

    cy.mount(<PetCard pet={mockPet} />);

    cy.get('img')
      .should('have.attr', 'width', '350')
      .should('have.attr', 'height', '320');
  });

  it('handles empty description gracefully', () => {
    const mockPet = createMockPet({ description: '' });

    cy.mount(<PetCard pet={mockPet} />);

    cy.get(`.${styles.description}`).should('exist').and('be.empty');
  });
});
