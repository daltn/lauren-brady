import { CustomPortableText } from 'components/shared/CustomPortableText'
import ScrollUp from 'components/shared/ScrollUp'
import Head from 'next/head'
import { urlForImage } from 'lib/sanity.image'
import type { EventItemPayload, SettingsPayload } from 'types'
import Layout from '../../shared/Layout'

export interface EventItemPageProps {
  event: EventItemPayload | undefined
  settings: SettingsPayload | undefined
  navLinks?: import('types').NavLink[]
  preview?: boolean
}

export function EventItemPage({ event, settings, navLinks, preview }: EventItemPageProps) {
  const { title, description, images } = event || {}

  return (
    <>
      <Head>
        <title>{title ? `${title} — Lauren Brady` : 'Lauren Brady'}</title>
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
              marginBottom: '24px',
              lineHeight: 1.1,
            }}>
              {title}
            </h1>
          )}

          {description && description.length > 0 && (
            <div style={{ marginBottom: '48px', fontSize: '15px', lineHeight: 1.7, color: 'var(--site-ink)' }}>
              <CustomPortableText paragraphClasses="font-sans" value={description} />
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
