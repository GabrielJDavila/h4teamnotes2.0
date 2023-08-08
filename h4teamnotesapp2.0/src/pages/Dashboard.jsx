import { NavLink } from "react-router-dom"

export default function Dashboard() {

    // const styles = {
    //     backgroundImage: "/folder-solid.svg",
    //     backgroundSize: "cover",
    //     backgroundColor: "blue",
    //     color: "white",
    //     height: "400px"
    // }
    return (
        <main className="dashboard">
            <div className="folder-container">
                <i className="fa-solid fa-folder"></i>
                <NavLink to="clientNotes" className="nav-link">
                    Client Notes
                </NavLink>
            </div>

            <div className="folder-container">
                <i className="fa-solid fa-folder"></i>
                <NavLink to="clientNotes" className="nav-link">
                    Client Notes
                </NavLink>
            </div> 

            <div className="folder-container">
                <i className="fa-solid fa-folder"></i>
                <NavLink to="clientNotes" className="nav-link">
                    Client Notes
                </NavLink>
            </div> 

            <div className="folder-container">
                <i className="fa-solid fa-folder"></i>
                <NavLink to="clientNotes" className="nav-link">
                    Client Notes
                </NavLink>
            </div> 

            <div className="folder-container">
                <i className="fa-solid fa-folder"></i>
                <NavLink to="clientNotes" className="nav-link">
                    Client Notes
                </NavLink>
            </div>

            <div className="folder-container">
                <i className="fa-solid fa-folder"></i>
                <NavLink to="clientNotes" className="nav-link">
                    Client Notes
                </NavLink>
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