import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../redux/slices/postSlice'

export default function BlogForm({ defaultValues = {}, onSuccess }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues })
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      if (defaultValues.id) {
        await dispatch(updatePost({ id: defaultValues.id, data })).unwrap()
      } else {
        await dispatch(createPost(data)).unwrap()
      }
      reset()
      if (onSuccess) onSuccess()
    } catch (e) {
      alert('Save failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{display:'grid', gap:8}}>
      <input placeholder="Title" {...register('title')} required />
      <textarea placeholder="Content" {...register('content')} rows={8} required />
      <input placeholder="Tags (comma separated)" {...register('tags')} />
      <button type="submit">Save</button>
    </form>
  )
}
