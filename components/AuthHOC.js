import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useAuth from '../hooks/useAuth'

export default function withAuth(WrappedComponent) {
  return function Protected(props) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated) router.push('/auth/login')
    }, [isAuthenticated, router])

    if (!isAuthenticated) return null
    return <WrappedComponent {...props} />
  }
}
