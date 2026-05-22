export const config = { maxDuration: 30 }

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.anthropic_key
    if (!apiKey) return res.status(500).json({ error: { message: 'API key not configured' } })

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    })

    const data = await resp.json()
    res.setHeader('Access-Control-Allow-Origin', '*')
    return res.status(resp.status).json(data)

  } catch (e) {
    return res.status(500).json({ error: { message: e.message } })
  }
}
