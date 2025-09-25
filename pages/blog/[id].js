import axios from 'axios'

export default function BlogDetail({ post }) {
  if (!post) return <div>Not found</div>
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

export async function getStaticPaths() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const res = await axios.get(`${baseUrl}/api/posts`)
  const posts = res.data

  const paths = posts.map((p) => ({
    params: { id: String(p.id) },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  try {
    const res = await axios.get(`${baseUrl}/api/posts/${params.id}`)
    return { props: { post: res.data }, revalidate: 10 }
  } catch (err) {
    return { notFound: true }
  }
}
