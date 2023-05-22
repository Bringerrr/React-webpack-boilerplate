import { Suspense } from 'react';
import { Modal } from '@mui/material';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginModal.module.scss';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, isOpen, onClose }: LoginModalProps) => (
    <Modal
        className={classNames(cls.LoginForm, {}, [className])}
        open={isOpen}
        onClose={onClose}
    >
        <Suspense fallback={<div />}>
            <LoginFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
