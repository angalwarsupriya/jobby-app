import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
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
const statusList = {
  initial: 'INITIAL',
  inprogress: 'IN PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  nojobsfound: 'NO JOBS FOUND',
}

class Jobs extends Component {
  // STATE INITIALZATION
  state = {
    minimumPackage: 0,
    search: '',
    employmentTypeList: [],
    resultsList: [],
    pageStatus: statusList.initial,
    profileStatus: statusList.initial,
    profileDetailsList: {},
  }

  // COMPONENT DID MOUND METHOD IN LIFE CYCLE
  componentDidMount() {
    this.fetchingData()
    this.fetchingProfileData()
  }

  // FETCHING JOBS DATA FUNCTION
  fetchingData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({
      pageStatus: statusList.inprogress,
    })
    const {minimumPackage, search, employmentTypeList} = this.state

    const resultsLi = ['FULLTIME', 'PARTTIME', 'FREELANCE', 'INTERNSHIP']

    let realList = null
    if (employmentTypeList.length === 0) {
      realList = resultsLi
    } else {
      realList = employmentTypeList
    }
    const jo = realList.join(',')

    const fetchingJobs = `https://apis.ccbp.in/jobs?employment_type=${jo}&minimum_package=${minimumPackage}&search=${search}`

    const optionsJobs = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const fetchingJobsDetails = await fetch(fetchingJobs, optionsJobs)
    const detailsOfJobs = await fetchingJobsDetails.json()

    if (fetchingJobsDetails.ok === true) {
      if (detailsOfJobs.jobs.length === 0) {
        this.setState({
          pageStatus: statusList.nojobsfound,
        })
      } else {
        this.setState({
          resultsList: detailsOfJobs.jobs,
          pageStatus: statusList.success,
        })
      }
    } else {
      this.setState({pageStatus: statusList.failure})
    }
  }

  // FETCHING PROFILE DETAILS FUNCTION
  fetchingProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({
      profileStatus: statusList.inprogress,
    })
    const getProfileUrl = 'https://apis.ccbp.in/profile'
    const getProfileOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const getProfileResponse = await fetch(getProfileUrl, getProfileOptions)
    const profilesDetails = await getProfileResponse.json()

    if (getProfileResponse.ok === true) {
      this.setState({
        profileDetailsList: profilesDetails.profile_details,
        profileStatus: statusList.success,
      })
    } else {
      this.setState({profileStatus: statusList.failure})
    }
  }

  // STATE UPDATING FUNCTION WHILE CLICKING ON INPUTS
  onSearchInput = event => {
    this.setState({search: event.target.value})
  }

  onClickingOnchechbox = event => {
    const {employmentTypeList} = this.state
    const isIn = employmentTypeList.includes(event.target.id)

    if (isIn) {
      const filteredData = employmentTypeList.filter(
        eachItem => eachItem !== event.target.id,
      )
      this.setState({employmentTypeList: filteredData}, this.fetchingData)
    } else {
      this.setState(
        prev => ({
          employmentTypeList: [...prev.employmentTypeList, event.target.id],
        }),
        this.fetchingData,
      )
    }
  }

  onClickingOnRadio = event => {
    this.setState({minimumPackage: event.target.id}, this.fetchingData)
  }

  getSearchingResult = () => {
    this.fetchingData()
  }

  // DISPLAY JOBS WHEN PAGESTATUS IS SUCCESS
  displayJobs = () => {
    const {resultsList} = this.state
    return (
      <div className="con-con">
        <ul className="ul">
          {resultsList.map(eachJob => (
            <JobCard
              eachJob={eachJob}
              key={eachJob.id}
              showingSpecificJobPage={this.showingSpecificJobPage}
            />
          ))}
        </ul>
      </div>
    )
  }

  // NO JOBS FOUND VIEW WHEN THERE IS NO JOBS AFTER FILTERING PROCESS
  noJobsFoundView = () => (
    <div className="jobs-failure-con">
      <img
        alt="no jobs"
        className="no-jobs-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="failure-hea">No Jobs Found</h1>
      <p className="failure-p">We could not find any jobs. Try other filters</p>
    </div>
  )

  // FAILURE VIEW WHEN GETJOBS API FAILRE
  displayFailureJobView = () => (
    <div className="jobs-failure-con">
      <img
        alt="failure view"
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-hea">Oops! Something Went Wrong</h1>
      <p className="failure-p">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.fetchingData} type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  // DISPLAY LOADING VIEW UNTIL GETTING SUCCESS VIEW
  displayLoading = () => (
    <div className="loader-view" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  displayProfileFailreView = () => (
    <div>
      <button
        onClick={this.fetchingProfileData}
        type="button"
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  // DISPLAY PROFILE SUCCESS VIEW
  displayProfile = () => {
    const {profileDetailsList} = this.state

    return (
      <div className="profile-bg-con">
        <img
          alt="profile"
          className="profile-img"
          src={profileDetailsList.profile_image_url}
        />
        <h1 className="user-name">{profileDetailsList.name}</h1>
        <p className="user-bio">{profileDetailsList.short_bio}</p>
      </div>
    )
  }

  // DISPLAY ANY VIEW BASED ON THE SWITCH WHICH IS DISION MAKER
  displayBasedOnStatus = () => {
    const {pageStatus} = this.state

    switch (pageStatus) {
      case statusList.inprogress:
        return this.displayLoading()
      case statusList.success:
        return this.displayJobs()
      case statusList.failure:
        return this.displayFailureJobView()
      case statusList.nojobsfound:
        return this.noJobsFoundView()
      default:
        return null
    }
  }

  // DISPLAYING PROFILE VIEW BASED ON PROFILE STATUS
  displayProfileViewBasedOnprofileState = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case statusList.inprogress:
        return this.displayLoading()
      case statusList.success:
        return this.displayProfile()
      case statusList.failure:
        return this.displayBasedOnStatus()
      default:
        return null
    }
  }

  // RENDER METHOD
  render() {
    const {search} = this.state
    // RETURN METHOD FOR DISPLAYING UI
    return (
      <div className="jobs-con">
        <Header />

        <div className="search-con">
          <input
            className="search-bar"
            type="search"
            value={search}
            placeholder="search"
            onChange={this.onSearchInput}
          />
          <button
            className="btn-btn"
            type="button"
            data-testid="searchButton"
            aria-label="search"
          >
            <BsSearch
              className="search-icon"
              onClick={this.getSearchingResult}
            />
          </button>
        </div>

        <div className="jobs-main-con">
          <div className="jobs-filter-con">
            <div className="user-profile-con">
              {this.displayProfileViewBasedOnprofileState()}
            </div>
            <div>
              <ul className="filter-ul">
                <h1 className="hea">Type of Employment</h1>
                {employmentTypesList.map(item => (
                  <li className="checkbox-con" key={item.employmentTypeId}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={item.label}
                      onChange={this.onClickingOnchechbox}
                      id={item.employmentTypeId}
                    />

                    <label className="label">{item.label}</label>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
            <ul className="filter-ul">
              <h1 className="hea">Salary Range</h1>
              {salaryRangesList.map(item => (
                <li className="checkbox-con" key={item.salaryRangeId}>
                  <input
                    type="radio"
                    className="checkbox"
                    id={item.salaryRangeId}
                    name="radio"
                    onClick={this.onClickingOnRadio}
                  />

                  <label className="label">{item.label}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="jobs-displaying-con">
            {this.displayBasedOnStatus()}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
