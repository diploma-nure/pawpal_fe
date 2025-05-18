'use client';

import { Button, Icon } from '@/components/ui';
import { useLikePet, useUnlikePet } from '@/features/pets/hooks';
import { Pet } from '@/features/pets/types';
import { useGetUsersPetsLiked } from '@/features/profile/hooks';
import { colors } from '@/styles/colors';
import { FC } from 'react';

type LikeButtonProps = {
  pet: Pet;
};

export const LikeButton: FC<LikeButtonProps> = ({ pet }) => {
  const { data: likedPetsData } = useGetUsersPetsLiked();
  const likeMutation = useLikePet();
  const unlikeMutation = useUnlikePet();

  const isLiked =
    likedPetsData?.data?.some((likedPet) => likedPet.id === pet.id) || false;

  const handleToggleLike = async () => {
    if (isLiked) {
      await unlikeMutation.mutateAsync({ petId: pet.id });
    } else {
      await likeMutation.mutateAsync({ petId: pet.id });
    }
  };

  return (
    <Button
      variant="link"
      onClick={handleToggleLike}
      disabled={likeMutation.isPending || unlikeMutation.isPending}
      aria-label={isLiked ? 'Видалити з улюблених' : 'Додати до улюблених'}
    >
      <Icon
        name={isLiked ? 'heart-filled' : 'heart'}
        fill={isLiked ? colors.pink : 'transparent'}
        stroke={isLiked ? colors.pink : undefined}
      />
    </Button>
  );
};
