import axios from 'axios'

export default function PostPage({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>By {post.author}</small>
    </article>
  )
}

export async function getStaticPaths() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const res = await axios.get(`${baseUrl}/api/posts`)
  const paths = res.data.map((p) => ({ params: { id: String(p.id) } }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const res = await axios.get(`${baseUrl}/api/posts`)
  const post = res.data.find((p) => String(p.id) === String(params.id)) || null

  if (!post) return { notFound: true }

  return { props: { post }, revalidate: 10 }
}
