export interface Meeting {
  id: number;
  status: number;
  start: string;
  user: {
    id: number;
    fullName: string;
    profilePictureUrl: string;
  };
  pet: {
    id: number;
    name: string;
    pictureUrl: string;
    species: number;
  };
  application: {
    id: number;
  };
}
