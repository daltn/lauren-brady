import { ProjectListItem } from 'components/pages/home/ProjectListItem'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
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
  const {
    overview,
    showcaseProjects,
    title = 'Lauren Brady',
    body,
  } = page ?? {}

  console.log({ body })

  return (
    <>
      <Head>
        <HomePageHead page={page} settings={settings} />
      </Head>

      <Layout settings={settings} preview={preview}>
        <div className="space-y-20">
          {/* Header */}
          {title && <Header centered title={title} description={overview} />}
          {body && (
            <CustomPortableText
              paragraphClasses="font-serif max-w-3xl text-gray-600 text-xl"
              value={body}
            />
          )}
          {/* Showcase projects */}
          {showcaseProjects && showcaseProjects.length > 0 && (
            <div className="mx-auto max-w-[100rem] rounded-md border">
              {showcaseProjects.map((project, key) => {
                const href = resolveHref(project._type, project.slug)
                if (!href) {
                  return null
                }
                return (
                  <Link key={key} href={href}>
                    <ProjectListItem project={project} odd={key % 2} />
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
