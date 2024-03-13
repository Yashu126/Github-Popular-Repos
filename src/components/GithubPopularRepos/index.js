import './index.css'

import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'

import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const pageStatus = {
  initial: 'INITIAL',
  isLoading: 'LOADING',
  pageFailed: 'FAILURE',
  onSuccess: 'SUCSESS',
}

class GithubPopularRepos extends Component {
  state = {
    updatedStatus: pageStatus.initial,
    selectedLang: languageFiltersData[0].id,
    popularRepos: [],
  }

  componentDidMount() {
    this.getRepos()
  }

  onChangeLanguage = lang => {
    this.setState({selectedLang: lang}, this.getRepos)
  }

  getRepos = async () => {
    this.setState({updatedStatus: pageStatus.isLoading})
    const {selectedLang} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${selectedLang}`
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const formatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        popularRepos: formatedData,
        updatedStatus: pageStatus.onSuccess,
      })
    } else if (response.status === 401) {
      this.setState({updatedStatus: pageStatus.pageFailed})
    }
  }

  onLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderRepos = () => {
    const {popularRepos} = this.state
    return (
      <ul className="items-ul">
        {popularRepos.map(eachRepo => (
          <RepositoryItem eachRepo={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  renderFailed = () => (
    <div className="failure-con">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        width="50"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  getHomePage = () => {
    const {updatedStatus} = this.state
    switch (updatedStatus) {
      case pageStatus.isLoading:
        return this.onLoading()
      case pageStatus.onSuccess:
        return this.renderRepos()
      case pageStatus.pageFailed:
        return this.renderFailed()
      default:
        return null
    }
  }

  render() {
    const {selectedLang} = this.state
    return (
      <div className="background-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="btn-ul">
          {languageFiltersData.map(eachBtn => (
            <LanguageFilterItem
              selectedLang={selectedLang}
              onChangeLanguage={this.onChangeLanguage}
              key={eachBtn.id}
              eachBtn={eachBtn}
            />
          ))}
        </ul>
        {this.getHomePage()}
      </div>
    )
  }
}
export default GithubPopularRepos
