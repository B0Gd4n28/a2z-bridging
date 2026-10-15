// Rough reading time for a Payload Lexical document (200 words per minute, minimum 1 minute).
type LexicalNode = { text?: string; children?: LexicalNode[] }

function countWords(node: LexicalNode | undefined): number {
  if (!node) return 0
  let n = typeof node.text === 'string' ? node.text.split(/\s+/).filter(Boolean).length : 0
  if (Array.isArray(node.children)) for (const c of node.children) n += countWords(c)
  return n
}

export function readingTime(content: unknown): number {
  const root = (content as { root?: LexicalNode } | null | undefined)?.root
  return Math.max(1, Math.round(countWords(root) / 200))
}

export function formatPublished(date?: string | null): string {
  if (!date) return ''
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))
}
