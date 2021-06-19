import React, { Component } from 'react'
import './Modal.css'

export class Modal extends Component {
    // state = {
    //     developerInfo = {
    //         github_id: "",
    //         linkedin_id: "",
    //         codechef_id: "",
    //         hackerrank_id: "",
    //         twitter_id: "",
    //         medium_id: ""
    //     }
    // }
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
            console.log(this.state.devProfileData)
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
                document.querySelector(".modal").scrollTo(0,0)
                this.setState({ error: true })
            }
        }

        console.log("Modal", this.state)
        const { isModalOpen, toggleModal } = this.props
        return (
            <>
                {
                    isModalOpen ?
                        <div className="modal">
                            <div className="modal-header">
                                <div className="modal-header-name">Add developer profile</div>
                                <div class="modal-close"><i class="fa fa-close modal-close-icon" onClick={() => toggleModal()}></i></div>
                            </div>

                            <form onSubmit={(event) => submitForm(event)}>
                                <hr width="95%" />
                                <div className="form-input-wrapper">
                                    <label htmlFor="github_id">Github<span style={{ color: "red" }}>*</span></label>
                                    <input type="text" id="github_id" style={{ border: this.state.error && "1px solid red" }} onBlur={(e) => onInputBlur(e)} />
                                    {this.state.error && <div style={{ color: "red" }}>Please enter your valid Github Url</div>}
                                </div>
                                <div className="form-input-wrapper">
                                    <label htmlFor="linkedin_id">Linkedin</label>
                                    <input type="text" id="linkedin_id" onBlur={(e) => onInputBlur(e)} />
                                </div>
                                <div className="form-input-wrapper">
                                    <label htmlFor="codechef_id">Codechef</label>
                                    <input type="text" id="codechef_id" onBlur={(e) => onInputBlur(e)} />
                                </div>
                                <div className="form-input-wrapper">
                                    <label htmlFor="hackerrank_id">Hackerrank</label>
                                    <input type="text" id="hackerrank_id" onBlur={(e) => onInputBlur(e)} />
                                </div>
                                <div className="form-input-wrapper">
                                    <label htmlFor="twitter_id">Twitter</label>
                                    <input type="text" id="twitter_id" onBlur={(e) => onInputBlur(e)} />
                                </div>
                                <div className="form-input-wrapper">
                                    <label htmlFor="medium_id">Medium</label>
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
