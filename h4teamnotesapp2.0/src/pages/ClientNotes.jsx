import { useState, useEffect, useContext } from "react"
import Note from "../components/Note"
import BackBtn from "../components/BackBtn"
import { Link } from "react-router-dom"
import { getFromCollection, addToCollection, clientNotes, deleteItem, retrieveDoc, editItem } from "../firebase"
import { ToggleContext } from "../App"
import { doc } from "firebase/firestore"

export default function ClientNotes() {
    const [noteData, setNoteData] = useState({
        title: "",
        date: "",
        text: ""
    })
    const [updatedNoteData, setUpadtedNoteData] = useState({
        title: "",
        date: "",
        text: ""
    })
    const [currentNote, setCurrentNote] = useState({
        title: "",
        date: "",
        text: ""
    })
    const [notesFromDB, setNotesFromDB] = useState([])
    const [currentItemId, setCurrentItemId] = useState(null)
    const {toggle, setToggle} = useContext(ToggleContext)

    console.log(currentNote)
    async function loadData() {
        try {
            const data = await getFromCollection(clientNotes)
            const sortedData = data.sort((a, b) => b.date.localeCompare(a.date))
            setNotesFromDB(sortedData)
        } catch(e) {
            console.log("error fetching data: ", e)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        addToCollection(noteData.title, noteData.date, noteData.text, clientNotes)
        loadData()
    }

    // function handleChange(e) {
    //     const {name, value} = e.target
    //     setNoteData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }
    function handleChange(name, value, stateSetter) {
        stateSetter(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // function handleUpdate(e) {
    //     const {name, value} = e.target
    //     setUpadtedNoteData(prev => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }

    function handleEditClick(e) {
        const itemId = e.target.dataset.id
        // retrieveDoc(clientNotes, itemId)
        loadSingleDoc(itemId)
        setCurrentItemId(itemId)
        toggleModal()
    }

    async function loadSingleDoc(currentItemId) {
        try {
            const docSnap = await retrieveDoc(clientNotes, currentItemId)
            const doc = docSnap.data()
            setCurrentNote(prev => ({
                ...prev,
                title: doc.title,
                date: doc.date,
                text: doc.text
            }))
        } catch(e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if(currentItemId) {
            loadSingleDoc(currentItemId)
        }
    }, [currentItemId])

    function handleDelete(e) {
        const itemId = e.target.dataset.id
        deleteItem(clientNotes, itemId)
        loadData()
    }

    function toggleModal() {
        setToggle(prev => !prev)
        console.log(currentNote)
    }

    const notes = notesFromDB.map(obj => {
        return (
            <Note
                key={obj.id}
                id={obj.id}
                title={obj.title}
                date={obj.date}
                body={obj.text}
                handleEditClick={(e) => handleEditClick(e)}
                handleDelete={(e) => handleDelete(e)}
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
                        onChange={e => handleChange(e.target.name, e.target.value, setNoteData)}
                        type="text"
                        placeholder="note title"
                        value={noteData.title}
                        className="input-item"
                        required
                    />
                    <input
                        name="date"
                        onChange={e => handleChange(e.target.name, e.target.value, setNoteData)}
                        type="date"
                        placeholder="date"
                        value={noteData.date}
                        className="input-item"
                        required
                    />
                </div>
                <textarea
                    name="text"
                    onChange={e => handleChange(e.target.name, e.target.value, setNoteData)}
                    placeholder="write note here"
                    value={noteData.text}
                    required
                ></textarea>
                <button className="submit-btn">add note</button>
            </form>
            
            <h2 className="notes-page-title">Client Notes</h2>
            <div className="notes-container">

                {
                toggle && currentNote ?
                <form className="update-modal">
                    <i className="fa-solid fa-x" onClick={toggleModal}></i>
                    <div className="top-input-div">
                        <input
                            name="title"
                            onChange={e => handleChange(e.target.name, e.target.value, setUpdatedData)}
                            type="text"
                            placeholder="note title"
                            value={currentNote.title}
                            className="input-item"
                            required
                        />
                        <input
                            name="date"
                            onChange={e => handleChange(e.target.name, e.target.value, setUpdatedData)}
                            type="date"
                            placeholder="date"
                            value={currentNote.date}
                            className="input-item"
                            required
                        />
                    </div>
                    <textarea
                        name="text"
                        onChange={e => handleChange(e.target.name, e.target.value, setUpdatedData)}
                        placeholder="write note here"
                        value={currentNote.text}
                        required
                    ></textarea>
                    <button className="submit-btn">update note</button>
                </form> : ""
                }

                {notesFromDB && notes}
            </div>
        </div>
    )
}