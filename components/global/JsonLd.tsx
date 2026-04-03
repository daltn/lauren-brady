const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lauren-brady.com'

export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function personSchema({
  name,
  jobTitle,
  description,
}: {
  name?: string
  jobTitle?: string
  description?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name ?? 'Lauren Brady',
    ...(jobTitle && { jobTitle }),
    ...(description && { description }),
    url: SITE_URL,
  }
}

export function projectSchema({
  title,
  slug,
  client,
  role,
  tags,
  imageUrl,
  creatorName,
}: {
  title?: string
  slug?: string
  client?: string
  role?: string
  tags?: string[]
  imageUrl?: string | null
  creatorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    creator: { '@type': 'Person', name: creatorName ?? 'Lauren Brady' },
    ...(client && { contributor: client }),
    ...(role && { description: role }),
    ...(tags?.length && { keywords: tags.join(', ') }),
    ...(imageUrl && { image: imageUrl }),
    ...(slug && { url: `${SITE_URL}/projects/${slug}` }),
  }
}

export function eventSchema({
  title,
  slug,
  imageUrl,
  creatorName,
}: {
  title?: string
  slug?: string
  imageUrl?: string | null
  creatorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    organizer: { '@type': 'Person', name: creatorName ?? 'Lauren Brady' },
    ...(imageUrl && { image: imageUrl }),
    ...(slug && { url: `${SITE_URL}/event/${slug}` }),
  }
}

export function designSchema({
  title,
  slug,
  imageUrl,
  creatorName,
}: {
  title?: string
  slug?: string
  imageUrl?: string | null
  creatorName?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    creator: { '@type': 'Person', name: creatorName ?? 'Lauren Brady' },
    ...(imageUrl && { image: imageUrl }),
    ...(slug && { url: `${SITE_URL}/design/${slug}` }),
  }
}
