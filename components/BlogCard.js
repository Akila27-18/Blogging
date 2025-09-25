import Link from 'next/link'
export default function BlogCard({ post }){
  return (
    <article style={{border:'1px solid #ddd', padding:12, marginBottom:12}}>
      <h3><Link href={`/blog/${post.id}`}>{post.title}</Link></h3>
      <p>{post.excerpt || (post.content ? post.content.slice(0,150) + '...' : '')}</p>
      <small>By {post.author}</small>
    </article>
  )
}
