import { useState, useEffect } from "react"
import { Document, Page } from "react-pdf"
import { pdfjs } from 'react-pdf'
import { storage } from "../firebase"
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function ShiftSchedule() {
    const [pdfFile, setPdfFile] = useState(null)
    const [pdfUploadList, setPdfUploadList] = useState(new Set())
    const [currentMonth, setCurrentMonth] = useState("")
    const uploadedFiles = ref(storage, "files/")
    console.log(currentMonth)
    function uploadPdf() {
        if(!pdfFile) return
        const pdfRef = ref(storage, `files/${pdfFile.name + uuidv4()}`)
        uploadBytes(pdfRef, pdfFile).then((res) => {
            alert("image uploaded")
            window.location.reload()
        })
    }

    useEffect(() => {
        const currentDate = new Date()
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
        const currentMonthName = monthNames[currentDate.getMonth()]
        setCurrentMonth(currentMonthName)
    }, [])
    useEffect(() => {
        listAll(uploadedFiles).then((res) => {
            res.items.forEach(item => {
                getDownloadURL(item).then(url => {
                    setPdfUploadList(prev => new Set([...prev, url]))
                })
            })
        })
    }, [])

    const pdfLinks = [...pdfUploadList].map(url => {
        return (
            <div key={url}>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="schedule-link"
                >
                    view {currentMonth} schedule
                </a>
            </div>
        )
    })

    function onFileChange(e) {
        const file = e.target.files[0]
        setPdfFile(file)
    }

    return (
        <div className="shift-schedule-page">
            <input 
                type="file"
                name="pdf"
                accept=".pdf"
                onChange={onFileChange}
            />
            <button onClick={uploadPdf}>Upload File</button>
            <div className="file-list">
                {pdfUploadList && pdfLinks}
            </div>
        </div>
    )
}