import { Link } from "react-router-dom"
export default function BackBtn(location) {
    return (
        <Link
            className="back-btn"
            to=".."
            relative="path"
        >
            <i className="fa-solid fa-arrow-left"></i>
            <p className="back-btn-text">back to dashboard</p>
        </Link>
    )
}