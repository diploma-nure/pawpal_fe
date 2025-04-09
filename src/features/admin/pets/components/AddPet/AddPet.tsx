'use client';

import { Button, Icon } from '@/components/ui';
import { colors } from '@/styles/colors';
import { FC } from 'react';

export const AddPet: FC = () => {
  return (
    <>
      <Button rightIcon={() => <Icon name="add" fill={colors.white} />}>
        Додати тваринку
      </Button>
    </>
  );
};
