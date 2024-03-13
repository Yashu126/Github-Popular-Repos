// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {name, avatarUrl, starsCount, issuesCount, forksCount} = eachRepo
  return (
    <li className="items-li">
      <img className="item-img" src={avatarUrl} alt={name} />
      <h1 className="item-name">{name}</h1>
      <div className="logo-cont-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          width="15"
        />
        <p className="count">{starsCount} stars</p>
      </div>
      <div className="logo-cont-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          width="15"
        />
        <p className="count">{forksCount} forks</p>
      </div>
      <div className="logo-cont-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          width="15"
        />
        <p className="count">{issuesCount} issuess</p>
      </div>
    </li>
  )
}

export default RepositoryItem
