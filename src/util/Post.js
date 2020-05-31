import axios from 'axios'
export default async function Post(url, data, config) {
  const response = await axios.post(url, data, config)
  return await response.data
}
