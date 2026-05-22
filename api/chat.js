export const config = { runtime: 'edge' }

export default async function handler(req) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  }

  if (req.method === 'OPTIONS') return new Response(null, { headers })

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.anthropic_key || process.env.Anthropic_key
  if (!apiKey) return new Response(JSON.stringify({ error: { message: 'API key not configured' } }), { status: 500, headers })

  const text = await req.text()
  
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: text
  })

  const data = await resp.text()
  return new Response(data, { status: resp.status, headers })
}
