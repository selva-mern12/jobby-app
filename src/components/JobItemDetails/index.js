import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import SimilarJobs from '../SimilarJobs'
import JobDetails from '../JobDetails'
import Header from '../Header'
import './index.css'

class JobsItemDetails extends Component {
  state = {jobDetails: '', jobDetailsStatus: 'INITIAL', similarJobs: ''}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobDetailsStatus: 'LOADING'})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })
    const data = await response.json()
    if (response.ok) {
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map(skill => ({
          imageUrl: skill.image_url,
          name: skill.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const similarJobs = data.similar_jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobDetails,
        jobDetailsStatus: 'SUCCESS',
        similarJobs,
      })
    } else {
      this.setState({jobDetailsStatus: 'FAILURE'})
    }
  }

  refreshJobDetails = () => this.getJobDetails()

  renderJobItemsDetails = () => {
    const {jobDetailsStatus, jobDetails, similarJobs} = this.state
    switch (jobDetailsStatus) {
      case 'LOADING':
        return (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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
            <p>We cannot seem to find the page you are looking for.</p>
            <button type="button" onClick={this.refreshJobDetails}>
              Retry
            </button>
          </div>
        )
      case 'SUCCESS':
        return (
          <div>
            <Header />
            <div className="jobItemDetails-container">
              <JobDetails key={jobDetails.id} jobDetails={jobDetails} />
              <h1 className="similar">Similar Jobs</h1>
              <ul className="similar-jobs-container">
                {similarJobs.map(job => (
                  <SimilarJobs key={job.id} jobDetails={job} />
                ))}
              </ul>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderJobItemsDetails()}</div>
  }
}

export default JobsItemDetails

// const jobItemDetails = {
//   jobDetails: {
//     companyLogoUrl: data.job_details.company_logo_url,
//     companyWebsiteUrl: data.job_details.company_website_url,
//     employmentType: data.job_details.employment_type,
//     id: data.job_details.id,
//     jobDescription: data.job_details.job_description,
//     skills: data.job_details.skills.map(skill => ({
//       imageUrl: skill.image_url,
//       name: skill.name,
//     })),
//     lifeAtCompany: {
//       description: data.job_details.life_at_company.description,
//       imageUrl: data.job_details.life_at_company.image_url,
//     },
//     location: data.job_details.location,
//     packagePerAnnum: data.job_details.package_per_annum,
//     rating: data.job_details.rating,
//     title: data.job_details.title,
//   },
//   similarJobs: data.similar_jobs.map(job => ({
//     companyLogoUrl: job.company_logo_url,
//     employmentType: job.employment_type,
//     id: job.id,
//     jobDescription: job.job_description,
//     location: job.location,
//     rating: job.rating,
//     title: job.title,
//   })),
// }
