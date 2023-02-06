import { ProjectListItem } from 'components/pages/page/ProjectListItem'
import ContactForm from 'components/shared/ContactForm'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import { resolveHref } from 'lib/sanity.links'
import Head from 'next/head'
import Link from 'next/link'
import type { PagePayload, SettingsPayload } from 'types'

import PageHead from './PageHead'

export interface PageProps {
  page: PagePayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export function Page({ page, settings, homePageTitle, preview }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { body, title, pageImage, slug, showcaseProjects } = page || {}

  return (
    <>
      <Head>
        <PageHead page={page} settings={settings} title={homePageTitle} />
      </Head>

      <Layout settings={settings} preview={preview}>
        <div>
          <div className="mb-14">
            <div className="flex flex-col lg:flex-row">
              {pageImage && (
                <ImageBox
                  image={pageImage}
                  alt={`Image for ${title}`}
                  classesWrapper="relative aspect-[8/10] self-start"
                  height={1662}
                  width={1330}
                />
              )}

              {body && (
                <div className="mt-5 lg:mt-0 lg:ml-4">
                  <CustomPortableText
                    paragraphClasses="font-sans max-w-3xl text-gray-700 text-md"
                    value={body}
                  />
                </div>
              )}
            </div>
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
            {slug === 'contact' && (
              <div className="mt-5 lg:mt-0 lg:ml-4">
                <ContactForm />
              </div>
            )}
            {/* Workaround: scroll to top on route change */}
            <ScrollUp />
          </div>
          <div className="absolute left-0 w-screen border-t" />
        </div>
      </Layout>
    </>
  )
}
