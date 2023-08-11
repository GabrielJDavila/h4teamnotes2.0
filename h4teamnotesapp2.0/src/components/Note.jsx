import { useState } from "react"

export default function Note(props) {
    const [open, setOpen] = useState(false)

    function openText() {
        setOpen(prev => !prev)
    }
    return (
         <div className="note">
            <div className="note-title-container">
                <h3 className="note-title">{props.title}</h3>
                <p className="note-date">{props.date}</p>
                <div className="edit-delete-container">
                    <i className="fa-solid fa-pen-to-square"></i>
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
            {open && <p className="note-text">{props.body}</p>}
            <button onClick={openText} className="read-more-btn"><i className="fa-solid fa-chevron-down"></i></button>
        </div>
    )
}