// Directory names end up as the default Vercel project name/domain later
// (e.g. rishabh-kumar-portfolio.vercel.app), so this needs to produce
// something meaningful, not just filesystem-safe.
export function slugify(name: string): string {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'my'
}
