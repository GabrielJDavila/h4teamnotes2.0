import { useState, useEffect } from "react"
import { Document, Page } from "react-pdf"
import { pdfjs } from 'react-pdf'
import { storage } from "../firebase"
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function ShiftSchedule() {
    const [pdfFile, setPdfFile] = useState(null)
    const [pdfUploadList, setPdfUploadList] = useState(new Set())
    const [currentMonth, setCurrentMonth] = useState("")
    const [pathNames, setPathNames] = useState({})
    const uploadedFiles = ref(storage, "files/")

    function uploadPdf() {
        if(!pdfFile) return
        const filePath = pdfFile.name
        const storageName = `${uuidv4()}_${pdfFile.name}`
        setPathNames(prev => ({
            ...prev,
            [filePath]: storageName,
        }))
        const pdfRef = ref(storage, `files/${storageName}`)
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
                // const fileName = item.name
                // setPathNames(prev => [...prev, fileName])
                getDownloadURL(item).then(url => {
                    
                    setPdfUploadList(prev => new Set([...prev, url]))
                })
            })
        })
    }, [])

    const pdfLinks = [...pdfUploadList].map(url => {
        return (
            <div key={url} className="link-container">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="schedule-link"
                >
                    view {currentMonth} schedule
                </a>
                <i id={url} onClick={handleClick} className="fa-solid fa-trash"></i>
            </div>
        )
    })

    function onFileChange(e) {
        const file = e.target.files[0]
        setPdfFile(file)
    }

    async function handleClick(e) {
        const fileUrl = e.target.id
        const fileName = fileUrl.split("/").pop()
        console.log(fileName)

        const fileRef = ref(storage, `files/${fileName}`)
        try {
            await deleteObject(fileRef)
            setPdfUploadList(prev => new Set([...prev].filter(url => url !== fileUrl)))
        } catch(error) {
            console.log("error deleting file:", error)
        }

    }

    return (
        <div className="shift-schedule-page">
            <input 
                type="file"
                name="pdf"
                accept=".pdf"
                onChange={onFileChange}
                className="file-input"
            />
            <button onClick={uploadPdf} className="upload-btn">Upload File</button>
            <div className="file-list">
                {pdfUploadList && pdfLinks}
            </div>
        </div>
    )
}