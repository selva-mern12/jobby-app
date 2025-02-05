import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails
  return (
    <li key={id} className="similar-jobs">
      <Link to={`/jobs/${id}`} className="similar-nav-link">
        <div className="similar-logo-header-contain">
          <img
            className="similar-company-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div>
            <h1 className="similar-company-heading ">{title}</h1>
            <p className="similar-company-rating">
              <FaStar color="#fbbf24" />
              {rating}
            </p>
          </div>
        </div>
        <h1 className="similar-description-heading">Description</h1>
        <p>{jobDescription}</p>
        <div className="similar-company-location-employ">
          <div>
            <IoLocationSharp /> <p className="loc-emp">{location}</p>
          </div>
          <div>
            <BsBriefcaseFill /> <p className="loc-emp">{employmentType}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobs
