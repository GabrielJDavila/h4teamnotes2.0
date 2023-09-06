import { useState, useEffect } from "react"
import { Document, Page } from "react-pdf"
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export default function ShiftSchedule() {
    const [pdfFile, setPdfFile] = useState(null)
    // const [numPages, setNumPages] = useState(null)
    // const [pageNumber, setPageNumber] = useState(null)

    function onFileChange(e) {
        const file = e.target.files[0]
        setPdfFile(file)
    }

    // function onDocLoadSuccess({numPages}) {
    //     setNumPages(numPages)
    // }

    return (
        <div className="shift-schedule-page">
            <input 
                type="file"
                name="pdf"
                accept=".pdf"
                onChange={onFileChange}
            />
           {pdfFile && (
                <a
                    href={URL.createObjectURL(pdfFile)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  Open to view schedule  
                </a>

                // <Document file={pdfFile} className="pdf-doc">
                //     <Page pageNumber={1}/>
                // </Document>

                // <div>
                //     <Document
                //         file={pdfFile}
                //         onLoadSuccess={onDocLoadSuccess}
                //     >
                //         <Page pageNumber={pageNumber}/>
                //     </Document>
                //     <p>Page {pageNumber} of {numPages}</p>
                // </div>
            )}
        </div>
    )
}