import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { ProfileCard } from '@/entities/Profile';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ValidateProfileError } from '../../model/consts/consts';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';
import { MaterialInputOnChangeType } from '@/shared/types/ui';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileError.SERVER_ERROR]: t(
            'Серверная ошибка при сохранении',
        ),
        [ValidateProfileError.NO_DATA]: t('Данные не указаны'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t(
            'Имя и фамилия обязательны',
        ),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    };

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    const onChangeFirstname: MaterialInputOnChangeType = useCallback(
        (event) => {
            dispatch(
                profileActions.updateProfile({
                    first: event.target.value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeLastname: MaterialInputOnChangeType = useCallback(
        (event) => {
            dispatch(
                profileActions.updateProfile({
                    lastname: event.target.value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeCity: MaterialInputOnChangeType = useCallback(
        (event) => {
            dispatch(
                profileActions.updateProfile({
                    city: event.target.value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeAge: MaterialInputOnChangeType = useCallback(
        (event) => {
            dispatch(
                profileActions.updateProfile({
                    age: Number(event.target.value || 0),
                }),
            );
        },
        [dispatch],
    );

    const onChangeUsername: MaterialInputOnChangeType = useCallback(
        (event) => {
            dispatch(
                profileActions.updateProfile({
                    username: event.target.value || '',
                }),
            );
        },
        [dispatch],
    );

    const onChangeAvatar: MaterialInputOnChangeType = useCallback(
        (event) => {
            dispatch(
                profileActions.updateProfile({
                    avatar: event.target.value || '',
                }),
            );
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={classNames('', {}, [className])}>
                <EditableProfileCardHeader />
                {validateErrors?.length &&
                    validateErrors.map((err) => (
                        <p>{validateErrorTranslates[err]}</p>
                    ))}
                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                />
            </div>
        </DynamicModuleLoader>
    );
});
