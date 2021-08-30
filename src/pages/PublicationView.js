import React from 'react'
import Publication from '../components/publication/Publication'
import { usePublication } from '../hooks/usePublication'

export default function PublicationView({ params: { id } }) {
    const { publication } = usePublication({ id })
    const { title, description, publicationImage } = publication

    return (
        <div className="row justify-content-center">
            <div className="col-5 ">
                <Publication
                    publicationImage={publicationImage}
                    title={title}
                    description={description}
                    checkView={true}
                />
            </div>
        </div>
    )
}
