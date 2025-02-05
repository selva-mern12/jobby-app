import Loader from 'react-loader-spinner'
import './index.css'

const Profile = props => {
  const {profile, profileStatus, refreshProfile} = props
  const {profileImageUrl, name, shortBio} = profile
  const renderProfile = () => {
    switch (profileStatus) {
      case 'LOADING':
        return (
          <div className="loader-container profile-loader" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'FAILURE':
        return (
          <div className="profile-failure">
            <button
              className="retry-profile-button"
              type="button"
              onClick={() => refreshProfile()}
            >
              Retry
            </button>
          </div>
        )
      case 'SUCCESS':
        return (
          <div className="profile-bg-container">
            <img src={profileImageUrl} alt="profile" className="profile-img" />
            <h1 className="profile-user-name">{name}</h1>
            <p className="profile-user-bio">{shortBio}</p>
          </div>
        )
      default:
        return null
    }
  }

  return <div>{renderProfile()}</div>
}

export default Profile
