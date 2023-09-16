import { useState } from "react"
import { requestingPermission } from "../firebase"

export default function RequestPermissionModal() {
    const [viewModal, setViewModal] = useState(false)
    const [on, setOn] = useState(false)

    function toggle() {
        setOn(prev => !prev)
        requestingPermission()
    }

    return (
        <div className="modal">
            <h3>Allow this app to send notifications</h3>
            <img src="/dist/bell.png" className="bell" />
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
    )
}