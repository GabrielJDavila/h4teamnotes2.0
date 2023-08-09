import { useState } from "react"
export default function Header(props) {
    const [backBtnState, setBackBtnState] = useState(props.showLogin)
    return (
        <header className="site-header">
            {!backBtnState && <button className="back-btn"><i className="fa-solid fa-arrow-left"></i></button>}
            <h4 className="header-team">Team Wheaton</h4>
            <button className="logout-btn">LOGOUT</button>
        </header>
    )
}