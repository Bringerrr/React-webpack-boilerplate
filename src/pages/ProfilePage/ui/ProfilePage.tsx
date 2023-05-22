import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/editableProfileCard';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation();
    const user = JSON.parse(localStorage.getItem('user') || '');

    return (
        <Page
            data-testid="ProfilePage"
            className={classNames('', {}, [className])}
        >
            {user?.id ? (
                <div>
                    <EditableProfileCard id={user.id} />
                </div>
            ) : (
                <p>{t('Profile not found')} </p>
            )}
        </Page>
    );
};

export default ProfilePage;
