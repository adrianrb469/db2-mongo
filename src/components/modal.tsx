"use client";
import { useRef, useEffect } from "react";

interface ModalProps {
  title: string;

  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ title, visible, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleESC = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <dialog ref={modalRef} className="modal" onCancel={handleESC}>
      <div className="modal-box">
        <h3 className="font-bold text-xl">{title}</h3>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
