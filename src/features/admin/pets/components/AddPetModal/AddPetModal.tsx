'use client';

import { Button, Icon, Input, Modal, Select } from '@/components/ui';
import { PetFeaturesSelect } from '@/features/pets/components';
import { useAddPet } from '@/features/pets/hooks/useAddPet';
import {
  PetAge,
  PetGender,
  PetSize,
  PetSpecies,
  PetsSpecialNeeds,
} from '@/features/pets/types';
import { colors } from '@/styles/colors';
import Image from 'next/image';
import { FC, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
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

export const AddPetModal: FC<Props> = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  const addPetMutation = useAddPet();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    reset,
  } = useForm<PetFormData>({
    defaultValues: {
      name: '',
      age: '',
      gender: '',
      species: '',
      size: '',
      hasSpecialNeeds: '',
      characteristics: [],
      description: '',
      images: [],
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const onSubmit = async (data: PetFormData) => {
    const payload = {
      Name: data.name,
      Species: parseInt(data.species),
      Gender: parseInt(data.gender),
      Size: parseInt(data.size),
      Age: parseInt(data.age),
      HasSpecialNeeds: parseInt(data.hasSpecialNeeds) === 1,
      FeaturesIds: data.characteristics ?? [],
      Description: data.description,
      Pictures: files,
    };
    const res = await addPetMutation.mutateAsync(payload);

    if (!res.errors) {
      onClose();
    }
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.addPetModal}>
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
                  value={parseInt(field.value)}
                  onChange={(value) => field.onChange(value)}
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
              {files.map((file, index) => (
                <div key={index} className={styles.previewItem}>
                  <Image
                    width={72}
                    height={72}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className={styles.previewImage}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <Button variant="outline" onClick={handleClose}>
            Скасувати
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>Додати тваринку</Button>
        </div>
      </div>
    </Modal>
  );
};
