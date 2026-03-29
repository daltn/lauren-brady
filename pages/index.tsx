import { PreviewSuspense } from '@sanity/preview-kit'
import { HomePage } from 'components/pages/home/HomePage'
import { PreviewWrapper } from 'components/preview/PreviewWrapper'
import {
  getAllDesign,
  getAllEvents,
  getAllProjects,
  getHomePage,
  getSettings,
} from 'lib/sanity.client'
import { GetStaticProps } from 'next'
import { lazy } from 'react'
import {
  HomePagePayload,
  SettingsPayload,
  ShowcaseDesign,
  ShowcaseEvent,
  ShowcaseProject,
} from 'types'

const HomePagePreview = lazy(
  () => import('components/pages/home/HomePagePreview')
)

interface PageProps {
  page: HomePagePayload
  settings: SettingsPayload
  projects: ShowcaseProject[]
  events: ShowcaseEvent[]
  design: ShowcaseDesign[]
  preview: boolean
  token: string | null
}

interface Query {
  [key: string]: string
}

interface PreviewData {
  token?: string
}

export default function IndexPage(props: PageProps) {
  const { page, settings, projects, events, design, preview, token } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PreviewWrapper>
            <HomePage
              page={page}
              settings={settings}
              projects={projects}
              events={events}
              design={design}
              preview={preview}
            />
          </PreviewWrapper>
        }
      >
        <HomePagePreview token={token} />
      </PreviewSuspense>
    )
  }

  return (
    <HomePage
      page={page}
      settings={settings}
      projects={projects}
      events={events}
      design={design}
    />
  )
}

const fallbackPage: HomePagePayload = {
  title: '',
  overview: [],
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx
  const token = previewData.token

  const [settings, page = fallbackPage, projects, events, design] =
    await Promise.all([
      getSettings({ token }),
      getHomePage({ token }),
      getAllProjects({ token }),
      getAllEvents({ token }),
      getAllDesign({ token }),
    ])

  return {
    props: {
      page,
      settings,
      projects,
      events,
      design,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 42,
  }
}
