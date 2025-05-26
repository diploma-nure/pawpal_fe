export interface Application {
  id: number;
  status: number;
  createdAt: string;
  user: {
    id: number;
    fullName: string;
  };
  pet: {
    id: number;
    name: string;
    pictureUrl: string;
    species: number;
  };
}
