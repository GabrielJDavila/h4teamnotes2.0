import { useState, useEffect, useRef, useContext } from "react"
import Note from "../components/Note"
import BackBtn from "../components/BackBtn"
import { Link } from "react-router-dom"
import { getFromCollection, addToCollection, coachingCards, deleteItem } from "../firebase"
import { ToggleContext } from "../App"

export default function CoachingCards() {
    const {toggle, setToggle} = useContext(ToggleContext)
    const [card, setCard] = useState({
        title: "",
        date: "",
        text: ""
    })
    const [searchQuery, setSearchQuery] = useState({
        search: ""
    })
    const [cardsFromDB, setCardsFromDB] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const menuRef = useRef(null)
   
    async function loadData() {
        try {
            const data = await getFromCollection(coachingCards)
            // const sortedData = data.sort((a, b) => b.date.localeCompare(a.date))
            setCardsFromDB(data)
        } catch(e) {
            console.log("error fetching data: ", e)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    useEffect(() => {
        const filteredCards = cardsFromDB.filter(card => {
            return card.title.toLowerCase().startsWith(searchQuery.search.toLowerCase())
        })
        setFilteredItems(filteredCards)
    }, [searchQuery, cardsFromDB])

    function handleSubmit(e) {
        e.preventDefault()
        addToCollection(card.title, card.date, card.text, coachingCards)
        loadData()
    }

    function handleChange(e) {
        const {name, value} = e.target
        setCard(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function handleSearch(e) {
        const {name, value} = e.target
        setSearchQuery(prev => ({
            ...prev,
            [name]: value
        }))

    }

    function handleClick(e) {
        const itemId = e.target.id
        deleteItem(coachingCards, itemId)
        loadData()
    }

    function toggleModal() {
        setToggle(prev => !prev)
    }

    const modalDisplay = {
        display: toggle ? "flex" : "none"
    }

    const cards = filteredItems.map(obj => {
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

    // const handleClickOutside = (e) => {
    //     if(menuRef.current && !menuRef.current.contains(e.target)) {
    //         setOpenModal(false)
    //     }
    // }
    // document.addEventListener("click", handleClickOutside)

    return (
        <div className="coaching-cards-page-container">
            <BackBtn />
            <button onClick={toggleModal} className="add-new-client">Add new client</button>
            <form onSubmit={handleSubmit} className="add-client-modal" style={modalDisplay}>
                <div className="coaching-cards-title-container">
                    <h3 className="modal-title">Add new client</h3>
                    <i className="fa-solid fa-x" onClick={toggleModal}></i>
                </div>
                <div className="top-input-div">
                    <input
                        name="title"
                        onChange={handleChange}
                        type="text"
                        value={card.title}
                        placeholder="client name"
                        className="modal-input"
                    />
                    <input
                        name="date"
                        type="date"
                        onChange={handleChange}
                        value={card.date}
                        placeholder="birthdate"
                        className="input-item birthdate"
                        required
                    />
                </div>
                <textarea
                    name="text"
                    onChange={handleChange}
                    value={card.text}
                    placeholder="client notes"
                    className="add-new-client-text"
                    required
                ></textarea>
                <button className="modal-submit">add client</button>
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
                {cards}
            </div>
        </div>
    )
}