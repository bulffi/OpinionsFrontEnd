import axios from 'axios'
export default async function Delete(url, config) {
    const response = await axios.delete(url, config)
    return await response.data
}
