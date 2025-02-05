import {IoOpenOutline, IoLocationSharp} from 'react-icons/io5'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobDetails = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    id,
    jobDescription,
    skills,
    lifeAtCompany,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  const {description, imageUrl} = lifeAtCompany

  return (
    <div key={id} className="jobs-items-container">
      <div className="logo-header-contain">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="company-logo"
        />
        <div>
          <h1 className="company-heading">{title}</h1>
          <p className="company-rating">
            <FaStar color="#fbbf24" />
            {rating}
          </p>
        </div>
      </div>
      <div className="company-job-deitails">
        <div className="company-location-employ">
          <div className="company-location">
            <IoLocationSharp /> <p>{location}</p>
          </div>
          <div className="company-location">
            <BsBriefcaseFill /> <p>{employmentType}</p>
          </div>
        </div>
        <p className="company-location">{packagePerAnnum}</p>
      </div>
      <hr />
      <div className="description-visit-line">
        <h1 className="skill-description-life-heading">Description</h1>
        <a className="visit" href={companyWebsiteUrl} target="__blank">
          Visit <IoOpenOutline />
        </a>
      </div>
      <p className="job-description">{jobDescription}</p>
      <h1 className="skill-description-life-heading">Skills</h1>
      <ul className="skills-list">
        {skills.map(skill => (
          <li className="skill" key={skill.name}>
            <img className="skill-img" src={skill.imageUrl} alt={skill.name} />
            <p className="skill-name">{skill.name}</p>
          </li>
        ))}
      </ul>
      <h1 className="skill-description-life-heading">Life at Company</h1>
      <div className="life-at-company-container">
        <p className="life-at-company-paragraph">{description}</p>
        <img
          className="life-at-company-img"
          src={imageUrl}
          alt="life at company"
        />
      </div>
    </div>
  )
}

export default JobDetails
