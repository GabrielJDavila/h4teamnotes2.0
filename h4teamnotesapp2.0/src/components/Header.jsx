import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { logout, requestingPermission } from "../firebase"
import RequestPermissionModal from "./RequestPermissionModal"


export default function Header() {
    const menuRef = useRef(null)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const isMobile = windowWidth < 800
    const [openMenu, setOpenMenu] = useState(false)

    useEffect(() => {
        function watchWidth() {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", watchWidth)
        return function() {
            window.removeEventListener("resize", watchWidth)
        }

    }, [])

    function toggleMenu() {
            setOpenMenu(prev => !prev)
    }
    
    function signOutUser() {
        logout()
        window.location.reload()
    }

    const mobileMenuStyles = {
        width: openMenu ? "50%" : "0",
        height: openMenu ? "370px": "0",
        transition: openMenu ? ".2s all ease" : ""
    }

    const handleClickOutside = (e) => {
        if(menuRef.current && !menuRef.current.contains(e.target)) {
            setOpenMenu(false)
        }
        
    }
    document.addEventListener("click", handleClickOutside)

    const mobileNav =
            <nav className="mobile-nav" style={mobileMenuStyles}>
                <Link to="/" onClick={toggleMenu} className="nav-item">Dashboard</Link>
                <Link to="WheatonNotes" onClick={toggleMenu} className="nav-item">Wheaton Notes</Link>
                <Link to="GenevaNotes" onClick={toggleMenu} className="nav-item">Geneva Notes</Link>
                <Link to="coachingCards" onClick={toggleMenu} className="nav-item">Coaching Cards</Link>
                <button onClick={signOutUser} className="logout-btn">LOGOUT</button>
            </nav>

    return (
        <header className="site-header">
            <h4 className="header-team">Team Notes</h4>
            <button className="ask-perm-notifications">Click for Notifications</button>
            {/* <RequestPermissionModal />  */}
            {isMobile && <i ref={menuRef} className="fa-regular fa-user" onClick={toggleMenu}></i>}
            {isMobile && mobileNav}
        </header>
    )
}