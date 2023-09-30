import { useState, useEffect } from "react"
import { requestingPermission } from "../firebase"

export default function RequestPermissionModal() {
    const [on, setOn] = useState(false)

    function toggle() {
        setOn(prev => !prev)
        requestingPermission()
    }

    return (
        <div className="modal">
            <h3 className="modal-header">Allow this app to send notifications</h3>
            <div className="notification-container">
                {/* <img src="/dist/bell.png" className="bell" /> */}
                <div className="toggle-btn">
                    <input
                        type="checkbox"
                        id="checkbox-input"
                        className="checkbox-toggle"
                        checked={on}
                        onChange={toggle}
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