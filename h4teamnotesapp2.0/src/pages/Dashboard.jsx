import { NavLink, Link } from "react-router-dom"

export default function Dashboard() {

    return (
        <main className="dashboard">
            <div className="folder-container">
                <Link to="clientNotes" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        CLIENT NOTES
                    </p>
                </Link>
            </div>

            <div className="folder-container">
                <Link to="workoutNotes" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        WORKOUT NOTES
                    </p>
                </Link>
            </div>

            <div className="folder-container">
                <Link  to="gymEvents" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        EVENTS
                    </p>
                </Link>
            </div> 

            <div className="folder-container">
                <Link to="coachingCards" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        COACHING CARDS
                    </p>
                </Link>
            </div> 

            <div className="folder-container">
                <Link to="shiftSchedule" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        SCHEDULE
                    </p>
                </Link>
            </div>

            <div className="folder-container">
                <Link to="timeOffSheet" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        REQUEST TIME OFF
                    </p>
                </Link>
            </div>         

            {/* <NavLink to="coachingCards">
                Coaching Cards
            </NavLink>

            <NavLink to="workoutNotes">
                Workout Notes
            </NavLink>

            <NavLink to="gymEvents">
                Gym Events
            </NavLink>

            <NavLink to="shiftSchedule">
                Shift Schedule
            </NavLink>

            <NavLink to="timeOffSheet">
                Time Off Sheet
            </NavLink> */}
        </main>
    )
}