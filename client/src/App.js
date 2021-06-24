import React from 'react'
import Home from './component/Home/Home'
import { Route } from 'react-router-dom'
import Developer from './component/Developer/Developer'
import './App.css'
class App extends React.Component {
  state = {
    isModalOpen: false
  }

  render() {
    return (
      <div className="app-style">
      <Route path="/" exact component={Home} />
      <Route path="/developers/:id" component={Developer} />
    </div>
    )
  }
}

export default App;
