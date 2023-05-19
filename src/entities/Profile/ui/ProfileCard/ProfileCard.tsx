import { useTranslation } from 'react-i18next';
import Input from '@mui/material/Input';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';
import { MaterialInputOnChangeType } from '@/shared/types/ui';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readonly?: boolean;
    onChangeLastname?: MaterialInputOnChangeType;
    onChangeFirstname?: MaterialInputOnChangeType;
    onChangeCity?: MaterialInputOnChangeType;
    onChangeAge?: MaterialInputOnChangeType;
    onChangeUsername?: MaterialInputOnChangeType;
    onChangeAvatar?: MaterialInputOnChangeType;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
    } = props;
    const { t } = useTranslation('profile');

    if (error) {
        return (
            <div
                className={classNames(cls.ProfileCard, {}, [
                    className,
                    cls.error,
                ])}
            >
                {t('error')}
            </div>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <Input
                value={data?.first}
                placeholder={t('Ваше имя')}
                className={cls.input}
                onChange={onChangeFirstname}
                disabled={readonly}
                data-testid="ProfileCard.firstname"
            />
            <Input
                value={data?.lastname}
                placeholder={t('Ваша фамилия')}
                className={cls.input}
                onChange={onChangeLastname}
                disabled={readonly}
                data-testid="ProfileCard.lastname"
            />
            <Input
                value={data?.age}
                placeholder={t('Ваш возраст')}
                className={cls.input}
                onChange={onChangeAge}
                disabled={readonly}
            />
            <Input
                value={data?.city}
                placeholder={t('Город')}
                className={cls.input}
                onChange={onChangeCity}
                disabled={readonly}
            />
            <Input
                value={data?.username}
                placeholder={t('Введите имя пользователя')}
                className={cls.input}
                onChange={onChangeUsername}
                disabled={readonly}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Введите ссылку на аватар')}
                className={cls.input}
                onChange={onChangeAvatar}
                disabled={readonly}
            />
        </div>
    );
};
