import React from 'react'
import { usePublications } from '../hooks/usePublications'
import SearchForm from '../components/SearchForm'
import Publication from '../components/publication/Publication'

export default function Images() {
    const { publications, fetchResult, fetchResultForTitle } = usePublications()

    const getPublicationsForTitle = ({ title }) => {
        fetchResultForTitle({ title })
    }

    return (
        <>
            <SearchForm getPublicationsForTitle={getPublicationsForTitle} fetchResult={fetchResult} />
            <div className="container">
                <div className="row mt-3">
                    {publications.map(({ title, description, publicationImage, _id }, index) => {
                        return (
                            <div className="col-lg-3 mb-3" key={index}>
                                <Publication
                                    fetchResult={fetchResult}
                                    publicationImage={publicationImage}
                                    title={title}
                                    description={description}
                                    id={_id}
                                />
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </>
    )
}


