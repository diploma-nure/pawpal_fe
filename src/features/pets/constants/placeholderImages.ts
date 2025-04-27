import PlaceholderCatImage from '@/assets/images/PlaceholderCat.jpg';
import PlaceholderDogImage from '@/assets/images/PlaceholderDog.jpg';
import { StaticImageData } from 'next/image';

export const placeholderImages: { [key: number]: StaticImageData } = {
  0: PlaceholderCatImage,
  1: PlaceholderDogImage,
};
