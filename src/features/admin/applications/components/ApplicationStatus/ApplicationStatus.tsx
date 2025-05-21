import { Icon } from '@/components/ui';
import { applicationStatuses } from '@/features/admin/applications/constants';
import { colors } from '@/styles/colors';
import { FC } from 'react';
import styles from './styles.module.scss';

type Props = {
  status: number;
};

export const ApplicationStatus: FC<Props> = ({ status }) => {
  const applicationStatus = applicationStatuses.find((s) => s.value === status);

  const renderIcon = () => {
    switch (applicationStatus?.value) {
      case 0:
        return <Icon name="clock" width={24} height={24} fill={colors.grey} />;
      case 1:
        return (
          <Icon
            name="approved"
            width={24}
            height={24}
            fill={colors.lightGreen}
          />
        );
      case 2:
        return (
          <Icon name="video" width={24} height={24} fill={colors.lightOrange} />
        );
      case 3:
        return (
          <Icon name="hourglass" width={24} height={24} fill={colors.pink} />
        );
      case 4:
        return <Icon name="smile" width={24} height={24} fill={colors.green} />;
      case 5:
        return <Icon name="reject" width={24} height={24} fill={colors.red} />;
    }
  };

  return (
    <div className={styles.status}>
      <div className={styles.iconWrapper}>{renderIcon()}</div>
      <p className={styles.statusText} data-color={applicationStatus?.value}>
        {applicationStatus?.title}
      </p>
    </div>
  );
};
