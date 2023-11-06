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
    // const [pathNames, setPathNames] = useState({})
    const uploadedFiles = ref(storage, "files/")

    // uploading file to firebase storage
    function uploadPdf() {
        if(!pdfFile) return
        // const filePath = pdfFile.name
        const storageName = `${uuidv4()}_${pdfFile.name}`
        // setPathNames(prev => ({
        //     ...prev,
        //     [filePath]: storageName,
        // }))
        const pdfRef = ref(storage, `files/${storageName}`)
        uploadBytes(pdfRef, pdfFile).then((res) => {
            window.location.reload()
        })
    }

    // use effect to display current month for schedule
    useEffect(() => {
        const currentDate = new Date()
        const monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
        const currentMonthName = monthNames[currentDate.getMonth()]
        setCurrentMonth(currentMonthName)
    }, [])

    // use effect for listing items in storage, setting the urls in state
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

    // variable that holds elements with urls to be rendered
    const pdfLinks = [...pdfUploadList].map(url => {
        return (
            <div key={url} className="link-container">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="schedule-link"
                >
                    view workout sheet
                </a>
                <i id={url} onClick={handleClick} className="fa-solid fa-trash"></i>
            </div>
        )
    })

    // sets file to state ready to be uploaded
    function onFileChange(e) {
        const file = e.target.files[0]
        setPdfFile(file)
    }

    // deletes the files by decoding the url, and removing sections of it to match it to the ref name in storage
    async function handleClick(e) {
        const fileUrl = e.target.id
        const fileName = decodeURIComponent(fileUrl.split("/").pop())
        const indexOfFiles = fileName.lastIndexOf("files/")

        if (indexOfFiles === -1) {
            console.error("invalid file URL:", fileUrl)
            return
        }

        const fileNameWithQuery = fileName.substring(6)
        const indexOfQueryParams = fileNameWithQuery.indexOf("?alt=")
        const refFileName = indexOfQueryParams === -1
            ? fileNameWithQuery
            : fileNameWithQuery.substring(0, indexOfQueryParams)

        const fileRef = ref(storage, `files/${refFileName}`)
        try {
            await deleteObject(fileRef)
            setPdfUploadList(prev => new Set([...prev].filter(url => url !== fileUrl)))
        } catch(error) {
            console.log("error deleting file:", error)
        }

    }

    return (
        <div className="shift-schedule-page">
            <div className="upload-div">
                <input 
                    type="file"
                    name="pdf"
                    accept=".pdf"
                    onChange={onFileChange}
                    className="file-input"
                />
                <button onClick={uploadPdf} className="upload-btn">Upload File</button>
            </div>
            <div className="file-list">
                {pdfUploadList && pdfLinks}
            </div>
        </div>
    )

}