import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ClientNotes from "./pages/ClientNotes"
import CoachingCards from "./pages/CoachingCards"
import GymEvents from "./pages/GymEvents"
import ShiftSchedule from "./pages/ShiftSchedule"
import TimeSheet from "./pages/TimeSheet"
import WorkoutNotes from "./pages/WorkoutNotes"
import Dashboard from './pages/Dashboard'

const userContext = createContext()

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="clientNotes" element={<ClientNotes />}/>
            <Route path="workoutNotes" element={<WorkoutNotes />}/>
            <Route path="gymEvents" element={<GymEvents />}/>
            <Route path="coachingCards" element={<CoachingCards />}/>
            <Route path="shiftSchedule" element={<ShiftSchedule />}/>
            <Route path="timeOffSheet" element={<TimeSheet />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
