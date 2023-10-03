import { useState, useEffect, useContext } from "react"
import Note from "../components/Note"
import BackBtn from "../components/BackBtn"
import { getFromCollection, addToCollection, coachingCards, deleteItem, retrieveDoc, editItem } from "../firebase"
import { ToggleContext2 } from "../App"

export default function CoachingCards() {
    // all state variables initiated
    const {toggle2, setToggle2} = useContext(ToggleContext2)
    const [editToggle, setEditToggle] = useState(false)
    const [card, setCard] = useState({
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
    const [searchQuery, setSearchQuery] = useState({
        search: ""
    })
    const [cardsFromDB, setCardsFromDB] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [currentItemId, setCurrentItemId] = useState(null)
   
    // intial data loaded from firestore
    async function loadData() {
        try {
            const data = await getFromCollection(coachingCards)
            const sortedData = data.slice().sort((a, b) => a.title.localeCompare(b.title))
            setCardsFromDB(sortedData)
        } catch(e) {
            console.log("error fetching data: ", e)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    // filter items as user types to match search query
    useEffect(() => {
        const filteredCards = cardsFromDB.filter(card => {
            return card.title.toLowerCase().startsWith(searchQuery.search.toLowerCase())
        })
        setFilteredItems(filteredCards)
    }, [searchQuery, cardsFromDB])

    // retrieves single doc from firestore
    async function loadSingleDoc(currentItemId) {
        try {
            const docSnap = await retrieveDoc(coachingCards, currentItemId)
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

    // handles client data added to firestore
    function handleSubmit(e) {
        e.preventDefault()
        addToCollection(card.title, card.date, card.text, coachingCards)
        loadData()
        clearCardState()
        addToggleModal()
    }

    // function to submit form and add edited card to firestore
    function handleEditSubmit(e) {
        e.preventDefault()
        editItem(coachingCards, currentItemId, currentNote.title, currentNote.date, currentNote.text)
        loadData()
        editToggleModal()
    }

    // clears form data after submitting
    function clearCardState() {
        setCard({
            title: "",
            date: "",
            text: ""
        })
    }

    // handles change for inputs of adding new notes/editing notes
    function handleChange(name, value, stateSetter) {
        stateSetter(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // handles change on search query
    function handleSearch(e) {
        const {name, value} = e.target
        setSearchQuery(prev => ({
            ...prev,
            [name]: value
        }))

    }

    // handle edit button click
    function handleEditClick(e) {
        const itemId = e.target.dataset.id
        loadSingleDoc(itemId)
        setCurrentItemId(itemId)
        editToggleModal()
    }

    // handles click to trigger deletion of item
    function handleDelete(e) {
        const itemId = e.target.dataset.id
        deleteItem(coachingCards, itemId)
        loadData()
    }

    // toggles add client modal state
    function addToggleModal() {
        setToggle2(prev => !prev)
    }

    // toggles edit client modal state
    function editToggleModal() {
        setEditToggle(prev => !prev)
    }

    // if state is true, displays add client modal
    const modalDisplay = {
        display: toggle2 ? "flex" : "none"
    }

    // Maps through filtered data to render Note component for each object
    const cards = filteredItems.map(obj => {
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
        <div className="coaching-cards-page-container">
            <BackBtn />
            <button onClick={addToggleModal} className="add-new-client">Add new client</button>

            <form onSubmit={handleSubmit} className="add-client-modal" style={modalDisplay}>
                <div className="coaching-cards-title-container">
                    <h3 className="modal-title">Add new client</h3>
                    <i className="fa-solid fa-x" onClick={addToggleModal}></i>
                </div>
                <div className="top-input-div">
                    <input
                        name="title"
                        onChange={e => handleChange(e.target.name, e.target.value, setCard)}
                        type="text"
                        value={card.title}
                        placeholder="client name"
                        className="modal-input"
                    />
                    <input
                        name="date"
                        type="date"
                        onChange={e => handleChange(e.target.name, e.target.value, setCard)}
                        value={card.date}
                        placeholder="birthdate"
                        className="input-item birthdate"
                        required
                    />
                </div>
                <textarea
                    name="text"
                    onChange={e => handleChange(e.target.name, e.target.value, setCard)}
                    value={card.text}
                    placeholder="client notes"
                    className="add-new-client-text"
                    required
                ></textarea>
                <button className="add-modal-submit">add client</button>
            </form>
            <form className="search-clients">
                <h3 className="search-title">Search a client</h3>
                <div className="search-container">
                    <input
                        name="search"
                        type="search"
                        onChange={handleSearch}
                        placeholder="search client"
                        className="input-item search-bar"
                        required
                    />
                    <button className="submit-btn search-btn">search</button>
                </div>
            </form>
            
            <h2 className="notes-page-title">Cards</h2>
            <div className="notes-container">
            {
                editToggle && currentNote ?
                <form onSubmit={handleEditSubmit} className="update-modal">
                    <div className="update-title-container">
                        <h3>Edit Card</h3>
                        <i className="fa-solid fa-x" onClick={editToggleModal}></i>
                    </div>
                    <div className="top-input-div">
                        <input
                            name="title"
                            onChange={e => handleChange(e.target.name, e.target.value, setCurrentNote)}
                            type="text"
                            placeholder="card name"
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
                        placeholder="write text here"
                        value={currentNote.text}
                        required
                        className="update-textarea"
                    ></textarea>
                    <button className="submit-btn">update note</button>
                </form> : ""
                }
                {cards}
            </div>
        </div>
    )
}