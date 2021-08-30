import { useState, useEffect, useCallback } from 'react'
import { postPublication } from '../services/postPublication'
import { deletePublication } from '../services/deletePublication'
import { getPublication } from '../services/getPublication'

const INITAL_VALUES = {

}

export function usePublication({ id } = { id: -1 }) {
    const [publication, setPublication] = useState(INITAL_VALUES)

    const fetchPublication = useCallback((id) => {
        getPublication({ id }).then(({ data }) => {
            setPublication(data)
        })
    }, [])

    useEffect(() => {
        if(id !== -1) fetchPublication(id)
    }, [fetchPublication, id])

    const addPublication = async publication => postPublication(publication)

    return {
        addPublication,
        deletePublication,
        publication
    }
}