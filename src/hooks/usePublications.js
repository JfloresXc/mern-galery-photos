import { useState, useEffect } from 'react'
import { getPublications } from '../services/getPublications'
import { postPublicationsForTitle } from '../services/postPublicationsForTitle'

export function usePublications() {
    const [publications, setPublications] = useState([])

    useEffect(() => {
        fetchResult()
    }, [setPublications])

    const fetchResult = () => {
        getPublications().then(({ data }) => {
            setPublications(data)
        })
    }

    const fetchResultForTitle = ({ title }) => {
        postPublicationsForTitle({ title }).then(({ data }) => {
            setPublications(data)
        })
    }

    return {
        publications,
        fetchResult,
        fetchResultForTitle
    }
}