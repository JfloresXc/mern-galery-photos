import { ENDPOINT } from './settings'
import axios from 'axios'

export const postPublication = async (data) => {
    const URL = `${ENDPOINT}/api/publications/`

    await axios.post(URL, data)
}