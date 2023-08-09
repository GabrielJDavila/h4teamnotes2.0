import { NavLink, Link } from "react-router-dom"

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
                <Link to="clientNotes" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        Client Notes
                    </p>
                </Link>
            </div>

            <div className="folder-container">
                <Link to="coachingCards" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        Coaching Cards
                    </p>
                </Link>
            </div> 

            <div className="folder-container">
                <Link to="workoutNotes" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        Workout Notes
                    </p>
                </Link>
            </div> 

            <div className="folder-container">
                <Link  to="gymEvents" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        Events
                    </p>
                </Link>
            </div> 

            <div className="folder-container">
                <Link to="shiftSchedule" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        Schedule
                    </p>
                </Link>
            </div>

            <div className="folder-container">
                <Link to="timeOffSheet" className="link-portal">
                    <i className="fa-solid fa-folder"></i>
                    <p className="link-text">
                        Request Time Off
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