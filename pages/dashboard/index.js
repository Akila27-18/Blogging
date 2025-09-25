import { useEffect } from 'react'
import withAuth from '../../components/AuthHOC'
import { useSelector, useDispatch } from 'react-redux'
import BlogForm from '../../components/BlogForm'
import { deletePost, fetchPosts } from '../../redux/slices/postSlice'

function Dashboard() {
  const posts = useSelector((s) => s.posts.items)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())   // load posts from API
  }, [dispatch])

  return (
    <div>
      <h1>Your Dashboard</h1>
      <h2>Create new post</h2>
      <BlogForm onSuccess={() => dispatch(fetchPosts())} />

      <h2>Your posts</h2>
      {posts.map((p) => (
        <div
          key={p.id}
          style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}
        >
          <strong>{p.title}</strong>
          <div>
            <button onClick={() => dispatch(deletePost(p.id))}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default withAuth(Dashboard)
