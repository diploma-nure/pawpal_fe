import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  color: string;
  className?: string;
};

export const AccentText: FC<Props> = ({ children, color, className }) => {
  return (
    <span className={className} style={{ color: color }}>
      {children}
    </span>
  );
};
