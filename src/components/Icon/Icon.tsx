import sprite from '@/assets/icons/sprite.svg';
import { FC } from 'react';
import { IconName } from './Icon.typedefs';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon: FC<IconProps> = ({
  name,
  className,
  fill = '#020454',
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      role="img"
      aria-hidden="true"
      fill={fill}
      {...props}
    >
      <use xlinkHref={`${sprite.src}#icon-${name}`} />
    </svg>
  );
};
