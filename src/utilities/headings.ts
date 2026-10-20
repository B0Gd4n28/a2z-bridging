type LexNode = { type?: string; tag?: string; text?: string; children?: LexNode[] }

export const nodeText = (n: LexNode | undefined): string =>
  !n ? '' : typeof n.text === 'string' ? n.text : (n.children ?? []).map(nodeText).join('')

export const slugifyHeading = (s: string): string =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export type TocItem = { id: string; text: string; level: 2 | 3 }

export function extractHeadings(content: unknown): TocItem[] {
  const root = (content as { root?: LexNode } | null | undefined)?.root
  const out: TocItem[] = []
  const seen = new Set<string>()
  const walk = (n: LexNode) => {
    if (n.type === 'heading' && (n.tag === 'h2' || n.tag === 'h3')) {
      const text = nodeText(n).trim()
      const id = slugifyHeading(text)
      if (text && id && !seen.has(id)) {
        seen.add(id)
        out.push({ id, text, level: n.tag === 'h2' ? 2 : 3 })
      }
    }
    n.children?.forEach(walk)
  }
  if (root) walk(root)
  return out
}
