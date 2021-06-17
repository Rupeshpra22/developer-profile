import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Developer extends Component {
    state = {
        developerInfo: []
    }

    componentDidMount() {
        fetch('/api' + this.props.location.pathname)
            .then(response => response.json())
            .then(data => {
                this.setState({ developerInfo: data })
            })
    }

    render() {
        console.log(this.state.developerInfo)
        return (
            <div>
                {this.state.developerInfo.length > 0 ?
                    <div>
                        {this.state.developerInfo[0].name ? this.state.developerInfo[0].name : this.state.developerInfo[0].login}
                    </div> :
                    <div>Hang in there your data is coming!</div>}
            </div>
        )
    }
}

export default withRouter(Developer);