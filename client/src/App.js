import React from 'react'
import Home from './component/Home/Home'
import { Route } from 'react-router-dom'
import Developer from './component/Developer/Developer'

class App extends React.Component {
  state = {
    isModalOpen: false
  }

  // componentDidMount() {
  //   fetch('/api/developers')
  //     .then(data => data.json())
  //     .then(res => this.setState({ dev: res }))
  // }

  render() {
    const changeBackground = () =>{
        this.setState({isModalOpen: !this.state.isModalOpen})
    }
    return (
      // <div>
      //   {
      //     this.state.dev.map(data => {
      //       return(
      //         <li key={data.id}>
      //         <ul>{data.name}</ul>
      //       </li>
      //       )            
      //     })
      //   }
      // </div>
     
      
        <div style={this.state.isModalOpen ? {backgroundColor: "grey"} : {backgroundColor: "transparent"}}>
          <Route path="/" exact render={()=><Home changeBackground={()=>changeBackground()}/>} />
          <Route path="/developers/:id" component={Developer} />
        </div>
    )
  }
}

export default App;
