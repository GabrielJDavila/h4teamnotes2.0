import { useState } from "react"
export default function Header() {
    const [backBtnState, setBackBtnState] = useState(true)
    return (
        <header className="site-header">
            {backBtnState && <button className="back-btn">Btn</button>}
            <h4 className="header-team">Team Wheaton</h4>
            <button className="logout-btn">Logout</button>
        </header>
    )
}