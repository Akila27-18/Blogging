import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { signup } from '../../redux/slices/authSlice'
import { useForm } from 'react-hook-form'

export default function Signup(){
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const router = useRouter()

  const onSubmit = async (data) => {
    try {
      await dispatch(signup(data)).unwrap()
      router.push('/')
    } catch (e) { alert('Signup failed') }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid', gap:8, maxWidth:400}}>
      <h2>Sign up</h2>
      <input placeholder="Email" {...register('email')} />
      <input placeholder="Password" type="password" {...register('password')} />
      <button type="submit">Sign up</button>
    </form>
  )
}
