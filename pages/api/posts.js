let posts = [
  { id: 1, title: 'Hello World', content: 'First post', author: 'admin', tags: ['intro'] }
]
let nextId = 2

export default function handler(req, res){
  if (req.method === 'GET') {
    return res.status(200).json(posts)
  }

  if (req.method === 'POST') {
    const { title, content, tags } = req.body
    const newPost = { id: nextId++, title, content, tags: tags ? (Array.isArray(tags) ? tags : String(tags).split(',').map(t=>t.trim())) : [], author: 'you' }
    posts.unshift(newPost)
    return res.status(201).json(newPost)
  }

  if (req.method === 'PUT') {
    const { id } = req.query
    const idx = posts.findIndex(p => String(p.id) === String(id))
    if (idx === -1) return res.status(404).end()
    posts[idx] = { ...posts[idx], ...req.body }
    return res.status(200).json(posts[idx])
  }

  if (req.method === 'DELETE') {
    const { id } = req.query
    posts = posts.filter(p => String(p.id) !== String(id))
    return res.status(204).end()
  }

  res.status(405).end()
}
