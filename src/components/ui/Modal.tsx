import {forwardRef, ReactNode} from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(
    ({isOpen, onClose, title, children}, ref) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-md" ref={ref}>
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="p-4">{children}</div>
                </div>
            </div>
        );
    }
);

Modal.displayName = 'Modal';
export default Modal;