'use client';

import { Button, Icon, Input, Modal, Select } from '@/components/ui';
import { PetFeaturesSelect } from '@/features/pets/components';
import { useGetPet } from '@/features/pets/hooks/useGetPet';
import { usePetFeatures } from '@/features/pets/hooks/usePetFeatures';
import { useUpdatePet } from '@/features/pets/hooks/useUpdatePet';
import {
  PetAge,
  PetGender,
  PetPicture,
  PetSize,
  PetSpecies,
  PetsSpecialNeeds,
} from '@/features/pets/types';
import { colors } from '@/styles/colors';
import clsx from 'clsx';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import styles from '../AddPetModal/styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  petId: number;
};

interface PetFormData {
  name: string;
  age: string;
  gender: string;
  size: string;
  species: string;
  hasSpecialNeeds: string;
  characteristics: number[];
  description: string;
  images: File[];
}

export const UpdatePetModal: FC<Props> = ({ isOpen, onClose, petId }) => {
  const [files, setFiles] = useState<(File | PetPicture)[]>([]);
  const updatePetMutation = useUpdatePet({
    onSuccess: () => {
      onClose();
    },
  });
  const { data, isError } = useGetPet(petId, { enabled: isOpen });
  const [showConfirm, setShowConfirm] = useState(false);
  const { data: features } = usePetFeatures();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<PetFormData>({
    defaultValues: {
      name: '',
      age: '',
      gender: '',
      size: '',
      species: '',
      hasSpecialNeeds: '',
      description: '',
      images: [],
      characteristics: [],
    },
  });

  useEffect(() => {
    if (data?.data && features?.data) {
      const pet = data.data;
      reset({
        name: pet.name || '',
        age: pet.age?.toString() || '',
        gender: pet.gender?.toString() || '',
        size: pet.size?.toString() || '',
        species: pet.species?.toString() || '',
        hasSpecialNeeds: pet.hasSpecialNeeds ? '1' : '0',
        description: pet.description || '',
        images: pet.pictures.map((picture) => {
          const file = new File([], picture.url);
          return file;
        }),
        characteristics:
          features?.data
            ?.filter((feature) =>
              pet.features.some((f) => f === feature.feature),
            )
            .map((feature) => feature.id) || [],
      });

      setFiles(pet.pictures);
    }
  }, [data, reset, features]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const handleRemoveImage = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const onSubmit = (formData: PetFormData) => {
    const pet = data?.data;
    if (!pet) return;

    const payload = {
      Id: pet.id,
      Name: formData.name,
      Species: parseInt(formData.species),
      Gender: parseInt(formData.gender),
      Size: parseInt(formData.size),
      Age: parseInt(formData.age),
      HasSpecialNeeds: parseInt(formData.hasSpecialNeeds) === 1,
      FeaturesIds: formData.characteristics ?? [],
      Description: formData.description,
      Pictures: files,
    };
    updatePetMutation.mutate(payload);
  };

  if (isError) {
    return <div>Error loading pet data</div>;
  }

  const renderModalIcon = () => {
    if (showConfirm) {
      return <Icon name="logo" width={92} height={78} />;
    }
    return null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={clsx({
        [styles.addPetModal]: !showConfirm,
        [styles.confirmModal]: showConfirm,
      })}
      renderTitleIcon={renderModalIcon}
    >
      {!showConfirm && (
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.formField}>
              <Input
                control={control}
                label="Ім'я"
                placeholder="Міся"
                {...register('name')}
                error={errors.name}
              />
            </div>

            <div className={styles.formField} style={{ alignSelf: 'flex-end' }}>
              <Controller
                name="age"
                control={control}
                render={({ field }) => (
                  <Select
                    options={PetAge}
                    placeholder="Вік"
                    value={Number(field.value) || 0}
                    onChange={(value) => field.onChange(value.toString())}
                  />
                )}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.formField}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    options={PetGender}
                    placeholder="Стать"
                    value={parseInt(field.value)}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </div>

            <div className={styles.formField}>
              <Controller
                name="species"
                control={control}
                render={({ field }) => (
                  <Select
                    value={parseInt(field.value)}
                    options={PetSpecies}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Вид"
                  />
                )}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <div className={styles.formField}>
              <Controller
                name="hasSpecialNeeds"
                control={control}
                render={({ field }) => (
                  <Select
                    options={PetsSpecialNeeds}
                    value={parseInt(field.value)}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Особливості"
                  />
                )}
              />
            </div>

            <div className={styles.formField}>
              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <Select
                    options={PetSize}
                    value={parseInt(field.value)}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Розмір"
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.formField}>
            <label className={styles.label}>Характеристики</label>
            <PetFeaturesSelect control={control} />
          </div>

          <div className={styles.formField}>
            <Input
              label="Опис"
              placeholder="Лагідна муркотинка, яка обожнює цвірінь! Любить спати на колінах та спостерігати за світом з вікна"
              control={control}
              {...register('description')}
              error={errors.description}
            />
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Фото</label>
            <div {...getRootProps({ className: styles.dropzone })}>
              <input {...getInputProps()} />
              <div className={styles.uploadIcon}>
                <Icon
                  name="upload"
                  height={32}
                  width={32}
                  fill={colors.darkBlue}
                />
              </div>
              <p className={styles.dropzoneText}>
                Виберіть зображення
                <br />
                для завантаження
                <br />
                або перетягніть файли сюди
              </p>
            </div>
            {files.length > 0 && (
              <div className={styles.filePreview}>
                {files.map((file, index) => {
                  const imageSrc =
                    file instanceof File ? URL.createObjectURL(file) : file.url;
                  return (
                    <div
                      key={index}
                      className={styles.previewItem}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <Image
                        src={imageSrc}
                        alt={`Preview ${index}`}
                        className={styles.previewImage}
                        width={80}
                        height={80}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <Button variant="outline" onClick={onClose}>
              Скасувати
            </Button>
            <Button
              onClick={handleShowConfirm}
              disabled={updatePetMutation.isPending}
            >
              Оновити тваринку
            </Button>
          </div>
        </div>
      )}
      {showConfirm && (
        <div>
          <h3
            className="heading3"
            style={{ textAlign: 'center', marginBottom: '8px' }}
          >
            Оновлюємо?
          </h3>
          <p className={styles.content}>
            Здається, ти хочеш внести зміни. Переконайся, що все правильно –
            після цього повернення не буде!
          </p>

          <div className={styles.buttonWrapper}>
            <Button variant="outline" onClick={onClose}>
              Ні, скасувати
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>Так, оновити</Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
