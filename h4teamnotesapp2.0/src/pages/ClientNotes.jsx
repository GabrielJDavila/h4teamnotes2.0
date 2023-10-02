import { useState, useEffect, useContext } from "react"
import Note from "../components/Note"
import BackBtn from "../components/BackBtn"
import { getFromCollection, addToCollection, clientNotes, deleteItem, retrieveDoc, editItem } from "../firebase"
import { ToggleContext } from "../App"

export default function ClientNotes() {
    // state for initial note data returned from firestore
    const [noteData, setNoteData] = useState({
        title: "",
        date: "",
        text: ""
    })
    
    // state for current note selected to be edited by user
    const [currentNote, setCurrentNote] = useState({
        title: "",
        date: "",
        text: ""
    })
    // state for data sorted and set from noteData, ready to be rendered
    const [notesFromDB, setNotesFromDB] = useState([])
    // initial value of itemId for currentNote
    const [currentItemId, setCurrentItemId] = useState(null)
    // state context for toggling of modal
    const {toggle, setToggle} = useContext(ToggleContext)

    // function to get data from firestore, sort, and set to state ready to be rendered
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

    // function to submit form and add note to firestore
    function handleSubmit(e) {
        e.preventDefault()
        addToCollection(noteData.title, noteData.date, noteData.text, clientNotes)
        loadData()
    }

    // function to submit form and add edited note to firestore
    function handleEditSubmit(e) {
        e.preventDefault()
        editItem(clientNotes, currentItemId, currentNote.title, currentNote.date, currentNote.text)
        loadData()
        toggleModal()
    }

    // handles deletion of note, re-renders data to update display
    function handleDelete(e) {
        const itemId = e.target.dataset.id
        deleteItem(clientNotes, itemId)
        loadData()
    }

    // handles change for inputs of adding new notes/editing notes
    function handleChange(name, value, stateSetter) {
        stateSetter(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // handles inital function of edit button click, calls multiple functions
    function handleEditClick(e) {
        const itemId = e.target.dataset.id
        loadSingleDoc(itemId)
        setCurrentItemId(itemId)
        toggleModal()
    }

    // retrieves single document from collection, updates currentNote with data
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

    // toggles state to display modal to edit note
    function toggleModal() {
        setToggle(prev => !prev)
    }

    // maps through intial notes returned from firestore, returning a Note component for each item
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
                <form onSubmit={handleEditSubmit} className="update-modal">
                    <i className="fa-solid fa-x" onClick={toggleModal}></i>
                    <div className="top-input-div">
                        <input
                            name="title"
                            onChange={e => handleChange(e.target.name, e.target.value, setCurrentNote)}
                            type="text"
                            placeholder="note title"
                            value={currentNote.title}
                            className="input-item"
                            required
                        />
                        <input
                            name="date"
                            onChange={e => handleChange(e.target.name, e.target.value, setCurrentNote)}
                            type="date"
                            placeholder="date"
                            value={currentNote.date}
                            className="input-item"
                            required
                        />
                    </div>
                    <textarea
                        name="text"
                        onChange={e => handleChange(e.target.name, e.target.value, setCurrentNote)}
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