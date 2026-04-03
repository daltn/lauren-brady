import { CustomPortableText } from 'components/shared/CustomPortableText'
import ScrollUp from 'components/shared/ScrollUp'
import Head from 'next/head'
import { urlForImage } from 'lib/sanity.image'
import { SiteMeta } from 'components/global/SiteMeta'
import { JsonLd, designSchema } from 'components/global/JsonLd'
import type { DesignItemPayload, NavLink, SettingsPayload } from 'types'
import Layout from '../../shared/Layout'

export interface DesignItemPageProps {
  design: DesignItemPayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle?: string
  navLinks?: NavLink[]
  preview?: boolean
}

export function DesignItemPage({ design, settings, homePageTitle, navLinks, preview }: DesignItemPageProps) {
  const { title, body, images, coverImage, slug } = design || {}

  const imageUrl = coverImage
    ? urlForImage(coverImage)?.width(1200).height(627).fit('crop').url() ?? null
    : null

  return (
    <>
      <Head>
        <SiteMeta
          baseTitle={homePageTitle}
          title={title}
          image={coverImage}
        />
        <JsonLd
          schema={designSchema({
            title,
            slug,
            imageUrl,
            creatorName: homePageTitle,
          })}
        />
      </Head>

      <Layout settings={settings} navLinks={navLinks} preview={preview}>
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px', paddingBottom: '80px' }}>

          {title && (
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--site-ink)',
              marginBottom: '40px',
              lineHeight: 1.1,
            }}>
              {title}
            </h1>
          )}

          {body && body.length > 0 && (
            <div style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--site-ink)' }}>
              <CustomPortableText paragraphClasses="font-sans" value={body} />
            </div>
          )}

        </div>

        {/* Full-width image grid */}
        {images && images.length > 0 && (
          <div className="event-image-grid" style={{ paddingBottom: '80px' }}>
            {images.map((img, i) => {
              const url = img.asset
                ? urlForImage({ asset: img.asset } as any)?.width(1200).url()
                : null
              return url ? (
                <div key={img._key ?? i} style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                  <img
                    src={url}
                    alt={img.alt ?? ''}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ) : null
            })}
          </div>
        )}

        <ScrollUp />
      </Layout>
    </>
  )
}
