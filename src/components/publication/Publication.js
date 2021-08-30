import React from 'react'
import { useLocation } from 'wouter'
import { usePublication } from '../../hooks/usePublication'
import downloadjs from 'downloadjs'
import imagenNoEncontrada from '../../assets/imagen-no-encontrada.jpg'
import './publication.css'

export default function Publication({
    fetchResult = null,
    publicationImage = {},
    title = 'Title not received',
    description = 'Description not received',
    id = -1,
    checkView = false
}) {
    const location = useLocation()
    const { deletePublication } = usePublication()
    const { imgUrl, name, mimetype } = publicationImage

    const handlePreviewImage = ({ id }) => {
        location[1](`/publication/${id}`)
    }

    const dowloadImage = () => {
        fetch(imgUrl).then(response => response.blob())
            .then(blob => downloadjs(blob, name, mimetype))
    }

    const fetchBlob = async () => {
        await deletePublication({ id })
        await fetchResult()
    }

    return (
        <div className="card">
            <div className="card-header d-flex justify-content-between">
                <h1 className="h4 title">{title}</h1>
                {!checkView && <div className="d-flex">
                    <button
                        className="btn btn-danger"
                        style={{ maxHeight: "45px" }}
                        onClick={fetchBlob}
                    >
                        <span className="material-icons">
                            delete_outline
                        </span>
                    </button>
                    <button
                        className="btn btn-primary"
                        style={{ maxHeight: "45px" }}
                        onClick={dowloadImage}
                    >
                        <span className="material-icons">
                            file_upload
                        </span>
                    </button>
                </div>}
            </div>
            <div className={`card-body ${!checkView && 'image'}` }>
                <img
                    className="card-img-top image-single"
                    src={imgUrl ? imgUrl : imagenNoEncontrada}
                    alt={description}
                    onClick={() => handlePreviewImage({ id })}
                />
                <span className="material-icons icon-photo">
                    {!checkView && 'photo'}
                </span>
            </div>
            <div className="card-footer">
                <h3 className="h5">{description}</h3>
            </div>
        </div>
    )
}
