import {withRouter} from 'react-router-dom'
import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar, FaShareSquare} from 'react-icons/fa'
import './index.css'

const JobCard = props => {
  const {eachJob, showingSpecificJobPage} = props
  const clickingOnJobCard = () => {
    const {history} = props
    history.replace(`/jobs/${eachJob.id}`)
  }
  return (
    <li className="li" onClick={clickingOnJobCard}>
      <div className="jobCard-card">
        <div className="job-card-logo-con">
          <div>
            <img
              alt="company logo"
              className="job-card-logo-img"
              src={eachJob.company_logo_url}
            />
          </div>

          <div className="job-card-name-rating-con">
            <div>
              <h1 className="job-card-title">{eachJob.title}</h1>
            </div>
            <div className="job-card-rating-con">
              <FaStar className="stars" />
              <p className="job-card-rating">{eachJob.rating}</p>
            </div>
          </div>
        </div>

        <div className="row-con">
          <div className="row-con1">
            <div className="row1">
              <IoLocationOutline className="icons" />
              <p className="p">{eachJob.location}</p>
            </div>
            <div className="row2">
              <BsBriefcaseFill className="icons" />
              <p className="p">{eachJob.employment_type}</p>
            </div>
          </div>
          <div className="row-con2">
            <div className="row3">
              <p className="salary">{eachJob.package_per_annum}</p>
            </div>
          </div>
        </div>
        <hr />
        <h4 className="discription-hea">Description</h4>
        <p className="discription-p">{eachJob.job_description}</p>
      </div>
    </li>
  )
}
export default withRouter(JobCard)
