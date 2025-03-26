'use client';

import { FC, JSX, ReactNode, useEffect } from 'react';
import styles from './styles.module.scss';

import ReactModal from 'react-modal';
import { Icon } from '../Icon/Icon';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  renderIconTitleIcon?: () => JSX.Element;
};

export const Modal: FC<Props> = ({
  isOpen = true,
  onClose,
  children,
  renderIconTitleIcon = () => <Icon name="logo" width={92} height={78} />,
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
      className={styles.modal}
      ariaHideApp={false}
    >
      <button className={styles.modalClose} onClick={onClose}>
        <Icon width={24} height={24} name="close" />
      </button>

      {renderIconTitleIcon && (
        <div className={styles.modalTitleIcon}>{renderIconTitleIcon?.()}</div>
      )}

      <div className={styles.modalBody}>{children}</div>
    </ReactModal>
  );
};
