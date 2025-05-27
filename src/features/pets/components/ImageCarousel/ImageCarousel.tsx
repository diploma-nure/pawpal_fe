'use client';
import { placeholderImages } from '@/features/pets/constants/placeholderImages';
import clsx from 'clsx';
import Image from 'next/image';
import { FC, useState } from 'react';
import styles from './styles.module.scss';

type ImageCarouselProps = {
  images: string[];
  altText: string;
  species: number;
};

export const ImageCarousel: FC<ImageCarouselProps> = ({
  images,
  altText,
  species,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleImageClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div>
      <div className={styles.activeImageWrapper}>
        <Image
          className={styles.activeImage}
          src={images[activeIndex] ?? placeholderImages[species]}
          alt={altText}
          width={300}
          height={300}
        />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbnailWrapper}>
          {images.map((image, index) => (
            <div
              className={clsx(styles.thumbnail, {
                [styles.activeThumbnail]: index === activeIndex,
              })}
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image}
                alt={`${altText} thumbnail ${index + 1}`}
                width={86}
                height={86}
                style={{ borderRadius: '4px' }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
