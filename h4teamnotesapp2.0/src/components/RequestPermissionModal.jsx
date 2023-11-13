import { useState, useEffect, useContext } from "react"
import { requestingPermission } from "../firebase"

export default function RequestPermissionModal() {
    const [toggle, setToggle] = useState(false)

    function handleToggle() {
        setToggle(prev => !prev)
        if(!toggle) {
            requestingPermission()
        }
    }

    return (
        <div className="modal">
            {/* <h3 className="modal-header">Allow this app to send notifications</h3> */}
            <div className="notification-container">
                <div className="toggle-btn">
                    <input
                        type="checkbox"
                        id="checkbox-input"
                        className="checkbox-toggle"
                        checked={toggle}
                        onChange={handleToggle}
                    />
                    <label htmlFor="checkbox-input" className="round-slider-container">
                        <div>On</div>
                        <div>Off</div>
                        <div className="round-slider"></div>
                    </label>
                </div>
            </div>
        </div>
    )
}