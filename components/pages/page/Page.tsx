import { CustomPortableText } from 'components/shared/CustomPortableText'
import { Header } from 'components/shared/Header'
import ImageBox from 'components/shared/ImageBox'
import Layout from 'components/shared/Layout'
import ScrollUp from 'components/shared/ScrollUp'
import Head from 'next/head'
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
  const { body, overview, title, pageImage } = page || {}
  return (
    <>
      <Head>
        <PageHead page={page} settings={settings} title={homePageTitle} />
      </Head>

      <Layout settings={settings} preview={preview}>
        <div>
          <div className="mb-14">
            <Header title={title} description={overview} />
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
              <div className="mt-5 lg:mt-0 lg:ml-4">
                {body && (
                  <CustomPortableText
                    paragraphClasses="font-sans max-w-3xl text-gray-700 text-md"
                    value={body}
                  />
                )}
              </div>
            </div>

            {/* Workaround: scroll to top on route change */}
            <ScrollUp />
          </div>
          <div className="absolute left-0 w-screen border-t" />
        </div>
      </Layout>
    </>
  )
}
