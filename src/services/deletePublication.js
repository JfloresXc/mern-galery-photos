import { ENDPOINT } from './settings'
import axios from 'axios'

export const deletePublication = async ({ id }) => {
    const URL = `${ENDPOINT}/api/publications/${id}`
    await axios.delete(URL)
}