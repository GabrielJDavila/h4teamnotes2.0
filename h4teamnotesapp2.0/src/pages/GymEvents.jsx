import { useState, useEffect } from "react" 
import Note from "../components/Note"
import BackBtn from "../components/BackBtn"
import { getFromCollection, addToCollection, gymNotes, deleteItem } from "../firebase"

export default function GymEvents() {
    const [noteData, setNoteData] = useState({
        title: "",
        date: "",
        text: ""
    })
    const [notesFromDB, setNotesFromDB] = useState([])

    async function loadData() {
        try {
            const data = await getFromCollection(gymNotes)
            setNotesFromDB(data)
        } catch(e) {
            console.log("error fetching data: ", e)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        addToCollection(noteData.title, noteData.date, noteData.text, gymNotes)
        loadData()
    }

    function handleChange(e) {
        const {name, value} = e.target
        setNoteData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleClick(e) {
        const itemId = e.target.id
        deleteItem(gymNotes, itemId)
        loadData()
    }

    const notes = notesFromDB.map(obj => {
        return (
            <Note
                key={obj.id}
                id={obj.id}
                title={obj.title}
                date={obj.date}
                body={obj.text}
                handleClick={(e) => handleClick(e)}
            />
        )
    })

    return (
        <div className="notes-page-container">
            <BackBtn />
            <form onSubmit={handleSubmit} className="add-new-note">
                <h2>Add New Note</h2>
                <div className="top-input-div">
                    <input
                        name="title"
                        onChange={handleChange}
                        type="text"
                        placeholder="note title"
                        value={noteData.title}
                        className="input-item"
                        required
                    />
                    <input
                        name="date"
                        onChange={handleChange}
                        type="date"
                        placeholder="date"
                        value={noteData.date}
                        className="input-item"
                        required
                    />
                </div>
                <textarea
                    name="text"
                    onChange={handleChange}
                    placeholder="write note here"
                    value={noteData.text}
                    required
                ></textarea>
                <button className="submit-btn">add note</button>
            </form>

            <h2 className="notes-page-title">Events/General</h2>
            <div className="notes-container">
                {notes}
            </div>
        </div>
    )
}