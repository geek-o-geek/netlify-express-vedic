import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='content'>
          <a className='link' href="/.netlify/functions/serverless-http">
            link to serverless vedic server
          </a>
        </div>
      </div>
    )
  }
}

export default App
