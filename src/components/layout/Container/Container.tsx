import clsx from 'clsx';
import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  children: ReactNode;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const Container: FC<Props> = ({ children, className, ...restProps }) => {
  return (
    <div {...restProps} className={clsx(styles.container, className)}>
      {children}
    </div>
  );
};
