import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Styles
import { ModalBackdrop, ModalContentWrapper } from './Modal-styles';

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

  const ignoreOnClickEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (showModal) ? createPortal(
    <ModalBackdrop onClick={handleModalOnClose}>
      <ModalContentWrapper onClick={ignoreOnClickEvent}>
        {children}
      </ModalContentWrapper>
    </ModalBackdrop>,
    window.document.body,
  ) : null;
};
