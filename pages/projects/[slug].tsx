import { PreviewSuspense } from '@sanity/preview-kit'
import { ProjectPage } from 'components/pages/project/ProjectPage'
import { PreviewWrapper } from 'components/preview/PreviewWrapper'
import {
  getHomeNavLinks,
  getHomePageTitle,
  getProjectBySlug,
  getProjectPaths,
  getSettings,
} from 'lib/sanity.client'
import { resolveHref } from 'lib/sanity.links'
import { GetStaticProps } from 'next'
import { lazy } from 'react'
import { NavLink, ProjectPayload, SettingsPayload } from 'types'

const ProjectPreview = lazy(
  () => import('components/pages/project/ProjectPreview')
)

interface PageProps {
  project?: ProjectPayload
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

export default function ProjectSlugRoute(props: PageProps) {
  const { homePageTitle, navLinks, settings, project, preview, token } = props

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PreviewWrapper>
            <ProjectPage
              homePageTitle={homePageTitle}
              project={project}
              settings={settings}
              navLinks={navLinks}
              preview={preview}
            />
          </PreviewWrapper>
        }
      >
        <ProjectPreview
          token={token}
          project={project}
          settings={settings}
          homePageTitle={homePageTitle}
        />
      </PreviewSuspense>
    )
  }

  return (
    <ProjectPage
      homePageTitle={homePageTitle}
      project={project}
      settings={settings}
      navLinks={navLinks}
      preview={preview}
    />
  )
}

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx

  const token = previewData.token

  const [settings, project, homePageTitle, rawNavLinks] = await Promise.all([
    getSettings({ token }),
    getProjectBySlug({ token, slug: params.slug }),
    getHomePageTitle({ token }),
    getHomeNavLinks({ token }),
  ])

  // Prefix anchor-only hrefs with / so they navigate to the home page section
  const navLinks = rawNavLinks?.map((l) => ({
    ...l,
    href: l.href.startsWith('#') ? `/${l.href}` : l.href,
  }))

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      project,
      settings,
      homePageTitle,
      navLinks: navLinks ?? null,
      preview,
      token: previewData.token ?? null,
    },
    revalidate: 42,
  }
}

export const getStaticPaths = async () => {
  const paths = await getProjectPaths()

  return {
    paths: paths?.map((slug) => resolveHref('project', slug)) || [],
    fallback: false,
  }
}
