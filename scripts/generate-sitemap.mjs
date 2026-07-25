import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = (process.env.SITE_URL || 'https://little-light-studios.vercel.app').replace(/\/$/, '')
const stories = JSON.parse(readFileSync(join(root, 'src/data/stories.json'), 'utf8'))

const staticPaths = ['/', '/stories', '/videos', '/tonight', '/about', '/privacy', '/contact']

const urls = [
  ...staticPaths.map((path) => ({
    loc: `${siteUrl}${path === '/' ? '' : path}`,
    changefreq: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? '1.0' : path === '/stories' ? '0.9' : '0.7',
  })),
  ...stories.map((story) => ({
    loc: `${siteUrl}/stories/${story.id}`,
    changefreq: 'monthly',
    priority: '0.8',
  })),
]

const body = urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

writeFileSync(join(root, 'public/sitemap.xml'), xml)
console.log(`Wrote public/sitemap.xml (${urls.length} URLs) for ${siteUrl}`)
