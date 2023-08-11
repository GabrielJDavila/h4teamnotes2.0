import Note from "../../components/Note"
import BackBtn from "../../components/BackBtn"
import { Link } from "react-router-dom"

export default function ClientNotes() {

    const arr = [
        {
            id: 1,
            title: "Byron Vertigo",
            date: "08/09/2023",
            body: "text goues here. Morlagosjksljd. SKJskjhjnduie. fdjheh, sdsjkkjhf tofh eh ehb."
        },
        {
            id: 2,
            title: "Jesse's Back",
            date: "08/08/2023",
            body: "text goues here. Morlagosjksljd. SKJskjhjnduie. fdjheh, sdsjkkjhf tofh eh ehb."
        },
        {
            id: 3,
            title: "Wanda Pregnancy",
            date: "08/11/2023",
            body: "text goues here. Morlagosjksljd. SKJskjhjnduie. fdjheh, sdsjkkjhf tofh eh ehb.nfjkdsnjkfnsdkjfsdnjk. dfbnejhbfehjdbfhdsbfjhsdb. jkehnjker, ejkhkje - dont wjnsajkf dd it."
        }
    ]

    const notes = arr.map(obj => {
        return (
            <Note
                key={obj.id}
                title={obj.title}
                date={obj.date}
                body={obj.body}
            />
        )
    })

    // const search = location.state
    // console.log(search)

    return (
        <div className="client-notes-page-container">
            <BackBtn />
            <h2 className="client-notes-title">Client Notes</h2>
            <div className="client-notes-container">
                {notes}
            </div>
        </div>
    )
}