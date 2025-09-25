import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { login } from '../../redux/slices/authSlice'
import { useForm } from 'react-hook-form'

export default function Login(){
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap()
      router.push('/')
    } catch (e) { alert('Login failed') }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid', gap:8, maxWidth:400}}>
      <h2>Login</h2>
      <input placeholder="Email" {...register('email')} />
      <input placeholder="Password" type="password" {...register('password')} />
      <button type="submit">Login</button>
    </form>
  )
}
