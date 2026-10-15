const base = process.argv[2] || 'http://localhost:3000'
const paths = [
  '/', '/case-studies', '/case-studies/bridging-loan-northwood-7-days', '/case-studies/auction-finance-750000-28-days',
  '/case-studies/warehouse-refinance-hounslow', '/guides', '/guides/what-is-a-bridging-loan', '/privacy-policy', '/complaints',
  '/thank-you', '/feed', '/feed/', '/admin', '/admin/login', '/calculator', '/team', '/contact', '/quote',
  '/bridging-loan-northwood/', '/services/bridging-loans/', '/category/blog/page/2', '/contact-us', '/what-is-a-bridging-loan/',
  '/nope-404',
]
;(async () => {
  for (const p of paths) {
    try {
      const r = await fetch(base + p, { redirect: 'manual' })
      const loc = r.headers.get('location')
      let extra = ''
      if (r.status === 200 && !p.startsWith('/admin')) {
        const h = await r.text()
        extra = ` len=${h.length} h1=${(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, '').slice(0, 60)}`
      }
      console.log(r.status, p, loc ? '-> ' + loc : '', extra)
    } catch (e) {
      console.log('ERR', p, e.message)
    }
  }
})()
