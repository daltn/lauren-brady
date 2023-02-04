import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import ImageBox from 'components/shared/ImageBox'
import ScrollUp from 'components/shared/ScrollUp'
import Head from 'next/head'
import type { ProjectPayload, SettingsPayload } from 'types'

import Layout from '../../shared/Layout'
import ProjectPageHead from './ProjectPageHead'

export interface ProjectPageProps {
  project: ProjectPayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  preview?: boolean
}

export function ProjectPage({
  project,
  settings,
  homePageTitle,
  preview,
}: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { client, artist, description, overview, tags, title, video } =
    project || {}

  return (
    <>
      <Head>
        <ProjectPageHead project={project} title={homePageTitle} />
      </Head>

      <Layout settings={settings} preview={preview}>
        <div>
          <div className="mb-20 space-y-3">
            <Header title={title} description={overview} />
            <section className="flex flex-col text-gray-700 md:flex-row">
              <div className="w-full md:mr-6 md:w-3/5 md:pt-3">
                <div className="text-md mb-[1px]">
                  <strong className="text-md">Type: </strong>
                  {tags?.map((tag, idx) => (
                    <span key={idx} className="">
                      {idx !== 0 && ', '}
                      {tag}
                    </span>
                  ))}
                </div>

                {client && (
                  <p className="text-md">
                    <strong className="text-md">Client:</strong> {client}
                  </p>
                )}

                {artist && (
                  <p className="text-md">
                    <strong className="text-md">Artist: </strong> {artist}
                  </p>
                )}

                {description && (
                  <CustomPortableText
                    paragraphClasses="font-sans text-md text-gray-700"
                    value={description}
                  />
                )}
              </div>
              <div className="w-full md:w-1/2">
                {video && (
                  <CustomPortableText
                    paragraphClasses="font-sans text-md text-gray-700"
                    value={video}
                  />
                )}
              </div>
            </section>
            {/* Workaround: scroll to top on route change */}
            <ScrollUp />
          </div>
          <div className="absolute left-0 w-screen border-t" />
        </div>
      </Layout>
    </>
  )
}
