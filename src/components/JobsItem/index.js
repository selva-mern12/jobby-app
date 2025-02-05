import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsItem = props => {
  const {jobDetails, jobsStatus, refreshJobs} = props

  const renderJobs = () => {
    switch (jobsStatus) {
      case 'LOADING':
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        )
      case 'NO JOBS':
        return (
          <div className="no-jobs">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
          </div>
        )
      case 'FAILURE':
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for</p>
            <button
              className="retry-button"
              type="button"
              onClick={() => refreshJobs()}
            >
              Retry
            </button>
          </div>
        )
      case 'SUCCESS':
        return (
          <ul>
            {jobDetails.map(job => {
              const {
                companyLogoUrl,
                employmentType,
                id,
                jobDescription,
                location,
                packagePerAnnum,
                rating,
                title,
              } = job

              return (
                <li key={id} className="job-item-container">
                  <Link to={`/jobs/${id}`} className="nav-link">
                    <div className="logo-heading-container">
                      <img
                        src={companyLogoUrl}
                        alt="company logo"
                        className="job-logo"
                      />
                      <div className="rat-head-cont">
                        <h1 className="job-heading">{title}</h1>
                        <p className="rating">
                          <FaStar color="#fbbf24" /> {rating}
                        </p>
                      </div>
                    </div>
                    <div className="job-details">
                      <div className="location-employ">
                        <div className="location">
                          <IoLocationSharp color="#ffffff" /> <p>{location}</p>
                        </div>
                        <div className="location">
                          <BsBriefcaseFill color="#ffffff" />{' '}
                          <p>{employmentType}</p>
                        </div>
                      </div>
                      <p className="package">{packagePerAnnum}</p>
                    </div>
                    <hr color="#6366f1" />
                    <h1 className="description-heading">Description</h1>
                    <p className="job-description">{jobDescription}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        )
      default:
        return null
    }
  }

  return <div>{renderJobs()}</div>
}

export default JobsItem
