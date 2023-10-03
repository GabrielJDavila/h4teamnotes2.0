import { NavLink, Link } from "react-router-dom"
import RequestPermissionModal from "../components/RequestPermissionModal"

export default function Dashboard() {

    return (
        <main className="dashboard">
            <Link to="clientNotes" className="new-link-portal">
                <h3 className="new-link-text">CLIENT NOTES</h3>
                <p className="section-description">Add, edit, and review general notes</p>
            </Link>
            <div className="folders-container">
                <div className="folder-container">
                    <Link to="clientNotes" className="link-portal">
                        <i className="fa-solid fa-folder"></i>
                        <p className="link-text">
                            Notes
                        </p>
                    </Link>
                </div>

                {/* <div className="folder-container">
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
                </div>  */}

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
            </div>
            <RequestPermissionModal />         
        </main>
    )
}