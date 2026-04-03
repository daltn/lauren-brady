import { EventItemPage } from 'components/pages/event/EventItemPage'
import {
  getEventBySlug,
  getEventPaths,
  getHomeNavLinks,
  getHomePageTitle,
  getSettings,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { EventItemPayload, NavLink, SettingsPayload } from 'types'

interface PageProps {
  event?: EventItemPayload
  settings?: SettingsPayload
  homePageTitle?: string
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

export default function EventSlugRoute(props: PageProps) {
  const { event, settings, homePageTitle, navLinks, preview } = props
  return (
    <EventItemPage
      event={event}
      settings={settings}
      homePageTitle={homePageTitle}
      navLinks={navLinks}
      preview={preview}
    />
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query, PreviewData> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx
  const token = previewData.token

  const [settings, event, homePageTitle, rawNavLinks] = await Promise.all([
    getSettings({ token }),
    getEventBySlug({ token, slug: params.slug }),
    getHomePageTitle({ token }),
    getHomeNavLinks({ token }),
  ])

  if (!event) {
    return { notFound: true }
  }

  const navLinks = rawNavLinks?.map((l) => ({
    ...l,
    href: l.href.startsWith('#') ? `/${l.href}` : l.href,
  }))

  return {
    props: {
      event,
      settings,
      homePageTitle: homePageTitle ?? null,
      navLinks: navLinks ?? null,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 42,
  }
}

export const getStaticPaths = async () => {
  const paths = await getEventPaths()
  return {
    paths: paths?.map((slug) => ({ params: { slug } })) || [],
    fallback: false,
  }
}
