import { CustomPortableText } from 'components/shared/CustomPortableText'
import ScrollUp from 'components/shared/ScrollUp'
import Head from 'next/head'
import type { NavLink, ProjectPayload, SettingsPayload } from 'types'

import Layout from '../../shared/Layout'
import ProjectPageHead from './ProjectPageHead'

export interface ProjectPageProps {
  project: ProjectPayload | undefined
  settings: SettingsPayload | undefined
  homePageTitle: string | undefined
  navLinks?: NavLink[]
  preview?: boolean
}

export function ProjectPage({
  project,
  settings,
  homePageTitle,
  navLinks,
  preview,
}: ProjectPageProps) {
  const { client, description, tags, title, video } = project || {}

  return (
    <>
      <Head>
        <ProjectPageHead project={project} title={homePageTitle} />
      </Head>

      <Layout settings={settings} navLinks={navLinks} preview={preview}>
        <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px', paddingBottom: '80px' }}>

          {/* Title */}
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

          {/* Meta */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '32px' }}>
            {tags && tags.length > 0 && (
              <span style={{ fontSize: '13px', color: 'var(--site-muted)' }}>
                <strong style={{ color: 'var(--site-ink)', fontWeight: 500 }}>Type: </strong>
                {tags.join(', ')}
              </span>
            )}
            {client && (
              <span style={{ fontSize: '13px', color: 'var(--site-muted)' }}>
                <strong style={{ color: 'var(--site-ink)', fontWeight: 500 }}>Client: </strong>
                {client}
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <div style={{ margin: '15px 0', fontSize: '15px', lineHeight: 1.7, color: 'var(--site-ink)' }}>
              <CustomPortableText
                paragraphClasses="font-sans"
                value={description}
              />
            </div>
          )}

          {/* Video / images */}
          {video && (
            <div>
              <CustomPortableText
                paragraphClasses="font-sans"
                value={video}
              />
            </div>
          )}

        </div>
        <ScrollUp />
      </Layout>
    </>
  )
}
