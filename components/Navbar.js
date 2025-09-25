import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
  const { isAuthenticated, user } = useAuth()
  const dispatch = useDispatch()
  return (
    <nav style={{padding:12, borderBottom: '1px solid #eee'}}>
      <Link href="/">Home</Link> |{' '}
      <Link href="/dashboard">Dashboard</Link> |{' '}
      {isAuthenticated ? (
        <span>
          <strong>{user?.email}</strong>{' '}
          <button onClick={() => dispatch(logout())}>Logout</button>
        </span>
      ) : (
        <><Link href="/auth/login">Login</Link> | <Link href="/auth/signup">Sign up</Link></>
      )}
    </nav>
  )
}
