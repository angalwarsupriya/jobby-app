import {IoLocationOutline} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar, FaShareSquare} from 'react-icons/fa'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
import './index.css'

class SpecificJobItem extends Component {
  state = {pageStatus: 'initial', jobDetails: [], similarJobs: []}

  componentDidMount() {
    this.getjobDetails()
  }

  getjobDetails = async () => {
    this.setState({pageStatus: 'inprogress'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({pageStatus: 'inprogress'})

    const jwtToken = Cookies.get('jwt_token')
    const jobFechingOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const url = `https://apis.ccbp.in/jobs/${id}`
    const fetchSpecificJobDetails = await fetch(url, jobFechingOptions)
    const getJobDetails = await fetchSpecificJobDetails.json()
    const getSpecifiJobDetails = getJobDetails.job_details
    console.log(getJobDetails)
    if (fetchSpecificJobDetails.ok === true) {
      const jobDetailsNewObject = {
        companyLogoUrl: getSpecifiJobDetails.company_logo_url,
        companyWebsiteUrl: getSpecifiJobDetails.company_website_url,
        jobDescription: getSpecifiJobDetails.job_description,
        employmentType: getSpecifiJobDetails.employment_type,
        description: getSpecifiJobDetails.life_at_company.description,
        lifeAtCompanyImgUrl: getSpecifiJobDetails.life_at_company.image_url,
        location: getSpecifiJobDetails.location,
        packagePerAnnum: getSpecifiJobDetails.package_per_annum,
        rating: getSpecifiJobDetails.rating,
        skills: getSpecifiJobDetails.skills,
        title: getSpecifiJobDetails.title,
        similarJobs: getSpecifiJobDetails.similar_jobs,
      }

      this.setState({
        pageStatus: 'success',
        jobDetails: jobDetailsNewObject,
        similarJobs: getJobDetails.similar_jobs,
      })
    } else {
      this.setState({pageStatus: 'failure'})
    }
  }

  displaySuccessView = () => {
    const {jobDetails, similarJobs} = this.state

    return (
      <div className="specific-job-con">
        <div className="specific-job-information-card">
          <div className="specific-job-logo-info-con">
            <div>
              <img
                alt="job details company logo"
                className="specific-job-logo-img"
                src={jobDetails.companyLogoUrl}
              />
            </div>

            <div className="specific-job-title-rating-con">
              <h1 className="specific-job-title">{jobDetails.title}</h1>
              <div className="specific-job-rating-con">
                <FaStar className="star" />
                <p className="specific-job-rating">{jobDetails.rating}</p>
              </div>
            </div>
          </div>

          <div className="row-con">
            <div className="row-con1">
              <div className="row1">
                <IoLocationOutline className="location" />
                <p className="p">{jobDetails.location}</p>
              </div>
              <div className="row2">
                <BsBriefcaseFill className="employment-type-icon" />
                <p className="p">{jobDetails.employmentType}</p>
              </div>
            </div>
            <div className="row-con2">
              <div className="row3">
                <p className="salary">{jobDetails.packagePerAnnum}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="discription-web-link-row">
            <h4 className="discription-hea">Description</h4>
            <div className="visit-con">
              <a href={jobDetails.companyWebsiteUrl}>Visit</a>
              <FaShareSquare className="share-link" />
            </div>
          </div>
          <p className="discription-p">{jobDetails.jobDescription}</p>
          <h4 className="skills-hea">Skills</h4>
          <ul className="skills-displaing-con">
            {jobDetails.skills.map(eachSkill => (
              <li className="skill-li" key={eachSkill.id}>
                <img
                  src={eachSkill.image_url}
                  alt={eachSkill.name}
                  className="skill-img"
                />
                <p className="skill-name">{eachSkill.name}</p>{' '}
              </li>
            ))}
          </ul>
          <h1 className="life-at-company-hea">Life at Company</h1>
          <div className="life_at_company-dis-con">
            <p className="life-at-company-dis">{jobDetails.description}</p>
            <img
              alt="life at company"
              className="sample-img"
              src={jobDetails.lifeAtCompanyImgUrl}
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-title">Similar Jobs</h1>

          <ul className="similar-jobs-cards-container">
            {similarJobs.map(eachSimilarJob => (
              <li className="similar-job-card" key={eachSimilarJob.id}>
                <div className="specific-job-logo-info-con">
                  <img
                    alt=" similar job company logo"
                    className="similar-job-company-logo"
                    src={eachSimilarJob.company_logo_url}
                  />
                  <div className="specific-job-title-rating-con">
                    <h1 className="similar-job-card-title">
                      {eachSimilarJob.title}
                    </h1>
                    <div className="similar-job-rating-con">
                      <FaStar className="small-star" />
                      <p className="rating-num">{eachSimilarJob.rating}</p>
                    </div>
                  </div>
                </div>

                <div className="similar-job-dis-con">
                  <h1 className="similar-job-card-dis-hea">Description</h1>
                  <p className="similar-job-card-dis-para">
                    {eachSimilarJob.job_description}
                  </p>
                </div>
                <div className="similar-job-card-bottom">
                  <div className="location-part">
                    <IoLocationOutline className="location" />
                    <p className="location-p">{eachSimilarJob.location}</p>
                  </div>
                  <div className="employment-type-part">
                    <p className="location-p">
                      <BsBriefcaseFill className="employment-type-icon" />
                      {eachSimilarJob.employment_type}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  displayFailureJobView = () => (
    <div className="jobs-failure">
      <img
        alt="failure view"
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-hea">Oops! Something Went Wrong</h1>
      <p className="failure-p">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.getjobDetails} type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  displayLoading = () => (
    <div className="loader-view">
      <Loader type="ThreeDots" height="80" width="80" color="#ffffff" />
    </div>
  )

  displayPageViews = () => {
    const {pageStatus} = this.state
    switch (pageStatus) {
      case 'inprogress':
        return this.displayLoading()
      case 'failure':
        return this.displayFailureJobView()
      case 'success':
        return this.displaySuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-job-item-con">
        <Header />
        <div>{this.displayPageViews()}</div>
      </div>
    )
  }
}

export default withRouter(SpecificJobItem)
