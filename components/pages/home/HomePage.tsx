import { urlForImage } from 'lib/sanity.image'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import type { HomePagePayload, SettingsPayload } from 'types'
import { Navbar } from 'components/global/Navbar'
import { Footer } from 'components/global/Footer'
import HomePageHead from './HomePageHead'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ScrollUp from 'components/shared/ScrollUp'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  preview?: boolean
}

export function HomePage({ page, settings, preview }: HomePageProps) {
  const {
    title = 'Lauren Brady',
    eyebrow,
    tagline,
    stats,
    capabilities,
    navLinks,
    experienceEntries,
    showcaseProjects,
    approachBlocks,
    toolGroups,
    aboutBio,
    aboutFacts,
    footerLinks,
  } = page ?? {}

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const siblings = el.parentElement?.querySelectorAll('.animate-on-scroll')
            const index = siblings ? Array.from(siblings).indexOf(el) : 0
            setTimeout(() => el.classList.add('is-visible'), index * 80)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const fallbackColors = ['#C8C4BC', '#B8C4C4', '#C4B8B4', '#BEC4B8', '#C4BCC4', '#C4C0B0']

  const s = {
    page: {
      background: 'var(--site-bg)',
      color: 'var(--site-ink)',
      fontFamily: 'var(--font-sans)',
      overflowX: 'hidden' as const,
    },
    section: {
      padding: '96px 48px',
      borderBottom: '1px solid var(--site-rule)',
    } as React.CSSProperties,
    sectionTitle: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'clamp(32px, 3.5vw, 48px)',
      fontWeight: 400,
      letterSpacing: '-0.02em',
      color: 'var(--site-ink)',
      margin: 0,
    } as React.CSSProperties,
  }

  // Split name for italic last name rendering
  const nameParts = title?.split(' ') ?? ['Lauren', 'Brady']
  const firstName = nameParts.slice(0, -1).join(' ')
  const lastName = nameParts[nameParts.length - 1]

  return (
    <>
      <Head>
        <HomePageHead page={page} settings={settings} />
      </Head>

      <div style={s.page}>
        <Navbar
          menuItems={settings?.menuItems}
          navLinks={navLinks}
          siteName={title}
        />

        {/* HERO */}
        <section className="hero-section" style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 48px 80px',
          borderBottom: '1px solid var(--site-rule)',
          textAlign: 'center',
        }}>
          {eyebrow && (
            <p className="hero-eyebrow-anim" style={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--site-muted)',
              marginBottom: '24px',
            }}>
              {eyebrow}
            </p>
          )}
          <h1 className="hero-name-anim" style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(52px, 6vw, 88px)',
            lineHeight: 1.0,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: 'var(--site-ink)',
            marginBottom: '32px',
          }}>
            {title}
          </h1>
          {tagline && (
            <p className="hero-tagline-anim" style={{
              fontSize: '18px',
              fontWeight: 300,
              color: 'var(--site-muted)',
              maxWidth: '560px',
              lineHeight: 1.6,
              marginBottom: '48px',
            }}>
              {tagline}
            </p>
          )}
          <div className="hero-ctas-anim" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#work" className="btn-primary">Selected Work</a>
            <a href="#production" className="btn-secondary">Production</a>
          </div>
        </section>

        {/* SELECTED WORK */}
        {showcaseProjects && showcaseProjects.length > 0 && (
          <section id="work" className="site-section" style={s.section}>
            <h2 style={{...s.sectionTitle, marginBottom: '64px'}}>Selected Work</h2>
            <div className="work-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2px',
            }}>
              {showcaseProjects.map((project, i) => {
                const imageUrl = project.coverImage
                  ? urlForImage(project.coverImage)?.width(800).height(600).fit('crop').url()
                  : null
                const bgColor = fallbackColors[i % fallbackColors.length]
                const href = `/projects/${project.slug}`
                return (
                  <Link key={i} href={href} style={{ textDecoration: 'none' }}>
                    <div className="animate-on-scroll work-card-container" style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer' }}>
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: imageUrl ? `url(${imageUrl}) center/cover no-repeat` : bgColor,
                        transition: 'transform 0.5s ease',
                      }} />
                      <div
                        className="work-card-overlay"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'var(--site-ink)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-end',
                          padding: '28px',
                        }}
                      >
                        <p style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '22px',
                          fontWeight: 400,
                          color: 'var(--site-warm)',
                          marginBottom: '4px',
                        }}>
                          {project.title}
                        </p>
                        {(project.client || project.role) && (
                          <p style={{
                            fontSize: '12px',
                            color: 'rgba(255,255,255,0.6)',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                          }}>
                            {[project.client, project.role].filter(Boolean).join(' · ')}
                          </p>
                        )}
                        {project.tags && project.tags.length > 0 && (
                          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {project.tags.slice(0, 2).map((tag, j) => (
                              <span key={j} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)' }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* PRODUCTION EXPERIENCE */}
        {experienceEntries && experienceEntries.length > 0 && (
          <section id="production" className="site-section" style={s.section}>
            <h2 style={{...s.sectionTitle, marginBottom: '64px'}}>Production</h2>
            {experienceEntries.map((entry, i) => (
              <div key={i} className="animate-on-scroll experience-entry" style={{
                display: 'grid',
                gridTemplateColumns: '280px 1fr',
                gap: '48px',
                padding: '48px 0',
                borderTop: '1px solid var(--site-rule)',
              }}>
                <div style={{ paddingTop: '4px' }}>
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontWeight: 400,
                    color: 'var(--site-ink)',
                    marginBottom: '6px',
                    lineHeight: 1.3,
                  }}>
                    {entry.company}
                  </p>
                  <p style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--site-muted)',
                    marginBottom: '12px',
                  }}>
                    {entry.role}
                  </p>
                  {entry.tags && entry.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
                      {entry.tags.map((tag, j) => (
                        <span key={j} style={{
                          fontSize: '11px',
                          color: 'var(--site-muted)',
                          background: 'var(--site-tag)',
                          padding: '3px 8px',
                          letterSpacing: '0.05em',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  {entry.contentParagraphs?.map((para, j) => (
                    <p key={j} style={{
                      fontSize: '15px',
                      fontWeight: 300,
                      color: 'var(--site-ink)',
                      lineHeight: 1.7,
                      marginBottom: j < entry.contentParagraphs.length - 1 ? '14px' : 0,
                    }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* PRODUCTION APPROACH */}
        {approachBlocks && approachBlocks.length > 0 && (
          <section id="approach" className="site-section" style={s.section}>
            <h2 style={{...s.sectionTitle, marginBottom: '64px'}}>Production Approach</h2>
            <div className="approach-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2px',
            }}>
              {approachBlocks.map((block, i) => (
                <div key={i} className="animate-on-scroll" style={{
                  background: 'var(--site-warm)',
                  padding: '40px 36px',
                }}>
                  <p style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--site-muted)',
                    marginBottom: '20px',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: 'var(--site-ink)',
                    marginBottom: '14px',
                    lineHeight: 1.25,
                  }}>
                    {block.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'var(--site-muted)',
                    lineHeight: 1.65,
                    margin: 0,
                  }}>
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TOOLS */}
        {toolGroups && toolGroups.length > 0 && (
          <section className="site-section" style={s.section}>
            <h2 style={{...s.sectionTitle, marginBottom: '64px'}}>Tools &amp; Technical</h2>
            <div className="tools-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '48px',
            }}>
              {toolGroups.map((group, i) => (
                <div key={i}>
                  <h4 style={{
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--site-muted)',
                    marginBottom: '20px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid var(--site-rule)',
                  }}>
                    {group.heading}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {group.items?.map((item, j) => (
                      <li key={j} style={{ fontSize: '15px', fontWeight: 300, color: 'var(--site-ink)' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ABOUT */}
        <section id="about" className="site-section" style={s.section}>
          <h2 style={{...s.sectionTitle, marginBottom: '64px'}}>About</h2>
          <div className="about-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '96px',
            alignItems: 'start',
          }}>
            {aboutBio && aboutBio.length > 0 && (
              <div style={{
                fontSize: '17px',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'var(--site-ink)',
                fontFamily: 'var(--font-sans)',
              }}>
                <CustomPortableText
                  paragraphClasses=""
                  value={aboutBio}
                />
              </div>
            )}
            {aboutFacts && aboutFacts.length > 0 && (
              <div className="about-facts-col" style={{
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid var(--site-rule)',
                paddingLeft: '64px',
              }}>
                {aboutFacts.map((fact, i) => (
                  <div key={i} style={{
                    padding: '20px 0',
                    borderBottom: '1px solid var(--site-rule)',
                    borderTop: i === 0 ? '1px solid var(--site-rule)' : undefined,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--site-muted)',
                    }}>
                      {fact.label}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      color: 'var(--site-ink)',
                      textAlign: 'right',
                      maxWidth: '200px',
                    }}>
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <Footer />

        <ScrollUp />
      </div>
    </>
  )
}
