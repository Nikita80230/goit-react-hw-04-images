import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ onCloseModal, modalPhoto }) => {
    const handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            onCloseModal();
        }
    };

    useEffect(() => {
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
                onCloseModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onCloseModal])

    return (
        <div className={css.overlay} onClick={handleOverlayClick}>
            <div className={css.modal}>
                <img
                    onClick={onCloseModal}
                    src={modalPhoto}
                    alt=""
                />
            </div>
        </div>
    );
}
