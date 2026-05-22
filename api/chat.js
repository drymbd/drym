export const config = { maxDuration: 30 }

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).end()

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.anthropic_key || process.env.Anthropic_key
    if (!apiKey) return res.status(500).json({ error: { message: 'API key not configured' } })

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(body)
    })

    const data = await resp.json()
    return res.status(resp.status).json(data)

  } catch (e) {
    return res.status(500).json({ error: { message: e.message } })
  }
}
