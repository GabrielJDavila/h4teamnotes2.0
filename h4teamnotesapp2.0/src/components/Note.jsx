
export default function Note(props) {
    return (
         <div className="note">
            <div className="note-title-container">
                <h3 className="note-title">{props.title}</h3>
                <p className="note-date">{props.date}</p>
                 <button className="delete-note">delete note</button>
            </div>
            <p className="note-text">{props.body}</p>
        </div>
    )
}