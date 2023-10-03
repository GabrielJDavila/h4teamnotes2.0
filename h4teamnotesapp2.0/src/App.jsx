import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ClientNotes from "./pages/ClientNotes"
import CoachingCards from "./pages/CoachingCards"
import ShiftSchedule from "./pages/ShiftSchedule"
import TimeSheet from "./pages/TimeSheet"
import Dashboard from './pages/Dashboard'

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
              <Route path="clientNotes" element={<ClientNotes />}/>
              {/* <Route path="workoutNotes" element={<WorkoutNotes />}/>
              <Route path="gymEvents" element={<GymEvents />}/> */}
              <Route path="coachingCards" element={<CoachingCards />}/>
              <Route path="shiftSchedule" element={<ShiftSchedule />}/>
              <Route path="timeOffSheet" element={<TimeSheet />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ToggleContext2.Provider>
    </ToggleContext1.Provider>
  )
}

export default App
