'use client';

import { Select } from '@/components/ui';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { usePetFeatures } from '../../hooks/usePetFeatures';

interface PetFeaturesSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export const PetFeaturesSelect: React.FC<PetFeaturesSelectProps> = ({
  control,
}) => {
  const { data, isLoading } = usePetFeatures({});

  const options = React.useMemo(() => {
    if (!data?.data) return [];

    return data.data.map((feature) => ({
      title: feature.feature,
      value: feature.id,
    }));
  }, [data]);

  if (isLoading) {
    return <div>Loading pet features...</div>;
  }

  return (
    <Controller
      name="characteristics"
      control={control}
      render={({ field }) => (
        <Select
          options={options}
          onChange={(value) => field.onChange(value)}
          value={field.value as number}
          placeholder="Характеристики"
        />
      )}
    />
  );
};
