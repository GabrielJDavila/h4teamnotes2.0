import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ClientNotes from "./pages/ClientNotes/ClientNotes"
import CoachingCards from "./pages/CoachingCards"
import GymEvents from "./pages/GymEvents"
import ShiftSchedule from "./pages/ShiftSchedule"
import TimeSheet from "./pages/TimeSheet"
import WorkoutNotes from "./pages/WorkoutNotes"
import Dashboard from './pages/Dashboard'
import ClientNoteDetail from "./pages/ClientNotes/ClientNoteDetail"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientNotes" element={<ClientNotes />}/>
          <Route path="clientNotes/:id" element={<ClientNoteDetail/>}/>
          <Route path="coachingCards" element={<CoachingCards />}/>
          <Route path="workoutNotes" element={<WorkoutNotes />}/>
          <Route path="gymEvents" element={<GymEvents />}/>
          <Route path="shiftSchedule" element={<ShiftSchedule />}/>
          <Route path="timeOffSheet" element={<TimeSheet />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
