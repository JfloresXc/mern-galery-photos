import React, { useCallback, useRef } from 'react'
import { usePublication } from '../hooks/usePublication'
import FormPublication from '../components/FormPublication'

export default function ImageAdd() {
    const { addPublication } = usePublication()

    const imgRef = useRef()
    const messageImageRef = useRef()
    const messageSuccessRef = useRef()

    const previewFile = useCallback(file => {
        let reader = new FileReader();

        // Esto es asincrono, esperara a que la imagen cargue
        reader.onload = () => imgRef.current.src = reader.result

        if (file) {
            reader.readAsDataURL(file)
            messageImageRef.current.innerHTML = 'Size: ' + (Math.round(file.size / 1024)) + "KB"
        } else setMessageError()
    }, [])


    const functionSubmit = async ({ title, description, file }) => {
        const formData = new FormData()
        formData.append('file', file[0])
        formData.append('title', title)
        formData.append('description', description)

        setMessageSuccess()
        await addPublication(formData)
    }

    const setMessageError = () => {
        imgRef.current.src = ''
        messageImageRef.current.innerHTML = "<b>Image not found</b>"
    }

    const setMessageSuccess = () => {
        messageSuccessRef.current.innerHTML = "<b>Image received successfully</b>"
        messageSuccessRef.current.className = 'alert alert-success'
        setTimeout(() => {
            messageSuccessRef.current.innerHTML = ""
            messageSuccessRef.current.className = ''
            imgRef.current.src = ''
            messageImageRef.current.innerHTML = ''
        }, 3000);
    }


    return (
        <div className="row mt-3 justify-content-center">
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-header">
                        <h1 className="h3">Load Image</h1>
                    </div>
                    <div className="card-body">
                        <FormPublication functionSubmit={functionSubmit} previewFile={previewFile} />
                    </div>
                </div>
                <div role="alert" ref={messageSuccessRef}></div>
            </div>
            <div className="col-lg-5">
                <p ref={messageImageRef}></p>
                <img ref={imgRef} alt="" className="w-50" />
            </div>
        </div>
    )
}
