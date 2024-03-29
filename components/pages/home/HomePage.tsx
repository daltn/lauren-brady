import { ProjectListItem } from 'components/pages/page/ProjectListItem'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Head from 'next/head'
import Link from 'next/link'
import type { HomePagePayload } from 'types'
import { SettingsPayload } from 'types'

import HomePageHead from './HomePageHead'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  preview?: boolean
}

export function HomePage({ page, settings, preview }: HomePageProps) {
  const { body, showcaseProjects } = page ?? {}

  return (
    <>
      <Head>
        <HomePageHead page={page} settings={settings} />
      </Head>

      <Layout settings={settings} preview={preview}>
        <div className="space-y-10">
          {body && (
            <CustomPortableText
              paragraphClasses="font-sans max-w-3xl text-gray-700 text-xl"
              value={body}
            />
          )}
          {showcaseProjects && showcaseProjects.length > 0 && (
            <div className="mx-auto grid max-w-[100rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {showcaseProjects.map((project, key) => {
                const href = resolveHref(project._type, project.slug)
                if (!href) {
                  return null
                }
                return (
                  <Link key={key} href={href}>
                    <ProjectListItem project={project} />
                  </Link>
                )
              })}
            </div>
          )}
          {/* Workaround: scroll to top on route change */}
          <ScrollUp />
        </div>
      </Layout>
    </>
  )
}
