import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { logout, requestingPermission } from "../firebase"


export default function SideNav(props) {

    function signOutUser() {
        logout()
        window.location.reload()
    }

    return (
        <div className="side-nav-container">
            <i className="fa-regular fa-user"></i>
            <nav className="side-nav">
                <Link to="/" className="nav-item dashboard-side-link">Dashboard</Link>
                <Link to="clientNotes" className="nav-item">Client Notes</Link>
                <Link to="coachingCards" className="nav-item">Coaching Cards</Link>
                <Link to="shiftSchedule" className="nav-item">Schedule</Link>
                <Link to="timeOffSheet" className="nav-item">Time Off Sheet</Link>
                <button onClick={signOutUser} className="logout-btn">LOGOUT</button>
            </nav>
        </div>
    )
}