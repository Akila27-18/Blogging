import BlogCard from '../components/BlogCard'
import axios from '../utils/axiosInstance'

export async function getStaticProps(){
  // Note: using relative API route for demo; in production fetch from your real backend.
  const res = await axios.get('/posts')
  return { props: { posts: res.data }, revalidate: 10 }
}

export default function Home({ posts }){
  return (
    <div>
      <h1>All Blogs</h1>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map(p => <BlogCard key={p.id} post={p} />)}
    </div>
  )
}
