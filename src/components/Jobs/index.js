import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {FcClearFilters} from 'react-icons/fc'
import Header from '../Header'
import Profile from '../Profile'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobsItem from '../JobsItem'
import JobLocation from '../JobLocation'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobLocationsList = [
  {location: 'Hyderabad', locationId: 'HYDERABAD'},
  {location: 'Bangalore', locationId: 'BANGALORE'},
  {location: 'Chennai', locationId: 'CHENNAI'},
  {location: 'Delhi', locationId: 'DELHI'},
  {location: 'Mumbai', locationId: 'MUMBAI'},
]

class Jobs extends Component {
  state = {
    profile: '',
    jobsList: [],
    profileStatus: 'INITIAL',
    jobsStatus: 'INITIAL',
    employmentType: [],
    minimumPackage: '',
    jobLocation: [],
    userSearch: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobsList()
  }

  getProfile = async () => {
    this.setState({profileStatus: 'LOADING'})
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch('https://apis.ccbp.in/profile', {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })
    const data = await response.json()
    if (response.ok) {
      const profileDetails = data.profile_details

      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({profileStatus: 'SUCCESS', profile: updatedData})
    } else {
      this.setState({profileStatus: 'FAILURE'})
    }
  }

  getJobsList = async () => {
    this.setState({jobsStatus: 'LOADING'})
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, minimumPackage, userSearch, jobLocation} = this.state
    const typeOfEmployment =
      employmentType.length === 0 ? '' : employmentType.join(',')
    const locationOfJobs = jobLocation.length === 0 ? '' : jobLocation.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${typeOfEmployment}&minimum_package=${minimumPackage}&search=${userSearch}&location=${encodeURIComponent(
      locationOfJobs,
    )}`
    const response = await fetch(apiUrl, {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })
    const data = await response.json()
    if (response.ok) {
      const jobsData = data.jobs
      if (jobsData.length !== 0) {
        const jobsListDetails = jobsData.map(job => ({
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          title: job.title,
        }))
        this.setState({jobsStatus: 'SUCCESS', jobsList: jobsListDetails})
      } else {
        this.setState({jobsStatus: 'NO JOBS'})
      }
    } else {
      this.setState({jobsStatus: 'FAILURE'})
    }
  }

  refreshProfile = () => this.getProfile()

  selectEmploymentType = id =>
    this.setState(
      prevState => ({
        employmentType: prevState.employmentType.includes(id)
          ? prevState.employmentType.filter(type => type !== id)
          : [...prevState.employmentType, id],
      }),
      this.getJobsList,
    )

  selectMinimumPackage = id =>
    this.setState({minimumPackage: id}, this.getJobsList)

  selectJobLocation = id =>
    this.setState(
      prevState => ({
        jobLocation: prevState.jobLocation.includes(id)
          ? prevState.jobLocation.filter(location => location !== id)
          : [...prevState.jobLocation, id],
      }),
      this.getJobsList,
    )

  onChangeUserSearch = event => this.setState({userSearch: event.target.value})

  searchValue = () => this.getJobsList()

  refreshJobs = () => this.getJobsList()

  clearFilter = () =>
    this.setState(
      {employmentType: [], minimumPackage: '', userSearch: '', jobLocation: []},
      this.getJobsList,
    )

  render() {
    const {
      profile,
      profileStatus,
      jobsList,
      jobsStatus,
      employmentType,
      minimumPackage,
      userSearch,
      jobLocation,
    } = this.state

    console.log(jobLocation.join(','))
    return (
      <div className="job-bg-container">
        <Header />
        <div className="job-container">
          <div className="job-left-section">
            <div className="search-sm-container">
              <input
                type="search"
                placeholder="Search"
                value={userSearch}
                onChange={this.onChangeUserSearch}
                className="search-sm-input"
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.searchValue}
              >
                <BsSearch color="#ffffff" className="search-sm-icon" />
              </button>
            </div>
            <Profile
              profile={profile}
              profileStatus={profileStatus}
              refreshProfile={this.refreshProfile}
            />
            <hr color="#6366f1" />
            <EmploymentType
              employmentType={employmentType}
              employmentTypesList={employmentTypesList}
              selectEmploymentType={this.selectEmploymentType}
            />
            <hr color="#6366f1" />
            <SalaryRange
              minimumPackage={minimumPackage}
              salaryRangesList={salaryRangesList}
              selectMinimumPackage={this.selectMinimumPackage}
            />
            <hr color="#6366f1" />
            <JobLocation
              jobLocation={jobLocation}
              jobLocationsList={jobLocationsList}
              selectJobLocation={this.selectJobLocation}
            />
            <button
              type="button"
              className="clear-lg-button"
              onClick={this.clearFilter}
            >
              Clear Filter
            </button>
            <button
              type="button"
              className="clear-sm-button"
              onClick={this.clearFilter}
            >
              <FcClearFilters color="#ffffff" />
            </button>
          </div>
          <div className="job-right-section">
            <div className="search-lg-container">
              <input
                type="search"
                placeholder="Search"
                value={userSearch}
                onChange={this.onChangeUserSearch}
                className="search-lg-input"
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.searchValue}
              >
                <BsSearch color="#ffffff" className="search-lg-icon" />
              </button>
            </div>
            <JobsItem
              jobDetails={jobsList}
              jobsStatus={jobsStatus}
              refreshJobs={this.refreshJobs}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
