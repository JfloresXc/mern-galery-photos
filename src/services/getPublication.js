import { ENDPOINT } from './settings'
import axios from 'axios'

export const getPublication = async ({ id }) => {
    const URL = `${ENDPOINT}/api/publications/${id}`
    const response = await axios.get(URL)
    const [data] = await response.data
    return {
        data
    }
}