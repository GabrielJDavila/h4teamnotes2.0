import { useState } from "react"

export default function Card(props) {
    const [open, setOpen] = useState(false)

    function openText() {
        setOpen(prev => !prev)
    }

    return (
         <div className="card">
            <div className="card-top-container">
                <div className="card-title-container">
                    <h3 className="card-title">{props.title}</h3>
                    <p className="card-date">{props.date}</p>
                </div>
                <div className="card-edit-delete-container">
                    <i data-id={props.id} className="fa-solid fa-pen-to-square" onClick={props.handleEditClick}></i>
                    <i data-id={props.id} onClick={props.handleDelete} className="fa-solid fa-trash"></i>
                </div>
            </div>
            {open && <p className="card-text">{props.body}</p>}
            <button onClick={openText} className="read-more-btn">{!open ? "open card" : "close card"}</button>
        </div>
    )
}