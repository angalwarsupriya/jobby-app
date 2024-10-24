import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => (
  <div className="home-con">
    <Header />
    <div className="home-bg">
      <h1 className="home-hea">Find The Job That Fits Your Life </h1>
      <p className="home-dis">
        Millions of people are searching for jobs, salary information, company
        reviews. Find tha jobs that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" data-testid="searchButton" className="home-btn">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
