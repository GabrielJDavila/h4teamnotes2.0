import Note from "../../components/Note"

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
            body: "text goues here. Morlagosjksljd. SKJskjhjnduie. fdjheh, sdsjkkjhf tofh eh ehb."
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
    return (
        <div className="client-notes-page-container">
            <h2 className="client-notes-title">Client Notes</h2>
            <div className="client-notes-container">
                {notes}
            </div>
        </div>
    )
}