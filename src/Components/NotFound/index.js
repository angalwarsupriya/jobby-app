import './index.css'

const NotFound = () => (
  <div className="not-found-con">
    <img
      alt="not found"
      className="notfound-img"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
    />
    <h1 className="notfound-hea">Page Not Found</h1>
    <p className="notfound-p">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
