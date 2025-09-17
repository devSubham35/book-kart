import AccountHeader from '../components/AccountHeader'
import ProfileForm from '../components/profile/ProfileForm'

const ProfileUI = () => {
    return (
        <>
            <AccountHeader
                title="My Profile"
                description="Manage your personal information and preferences"
            />
            <div className="mt-4">
                <ProfileForm />
            </div>
        </>
    )
}

export default ProfileUI