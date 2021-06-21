import React, { Component } from 'react'
import './Modal.css'
import codechef from '../../assets/codechef.png'
import github from '../../assets/github.png'
import hackerrank from '../../assets/hackerrank.png'
import linkedin from '../../assets/linkedin.png'
import medium from '../../assets/medium.png'
import twitter from '../../assets/twitter.png'

export class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            devProfileData: {},
            isModalClose: false,
            error: false
        };
    }

    render() {
        const onInputBlur = (event) => {
            let valueData = event.target.value;
            this.setState(prevstate => ({
                devProfileData: {
                    ...prevstate.devProfileData,
                    [event.target.id]: valueData
                },
                error: false
            }))
        }

        const submitForm = (event) => {
            event.preventDefault();

            if (this.state.devProfileData?.github_id !== "" && this.state.devProfileData?.github_id !== undefined) {
                fetch('/api/developers', {
                    method: "POST",
                    body: JSON.stringify(this.state.devProfileData),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                    .then(data => {
                        this.setState({ isModalClose: false, error: false })
                        this.props.toggleModal();
                        this.props.devDataUpdate();
                    });
            } else {
                document.querySelector(".modal").scrollTo(0, 0)
                this.setState({ error: true })
            }
        }

        const { isModalOpen, toggleModal } = this.props
        return (
            <>
                {
                    isModalOpen ?
                        <div className="modal">
                            <div className="modal-header">
                                <div className="modal-header-name">Add developer profile</div>
                                <div className="modal-close"><i className="fa fa-close modal-close-icon" onClick={() => toggleModal()}></i></div>
                            </div>

                            <form onSubmit={(event) => submitForm(event)}>
                                <hr width="95%" />
                                <div className="form-input-wrapper">
                                    <div className="form-input">
                                        <img src={github} alt="github-icon" width="20px" height="20px" />
                                        <label htmlFor="github_id">Github<span style={{ color: "red" }}>*</span></label>
                                    </div>
                                    <input type="text" id="github_id" style={{ border: this.state.error && "1px solid red" }} onBlur={(e) => onInputBlur(e)} />
                                    {this.state.error && <div style={{ color: "red" }}>Please enter your valid Github Id</div>}

                                </div>
                                <div className="form-input-wrapper">
                                    <div className="form-input">
                                        <img src={linkedin} alt="linkedin-icon" width="20px" height="20px" />
                                        <label htmlFor="linkedin_id">Linkedin</label>
                                    </div>
                                    <input type="text" id="linkedin_id" onBlur={(e) => onInputBlur(e)} />
                                </div>
                                <div className="form-input-wrapper">
                                    <div className="form-input">
                                        <img src={codechef} alt="codechef-icon" width="20px" height="20px" />
                                        <label htmlFor="codechef_id">Codechef</label>
                                    </div>
                                    <input type="text" id="codechef_id" onBlur={(e) => onInputBlur(e)} />
                                </div>
                                <div className="form-input-wrapper">
                                    <div className="form-input">
                                        <img src={hackerrank} alt="hackerrank-icon" width="20px" height="20px" />
                                        <label htmlFor="hackerrank_id">Hackerrank</label>
                                    </div>
                                    <input type="text" id="hackerrank_id" onBlur={(e) => onInputBlur(e)} />
                                </div>
                                <div className="form-input-wrapper">
                                    <div className="form-input">
                                        <img src={twitter} alt="twitter-icon" width="20px" height="20px" />
                                        <label htmlFor="twitter_id">Twitter</label>
                                    </div>
                                    <input type="text" id="twitter_id" onBlur={(e) => onInputBlur(e)} />
                                </div>
                                <div className="form-input-wrapper">
                                    <div className="form-input">
                                        <img src={medium} alt="medium-icon" width="20px" height="20px" />
                                        <label htmlFor="medium_id">Medium</label>
                                    </div>
                                    <input type="text" id="medium_id" onBlur={(e) => onInputBlur(e)} />
                                </div>

                                <hr width="90%" />
                                <div className="modal-footer">
                                    <div className="cancel" onClick={() => toggleModal()}>Cancel</div>
                                    <input type="submit" id="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                        : null
                }
            </>
        )
    }
}

export default Modal
