import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/slices/postSlice'

export default function useFetchPosts() {
  const dispatch = useDispatch()
  const posts = useSelector(s => s.posts.items)
  const status = useSelector(s => s.posts.status)

  useEffect(() => { dispatch(fetchPosts()) }, [dispatch])

  return { posts, status }
}
