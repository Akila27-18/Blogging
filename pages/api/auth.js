let users = [{ id:1, email:'admin@test.com', password: 'password' }]

export default function handler(req, res){
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password, signup } = req.body

  if (signup) {
    const u = { id: users.length+1, email, password }
    users.push(u)
    return res.status(201).json({ user: { email: u.email }, token: 'demo-token' })
  }

  const found = users.find(u => u.email === email && u.password === password)
  if (!found) return res.status(401).json({ message: 'Invalid' })
  return res.status(200).json({ user: { email: found.email }, token: 'demo-token' })
}
