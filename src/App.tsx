import { useState } from 'react'

import './App.css'
import Figure from './components/Figure/Figure'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div  className="max-w-screen-lg mx-auto flex items-center flex-col h-1/2">
      <h1>CineQuiz - In progress</h1>
      <Figure/>
    </div>
  )
}

export default App
