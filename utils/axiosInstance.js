import axios from 'axios'

const baseURL =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/api'
    : '/api'

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach token automatically when running in browser
axiosInstance.interceptors.request.use((config) => {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('token')
      const token = raw ? JSON.parse(raw) : null
      if (token) config.headers.Authorization = `Bearer ${token}`
    }
  } catch (e) {}
  return config
})

export default axiosInstance
