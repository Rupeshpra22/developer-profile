import React, { Component } from 'react'
import './Home.css'
import banner from "../../assets/homepage_banner.png"
import account from "../../assets/account_circle.svg"
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Modal from '../Modal/Modal'
import Overlay from '../Overlay/Overlay'

class Home extends Component {
    state = {
        developerData: [],
        filteredDeveloperData: [],
        isModalOpen: false
    }

    componentDidMount() {
        this.updateDeveloperData();
    }

    updateDeveloperData = () => {
        fetch('/api/developers')
            .then(response => response.json())
            .then(data => {
                this.setState({ developerData: data, filteredDeveloperData: data })
            })
    }

    render() {
        console.log(this.props)
        const handleChange = (event) => {
            let copiedData = [...this.state.developerData]
            let filteredDevs = copiedData.filter(dev => {
                return dev.login.toUpperCase().includes(event.target.value.toUpperCase())
            });
            this.setState({ filteredDeveloperData: filteredDevs })
        }

        const openModal = () => {
            // this.props.changeBackground();
            this.setState({ isModalOpen: !this.state.isModalOpen })
        }

        return (
            <>
                <Modal
                    toggleModal={() => openModal()}
                    //  overlay={this.props.changeBackground}
                    devDataUpdate={() => this.updateDeveloperData()}
                    isModalOpen={this.state.isModalOpen} />
                {this.state.isModalOpen && <Overlay />}
                <div className="banner">
                    <div className="banner-text">The Developer Repository</div>
                    <img src={banner} alt="banner_image" id="banner" />
                </div>

                <div className="explore-container">
                    <div className="explore-text">Explore developer profiles</div>
                </div>

                <hr width="95%" />

                <div className="search-container">
                    <div className="search-input-field">
                        <input type="text" placeholder="Search for username" id="search-dev" onChange={(e) => handleChange(e)} />
                        <i className="fa fa-search search-icon"></i>
                    </div>

                    <div className="dev-container">
                        {this.state.filteredDeveloperData.length > 0 ?
                            this.state.filteredDeveloperData.map(data => {
                                return (
                                    <div className="account-wrapper" key={data.id}>
                                        <Link to={'/developers/' + data.id}>
                                            <img src={account} alt="account" id="account" />
                                            <div className="account-name">{data.login}</div>
                                            <i className='fa fa-external-link redirect'></i>
                                        </Link>
                                    </div>
                                )
                            }) : <div className="no-developers">No developers added yet</div>
                        }
                    </div>

                    <hr width="95%" />

                    <div className="not-found-wrapper">
                        <div className="not-found-text">Could not find what you were looking for?</div>
                        <button onClick={() => openModal()}>Add developer info</button>
                    </div>

                    <Footer />
                </div>
            </>
        )
    }
}

export default Home