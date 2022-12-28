import React  from 'react'
import Question from '../question/question'
import './App.css'

const App: React.FC = () => {
  return (
      <div className="App">
        <header className="App-header">
          <Question />
        </header>
      </div>
  )
}

export default App