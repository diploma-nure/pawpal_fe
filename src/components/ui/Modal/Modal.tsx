'use client';

import { FC, JSX, ReactNode, useEffect } from 'react';
import styles from './styles.module.scss';

import clsx from 'clsx';
import ReactModal from 'react-modal';
import { Icon } from '../Icon/Icon';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  renderTitleIcon?: () => JSX.Element | null;
  className?: string;
};

export const Modal: FC<Props> = ({
  isOpen = true,
  onClose,
  children,
  renderTitleIcon = () => <Icon name="logo" width={92} height={78} />,
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      overlayClassName={styles.overlay}
      className={clsx(styles.modal, className)}
      ariaHideApp={false}
    >
      <button className={styles.modalClose} onClick={onClose}>
        <Icon width={24} height={24} name="close" />
      </button>

      {renderTitleIcon && (
        <div className={styles.modalTitleIcon}>{renderTitleIcon?.()}</div>
      )}

      <div className={styles.modalBody}>{children}</div>
    </ReactModal>
  );
};
