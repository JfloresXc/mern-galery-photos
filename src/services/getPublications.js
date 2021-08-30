import { ENDPOINT } from './settings'
import axios from 'axios'

export const getPublications = async () => {
    const URL = `${ENDPOINT}/api/publications/`
    const response = await axios.get(URL)
    const data = await response.data
    return {
        data
    }
}