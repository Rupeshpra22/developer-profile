import React, { Component } from 'react'
import { withRouter } from 'react-router'
import './Developer.css'
import codechef from '../../assets/codechef.png'
import github from '../../assets/github.png'
import hackerrank from '../../assets/hackerrank.png'
import linkedin from '../../assets/linkedin.png'
import medium from '../../assets/medium.png'
import twitter from '../../assets/twitter.png'
import email from '../../assets/email.svg'
import blog from '../../assets/blog.svg'
import company from '../../assets/company.svg'
import location from '../../assets/location.svg'
import redirect from '../../assets/redirect.svg'
import Footer from '../Footer/Footer'
class Developer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            developerInfo: [],
            repos: []
        }
    }


    componentDidMount() {
        fetch('/api' + this.props.location.pathname)
            .then(response => response.json())
            .then(data => {
                this.setState({ developerInfo: data })
                return this.state.developerInfo[0].repos_url
            })
            .then(repo => fetch(repo))
            .then(res => res.json())
            .then(data => {
                this.setState({ repos: data })
            })
    }

    navigateToHome = () => {
        this.props.history.push("/")
    }

    render() {
        console.log(this.state)
        const Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return (
            <div>
                <header>
                    <div>The Developer Profile</div>
                    <div className="all-developer" onClick={this.navigateToHome}>All Developers</div>
                </header>

                {
                    this.state.developerInfo.length > 0 ?
                        <section>
                            <div className="left-section">
                                {

                                    this.state.developerInfo[0].avatar_url &&
                                    <div className="avatar">
                                        <img src={this.state.developerInfo[0].avatar_url} alt="developer-avatar" />
                                    </div>

                                }
                            </div>
                            <div className="right-section">
                                {

                                    this.state.developerInfo[0].name &&
                                    <div className="developer-name">{this.state.developerInfo[0].name}</div>
                                }
                                {
                                    this.state.developerInfo[0].name === null &&
                                    <div className="developer-name">{this.state.developerInfo[0].login}</div>
                                }
                                {
                                    this.state.developerInfo[0].bio &&
                                    <div className="developer-bio">{this.state.developerInfo[0].bio}</div>
                                }

                                <div className="social-media-links">
                                    {
                                        this.state.developerInfo[0].html_url &&
                                        <a href={this.state.developerInfo[0].html_url} target="_blank" rel="noreferrer">
                                            <img src={github} alt="github-icon" width="30px" height="30px" />
                                        </a>
                                    }
                                    {
                                        this.state.developerInfo[0].hackerrank_id &&
                                        <a href={this.state.developerInfo[0].hackerrank_id} target="_blank" rel="noreferrer">
                                            <img src={hackerrank} alt="hackerrank-icon" width="30px" height="30px" />
                                        </a>
                                    }
                                    {
                                        this.state.developerInfo[0].codechef_id &&
                                        <a href={this.state.developerInfo[0].codechef_id} target="_blank" rel="noreferrer">
                                            <img src={codechef} alt="codechef-icon" width="30px" height="30px" />
                                        </a>
                                    }
                                    {
                                        this.state.developerInfo[0].linkedIn_url &&
                                        <a href={this.state.developerInfo[0].linkedIn_url} target="_blank" rel="noreferrer">
                                            <img src={linkedin} alt="linkedin-icon" width="30px" height="30px" />
                                        </a>
                                    }
                                    {
                                        this.state.developerInfo[0].medium_id &&
                                        <a href={this.state.developerInfo[0].medium_id} target="_blank" rel="noreferrer">
                                            <img src={medium} alt="medium-icon" width="30px" height="30px" />
                                        </a>
                                    }
                                    {
                                        this.state.developerInfo[0].twitter_id &&
                                        <a href={this.state.developerInfo[0].twitter_id} target="_blank" rel="noreferrer">
                                            <img src={twitter} alt="twitter-icon" width="30px" height="30px" />
                                        </a>
                                    }

                                    {
                                        this.state.developerInfo[0].email &&
                                        <a href={this.state.developerInfo[0].email} target="_blank" rel="noreferrer">
                                            <img src={email} alt="email-icon" width="30px" height="30px" />
                                        </a>
                                    }
                                </div>

                                <div className="other-info-wrapper">
                                    {
                                        this.state.developerInfo[0].location &&
                                        <div className="other-info">
                                            <img src={location} alt="location-icon" width="30px" height="30px" /><span>{this.state.developerInfo[0].location}</span>
                                        </div>
                                    }
                                    {
                                        this.state.developerInfo[0].company &&
                                        <div className="other-info">
                                            <img src={company} alt="company-icon" width="30px" height="30px" /><span>{this.state.developerInfo[0].company}</span>
                                        </div>
                                    }
                                    {
                                        this.state.developerInfo[0].blog &&
                                        <div className="other-info">
                                            <img src={blog} alt="blog-icon" width="30px" height="30px" /><span>{this.state.developerInfo[0].blog}</span>
                                        </div>
                                    }

                                </div>
                            </div>
                        </section> :
                        <div className="developer-info-nodata">Hang in there your data is coming!</div>
                }

                {
                    this.state.repos.length > 0 ?
                        <main>
                            <div className="main-header">Github Repositories</div>
                            <hr width="95%" />
                            {
                                this.state.repos.map(repo => {
                                    return (
                                        <>
                                        <div className="repo-wrapper" key={repo.id}>
                                            <div className="repo-name-wrapper">
                                                <a href={repo.html_url} target="_blank" rel="noreferrer">
                                                <div className="repo-name">{repo.name}</div>
                                                    <img src={redirect} alt="repo-redirect" width="20px" height="20px"  />
                                                </a>
                                                <div className="repo-date">Updated on {new Date(repo.updated_at).getDate() + " " + Month[new Date(repo.updated_at).getMonth()] + " " +  new Date(repo.updated_at).getFullYear()}</div>
                                            </div>
                                            <div className="repo-description">{repo.description}</div>
                                        </div>
                                        <hr width="95%" />
                                        </>
                                    )
                                })
                            }
                        </main> :
                        <div className="repo-nodata">
                            Wait! Repos are loading
                        </div>                        
                }
                <Footer/>
                        
            </div>
        )
    }
}

export default withRouter(Developer);

