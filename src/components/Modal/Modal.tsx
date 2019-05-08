import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Styles
import { ModalBackdrop } from './Modal-styles';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

export const Modal = ({
  children,
  isOpen,
  onClose,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  const handleModalOnClose = () => {
    setShowModal(false);

    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (showModal) ? createPortal(
    <ModalBackdrop onClick={handleModalOnClose}>
      {children}
    </ModalBackdrop>,
    window.document.body,
  ) : null;
};
