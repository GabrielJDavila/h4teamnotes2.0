import { NavLink, Outlet } from "react-router-dom"

export default function PagesLayout() {
    return (
        <>
            <nav>
                <NavLink
                    to="clientNotes"
                >
                    Client Notes
                </NavLink>

                <NavLink
                    to="coachingCards"
                >
                    Coaching Cards
                </NavLink>

                <NavLink
                    to="workoutNotes"
                >
                    Workout Notes
                </NavLink>

                <NavLink
                    to="gymEvents"
                >
                    Gym Events
                </NavLink>

                <NavLink
                    to="shiftSchedule"
                >
                    Shift Schedule
                </NavLink>

                <NavLink
                    to="timeOffSheet"
                >
                    Time Off Sheet
                </NavLink>
            </nav>
            <Outlet/>
        </>
    )
}