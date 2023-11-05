import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import WheatonNotes from './pages/WheatonNotes'
import GenevaNotes from './pages/GenevaNotes'
import CoachingCards from "./pages/CoachingCards"

export const ToggleContext1 = createContext()
export const ToggleContext2 = createContext()

function App() {
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  return (
    <ToggleContext1.Provider value={{ toggle1, setToggle1 }}>
      <ToggleContext2.Provider value={{ toggle2, setToggle2 }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="WheatonNotes" element={<WheatonNotes />} />
              <Route path="GenevaNotes" element={<GenevaNotes />} />
              <Route path="coachingCards" element={<CoachingCards />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ToggleContext2.Provider>
    </ToggleContext1.Provider>
  )
}

export default App
