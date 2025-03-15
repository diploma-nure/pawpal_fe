'use client';

import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReviewCard } from '../ReviewCard/ReviewCard';
import { reviews } from './constants';
import styles from './styles.module.scss';

export const ReviewCarousel = () => {
  return (
    <Swiper
      // className="overflow-visible-force"
      modules={[Navigation, Pagination]}
      spaceBetween={16}
      slidesPerView="auto"
      grabCursor
    >
      {reviews.map((review, i) => (
        <SwiperSlide key={i} className={styles.reviewSlide}>
          <ReviewCard text={review.review} author={review.author} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
