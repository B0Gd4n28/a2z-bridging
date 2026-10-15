// The old WordPress RSS feed no longer exists: answer 410 Gone so search engines drop it.
export function GET() {
  return new Response('Gone', { status: 410, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
