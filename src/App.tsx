import { useState } from 'react'

import './App.css'
import Figure from './components/Figure/Figure'
import Keyboard from './components/Figure/Keyboard/Keyboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div  className="max-w-screen-md mx-auto flex items-center flex-col h-1/2 gap-10">
    <Figure/>
    </div>

    
     
      <div className='flex justify-center' >
        <Keyboard/>

      </div>
    </>
    
  )
}

export default App
