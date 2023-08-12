import { useState } from "react"
import { Link } from "react-router-dom"
import { logout } from "../firebase"

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false)

    function toggleMenu() {
        setOpenMenu(prev => !prev)
    }
    
    function signOutUser() {
        logout()
        window.location.reload()
    }
    const menuStyles = {
        width: openMenu ? "65%" : "0",
        height: openMenu ? "420px": "0",
        transition: openMenu ? ".2s all ease" : ""
    }
    
    return (
        <header className="site-header">
            <h4 className="header-team">Team Wheaton</h4>
            <i className="fa-regular fa-user" onClick={toggleMenu}></i>
            <nav className="side-nav" style={menuStyles}>
                <Link to="/" onClick={toggleMenu} className="nav-item">Dashboard</Link>
                <Link to="clientNotes" onClick={toggleMenu} className="nav-item">Client Notes</Link>
                <Link to="workoutNotes" onClick={toggleMenu} className="nav-item">Workout Notes</Link>
                <Link to="gymEvents" onClick={toggleMenu} className="nav-item">Events / General</Link>
                <Link to="coachingCards" onClick={toggleMenu} className="nav-item">Coaching Cards</Link>
                <Link to="shiftSchedule" onClick={toggleMenu} className="nav-item">Schedule</Link>
                <Link to="timeOffSheet" onClick={toggleMenu} className="nav-item">Time Off Sheet</Link>
                <button onClick={signOutUser} className="logout-btn">LOGOUT</button>
            </nav>
        </header>
    )
}