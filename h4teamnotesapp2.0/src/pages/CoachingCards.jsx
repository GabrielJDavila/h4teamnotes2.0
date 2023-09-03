import { useState, useEffect, useRef } from "react"
import Note from "../components/Note"
import BackBtn from "../components/BackBtn"
import { Link } from "react-router-dom"
import { getFromCollection, addToCollection, clientNotes, deleteItem } from "../firebase"


export default function CoachingCards() {
    const [openModal, setOpenModal] = useState(false)
    const menuRef = useRef(null)

    function toggleModal() {
        setOpenModal(prev => !prev)
    }

    const modalDisplay = {
        display: openModal ? "flex" : "none"
    }

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
            <form className="add-client-modal" style={modalDisplay}>
                <div className="coaching-cards-title-container">
                    <h3 className="modal-title">Add new client</h3>
                    <i className="fa-solid fa-x" onClick={toggleModal}></i>
                </div>
                <div className="top-input-div">
                    <input
                        name="name"
                        type="text"
                        placeholder="client name"
                        className="modal-input"
                    />
                    <input
                        name="birthdate"
                        type="date"
                        placeholder="birthdate"
                        className="input-item birthdate"
                        required
                    />
                </div>
                <textarea
                    name="text"
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
                        placeholder="search client"
                        className="input-item search-bar"
                        required
                    />
                    <button className="submit-btn search-btn">add note</button>
                </div>
            </form>
            
            <h2 className="notes-page-title">Client Notes</h2>
            <div className="notes-container">
          
            </div>
        </div>
    )
}