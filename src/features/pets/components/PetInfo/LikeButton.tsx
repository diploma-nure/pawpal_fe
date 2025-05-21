'use client';

import { Button, Icon } from '@/components/ui';
import { useLikePet, useUnlikePet } from '@/features/pets/hooks';
import { useGetUsersPetsLiked } from '@/features/profile/hooks';
import { colors } from '@/styles/colors';
import { FC } from 'react';

type LikeButtonProps = {
  petId: number;
};

export const LikeButton: FC<LikeButtonProps> = ({ petId }) => {
  const { data: likedPetsData } = useGetUsersPetsLiked();
  const likeMutation = useLikePet();
  const unlikeMutation = useUnlikePet();

  const isLiked =
    likedPetsData?.data?.some((likedPet) => likedPet.id === petId) || false;

  const handleToggleLike = async () => {
    if (isLiked) {
      await unlikeMutation.mutateAsync({ petId: petId });
    } else {
      await likeMutation.mutateAsync({ petId: petId });
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
