import clsx from 'clsx';
import { FC } from 'react';
import styles from './styles.module.scss';

type DividerVariant = 'beige';

type Props = {
  variant: DividerVariant;
};

export const Divider: FC<Props> = ({ variant = 'beige' }) => {
  return <div className={clsx(styles.divider, styles[`divider-${variant}`])} />;
};
