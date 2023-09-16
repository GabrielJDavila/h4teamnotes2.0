import { useState, useEffect, useRef } from "react"
import { requestingPermission } from "../firebase"

export default function RequestPermissionModal() {

    const [viewModal, setViewModal] = useState(false)
    const [sliderBtn, setSliderBtn] = useState(false)

    function requestingPermission() {
        console.log("requesting permission...")
        Notification.requestPermission().then((permission) => {
            if(permission === "granted") {
                console.log("approved")
                setSliderBtn(prev => !prev)
            }
        })
    }

    return (
        <div className="modal">
            <h3>Allow notifications</h3>
            <div className="view">
                {/* will switch between views */}
            </div>
            <div className="toggle-btn">
                <input
                    type="checkbox"
                    className="checkbox-toggle"
                />
                <label
                    htmlFor="checkbox-toggle"
                    className="round-slider-container"
                >
                    <div>On</div>
                    <div>Off</div>
                    <div className="round-slider"></div>
                </label>
            </div>
        </div>
    )
}