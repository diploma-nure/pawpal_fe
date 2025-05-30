import PlaceholderCatImage from '@/assets/images/PlaceholderCat.jpg';
import PlaceholderDogImage from '@/assets/images/PlaceholderDog.jpg';
import PlaceholderPetImage from '@/assets/images/PlaceholderPet.png';
import { StaticImageData } from 'next/image';

export const placeholderImages: { [key: number]: StaticImageData } = {
  0: PlaceholderDogImage,
  1: PlaceholderCatImage,
  2: PlaceholderPetImage,
};
