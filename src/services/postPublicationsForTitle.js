import { ENDPOINT } from './settings'
import axios from 'axios'

export const postPublicationsForTitle = async ({ title }) => {
    const URL = `${ENDPOINT}/api/publications/title`
    const response = await axios.post(URL, { title })
    const data = await response.data
    return {
        data
    }
}