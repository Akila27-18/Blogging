import axios from '../../utils/axiosInstance'

export async function getStaticPaths(){
  const res = await axios.get('/posts')
  const paths = res.data.map(p => ({ params: { id: String(p.id) } }))
  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }){
  const res = await axios.get('/posts')
  const post = res.data.find(p => String(p.id) === String(params.id)) || null
  if (!post) return { notFound: true }
  return { props: { post }, revalidate: 10 }
}

export default function PostPage({ post }){
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>By {post.author}</small>
    </article>
  )
}
