import React, { Component } from 'react'
import './Home.css'
import banner from "../../assets/homepage_banner.png"
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
        try {
            fetch('/api/developers', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ developerData: data, filteredDeveloperData: data })
                })
        }
        catch (err) {
            console.log(err);
        }
    }

    render() {
        const handleChange = (event) => {
            let copiedData = [...this.state.developerData]
            let filteredDevs = copiedData.filter(dev => {
                return dev.login.toUpperCase().includes(event.target.value.toUpperCase())
            });
            this.setState({ filteredDeveloperData: filteredDevs })
        }

        const openModal = () => {
            this.setState({ isModalOpen: !this.state.isModalOpen })
        }

        return (
            <>
            {this.state.isModalOpen && <Overlay />}
                <Modal
                    toggleModal={() => openModal()}
                    devDataUpdate={() => this.updateDeveloperData()}
                    isModalOpen={this.state.isModalOpen} />
                
                <div className="banner">
                    <div className="banner-text">The Developer Repository</div>
                    <img src={banner} alt="banner_image" id="banner" />
                </div>

                <div className="explore-container">
                    <div className="explore-text">Explore developer profiles</div>
                </div>


                <div className="search-container">
                    <hr width="95%" />
                    <div className="search-input-field">
                        <input type="text" placeholder="Search for username" id="search-dev" onChange={(e) => handleChange(e)} />
                        <i className="fa fa-search search-icon"></i>
                    </div>

                    <div className="dev-container">
                        {this.state.filteredDeveloperData.length > 0 ?
                            this.state.filteredDeveloperData.map(data => {
                                return (
                                    <div className="account-wrapper" key={data.id}>
                                        <Link to={'/api/developers/' + data.id}>
                                            <img src={data.avatar_url} alt="account" id="account" height="100px" width="100px" />
                                            <div className="account-name">{data.login}
                                                <i className='fa fa-external-link redirect'></i>
                                            </div>

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