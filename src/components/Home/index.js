import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const gotoJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="home-container">
      <Header />
      <div className="home-bg-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button className="find-jobs" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
