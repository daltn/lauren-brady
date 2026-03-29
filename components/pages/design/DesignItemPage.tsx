import { CustomPortableText } from 'components/shared/CustomPortableText'
import ScrollUp from 'components/shared/ScrollUp'
import Head from 'next/head'
import type { DesignItemPayload, NavLink, SettingsPayload } from 'types'
import Layout from '../../shared/Layout'

export interface DesignItemPageProps {
  design: DesignItemPayload | undefined
  settings: SettingsPayload | undefined
  navLinks?: NavLink[]
  preview?: boolean
}

export function DesignItemPage({ design, settings, navLinks, preview }: DesignItemPageProps) {
  const { title, body } = design || {}

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
        <ScrollUp />
      </Layout>
    </>
  )
}
