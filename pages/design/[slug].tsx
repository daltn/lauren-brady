import { DesignItemPage } from 'components/pages/design/DesignItemPage'
import {
  getDesignBySlug,
  getDesignPaths,
  getHomeNavLinks,
  getSettings,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { DesignItemPayload, NavLink, SettingsPayload } from 'types'

interface PageProps {
  design?: DesignItemPayload
  settings?: SettingsPayload
  navLinks?: NavLink[]
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function DesignSlugRoute(props: PageProps) {
  const { design, settings, navLinks, preview } = props
  return (
    <DesignItemPage
      design={design}
      settings={settings}
      navLinks={navLinks}
      preview={preview}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx
  const token = previewData.token

  const [settings, design, rawNavLinks] = await Promise.all([
    getSettings({ token }),
    getDesignBySlug({ token, slug: params.slug }),
    getHomeNavLinks({ token }),
  ])

  if (!design) {
    return { notFound: true }
  }

  const navLinks = rawNavLinks?.map((l) => ({
    ...l,
    href: l.href.startsWith('#') ? `/${l.href}` : l.href,
  }))

  return {
    props: {
      design,
      settings,
      navLinks: navLinks ?? null,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 42,
  }
}

export const getStaticPaths = async () => {
  const paths = await getDesignPaths()
  return {
    paths: paths?.map((slug) => ({ params: { slug } })) || [],
    fallback: false,
  }
}
