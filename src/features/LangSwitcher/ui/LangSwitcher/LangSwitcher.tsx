import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Button } from '@mui/material';
import { classNames } from '@/shared/lib/classNames/classNames';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = memo(({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
    };

    return (
        <Button className={classNames('', {}, [className])} onClick={toggle}>
            {t('Lang')}
        </Button>
    );
});
