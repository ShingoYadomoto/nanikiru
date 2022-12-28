import React  from 'react'
import Hand from '../../component/hand/hand'
import './App.css'

const App: React.FC = () => {
  return (
      <div className="App">
        <header className="App-header">
          <Hand />
        </header>
      </div>
  )
}

export default App