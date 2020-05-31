import axios from 'axios'
export default async function Get(url, config) {
  const response = await axios.get(url, config)
  return await response.data
}
