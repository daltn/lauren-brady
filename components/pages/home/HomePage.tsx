import { urlForImage } from 'lib/sanity.image'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import type {
  HomePagePayload,
  SettingsPayload,
  ShowcaseDesign,
  ShowcaseEvent,
  ShowcaseProject,
} from 'types'
import { Navbar } from 'components/global/Navbar'
import { Footer } from 'components/global/Footer'
import HomePageHead from './HomePageHead'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import ScrollUp from 'components/shared/ScrollUp'

export interface HomePageProps {
  settings?: SettingsPayload
  page?: HomePagePayload
  projects?: ShowcaseProject[]
  events?: ShowcaseEvent[]
  design?: ShowcaseDesign[]
  preview?: boolean
}

export function HomePage({
  page,
  settings,
  projects = [],
  events = [],
  design = [],
  preview,
}: HomePageProps) {
  const {
    title = 'Lauren Brady',
    eyebrow,
    tagline,
    navLinks,
    experienceEntries,
    approachBlocks,
    clientLogos,
    aboutImage,
    aboutBio,
  } = page ?? {}

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const siblings =
              el.parentElement?.querySelectorAll('.animate-on-scroll')
            const index = siblings ? Array.from(siblings).indexOf(el) : 0
            setTimeout(() => el.classList.add('is-visible'), index * 80)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )
    document
      .querySelectorAll('.animate-on-scroll')
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const fallbackColors = [
    '#C8C4BC',
    '#B8C4C4',
    '#C4B8B4',
    '#BEC4B8',
    '#C4BCC4',
    '#C4C0B0',
  ]

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
    subHeading: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'clamp(22px, 2.5vw, 32px)',
      fontWeight: 400,
      letterSpacing: '-0.015em',
      color: 'var(--site-ink)',
      margin: 0,
    } as React.CSSProperties,
  }

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
        <section
          className="hero-section"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '120px 48px 80px',
            borderBottom: '1px solid var(--site-rule)',
            textAlign: 'center',
          }}
        >
          {eyebrow && (
            <p
              className="hero-eyebrow-anim"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--site-muted)',
                marginBottom: '24px',
              }}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className="hero-name-anim"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(52px, 6vw, 88px)',
              lineHeight: 1.0,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: 'var(--site-ink)',
              marginBottom: '32px',
            }}
          >
            {title}
          </h1>
          {tagline && (
            <p
              className="hero-tagline-anim"
              style={{
                fontSize: '18px',
                fontWeight: 300,
                color: 'var(--site-muted)',
                maxWidth: '560px',
                lineHeight: 1.6,
                marginBottom: '48px',
              }}
            >
              {tagline}
            </p>
          )}
          <div
            className="hero-ctas-anim"
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <a href="#media" className="btn-secondary">
              Media
            </a>
            <a href="#events" className="btn-secondary">
              Events
            </a>
            <a href="#design" className="btn-secondary">
              Design
            </a>
            <a href="#about" className="btn-secondary">
              About
            </a>
          </div>
        </section>

        {/* MEDIA */}
        {projects && projects.length > 0 && (
          <section id="media" className="site-section" style={s.section}>
            <h2 style={{ ...s.sectionTitle, marginBottom: '80px' }}>Media</h2>
            {(
              [
                { key: 'branded', label: 'Branded' },
                { key: 'film-tv', label: 'Film & TV' },
                { key: 'radio', label: 'Radio' },
                { key: null, label: 'Other' },
              ] as { key: string | null; label: string }[]
            ).map(({ key, label }) => {
              const group =
                key === null
                  ? projects.filter(
                      (p) =>
                        !p.category ||
                        !['branded', 'film-tv', 'radio'].includes(p.category)
                    )
                  : projects.filter((p) => p.category === key)
              if (group.length === 0) return null
              return (
                <div key={key} style={{ marginBottom: '80px' }}>
                  <h3
                    style={{
                      ...s.subHeading,
                      marginBottom: '40px',
                      paddingBottom: '20px',
                      borderBottom: '1px solid var(--site-rule)',
                    }}
                  >
                    {label}
                  </h3>
                  <div
                    className="work-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '2px',
                    }}
                  >
                    {group.map((project, i) => {
                      const imageUrl = project.coverImage
                        ? urlForImage(project.coverImage)
                            ?.width(800)
                            .height(600)
                            .fit('crop')
                            .url()
                        : null
                      const bgColor = fallbackColors[i % fallbackColors.length]
                      const href = project.url ?? `/projects/${project.slug}`
                      const isExternal = !!project.url
                      const cardInner = (
                        <div
                          className="animate-on-scroll work-card-container"
                          style={{
                            position: 'relative',
                            aspectRatio: '4/3',
                            overflow: 'hidden',
                            cursor: 'pointer',
                          }}
                        >
                          <div
                            style={{
                              width: '100%',
                              height: '100%',
                              background: imageUrl
                                ? `url(${imageUrl}) center/cover no-repeat`
                                : bgColor,
                              transition: 'transform 0.5s ease',
                            }}
                          />
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
                            <p
                              style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '22px',
                                fontWeight: 400,
                                color: 'var(--site-warm)',
                                marginBottom: '4px',
                              }}
                            >
                              {project.title}
                            </p>
                            {(project.client || project.role) && (
                              <p
                                style={{
                                  fontSize: '12px',
                                  color: 'rgba(255,255,255,0.6)',
                                  letterSpacing: '0.06em',
                                  textTransform: 'uppercase',
                                }}
                              >
                                {[project.client, project.role]
                                  .filter(Boolean)
                                  .join(' · ')}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                      return isExternal ? (
                        <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          {cardInner}
                        </a>
                      ) : (
                        <Link key={i} href={href} style={{ textDecoration: 'none' }}>
                          {cardInner}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </section>
        )}

        {/* EVENTS */}
        {events && events.length > 0 && (
          <section id="events" className="site-section" style={s.section}>
            <h2 style={{ ...s.sectionTitle, marginBottom: '64px' }}>Events</h2>
            <div
              className="work-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2px',
              }}
            >
              {events.map((event, i) => {
                const imageUrl = event.coverImage
                  ? urlForImage(event.coverImage)
                      ?.width(800)
                      .height(800)
                      .fit('crop')
                      .url()
                  : null
                const bgColor = fallbackColors[i % fallbackColors.length]
                const href = event.url ?? `/event/${event.slug}`
                const isExternal = !!event.url
                const cardInner = (
                  <div
                    className="animate-on-scroll work-card-container"
                    style={{
                      position: 'relative',
                      aspectRatio: '1/1',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: imageUrl
                          ? `url(${imageUrl}) center/cover no-repeat`
                          : bgColor,
                        transition: 'transform 0.5s ease',
                      }}
                    />
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
                      <p
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '22px',
                          fontWeight: 400,
                          color: 'var(--site-warm)',
                        }}
                      >
                        {event.title}
                      </p>
                    </div>
                  </div>
                )
                return isExternal ? (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    {cardInner}
                  </a>
                ) : (
                  <Link key={i} href={href} style={{ textDecoration: 'none' }}>
                    {cardInner}
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* DESIGN */}
        {design && design.length > 0 && (
          <section id="design" className="site-section" style={s.section}>
            <h2 style={{ ...s.sectionTitle, marginBottom: '64px' }}>Design</h2>
            <div
              className="work-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2px',
              }}
            >
              {design.map((item, i) => {
                const imageUrl = item.coverImage
                  ? urlForImage(item.coverImage)
                      ?.width(800)
                      .height(800)
                      .fit('crop')
                      .url()
                  : null
                const bgColor = fallbackColors[i % fallbackColors.length]
                const href = item.url ?? `/design/${item.slug}`
                const isExternal = !!item.url
                const cardInner = (
                  <div
                    className="animate-on-scroll work-card-container"
                    style={{
                      position: 'relative',
                      aspectRatio: '1/1',
                      overflow: 'hidden',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: imageUrl
                          ? `url(${imageUrl}) center/cover no-repeat`
                          : bgColor,
                        transition: 'transform 0.5s ease',
                      }}
                    />
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
                      <p
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '22px',
                          fontWeight: 400,
                          color: 'var(--site-warm)',
                        }}
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                )
                return isExternal ? (
                  <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    {cardInner}
                  </a>
                ) : (
                  <Link key={i} href={href} style={{ textDecoration: 'none' }}>
                    {cardInner}
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* ABOUT */}
        <section id="about" className="site-section" style={s.section}>
          <h2 style={{ ...s.sectionTitle, marginBottom: '80px' }}>About</h2>

          {/* Approach */}
          {approachBlocks && approachBlocks.length > 0 && (
            <div style={{ marginBottom: '80px' }}>
              <h3
                style={{
                  ...s.subHeading,
                  marginBottom: '40px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--site-rule)',
                }}
              >
                Approach
              </h3>
              <div
                className="approach-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '2px',
                }}
              >
                {approachBlocks.map((block, i) => (
                  <div
                    key={i}
                    className="animate-on-scroll"
                    style={{
                      background: 'var(--site-warm)',
                      padding: '40px 36px',
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '20px',
                        fontWeight: 400,
                        color: 'var(--site-ink)',
                        marginBottom: '14px',
                        lineHeight: 1.25,
                      }}
                    >
                      {block.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '14px',
                        fontWeight: 300,
                        color: 'var(--site-muted)',
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clients */}
          {clientLogos && clientLogos.length > 0 && (
            <div style={{ marginBottom: '80px' }}>
              <h3
                style={{
                  ...s.subHeading,
                  marginBottom: '40px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--site-rule)',
                }}
              >
                Clients
              </h3>
              <div
                className="clients-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '32px',
                  alignItems: 'center',
                }}
              >
                {clientLogos.map((client, i) => {
                  const logoUrl = client.logo
                    ? urlForImage(client.logo as any)
                        ?.height(80)
                        .url()
                    : null
                  const inner = logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={client.name ?? ''}
                      style={{
                        maxHeight: '48px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        filter: 'grayscale(100%)',
                        opacity: 0.7,
                      }}
                    />
                  ) : (
                    <span
                      style={{ fontSize: '13px', color: 'var(--site-muted)' }}
                    >
                      {client.name}
                    </span>
                  )
                  return (
                    <div
                      key={i}
                      className="animate-on-scroll"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {client.url ? (
                        <a
                          href={client.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* CV */}
          {experienceEntries && experienceEntries.length > 0 && (
            <div style={{ marginBottom: '80px' }}>
              <h3
                style={{
                  ...s.subHeading,
                  marginBottom: '40px',
                }}
              >
                CV
              </h3>
              {experienceEntries.map((entry, i) => (
                <div
                  key={i}
                  className="animate-on-scroll experience-entry"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '280px 1fr',
                    gap: '48px',
                    padding: '48px 0',
                    borderTop: '1px solid var(--site-rule)',
                  }}
                >
                  <div style={{ paddingTop: '4px' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '20px',
                        fontWeight: 400,
                        color: 'var(--site-ink)',
                        marginBottom: '6px',
                        lineHeight: 1.3,
                      }}
                    >
                      {entry.company}
                    </p>
                    <p
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--site-muted)',
                        marginBottom: '12px',
                      }}
                    >
                      {entry.role}
                    </p>
                    {entry.tags && entry.tags.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '6px',
                          marginTop: '16px',
                        }}
                      >
                        {entry.tags.map((tag, j) => (
                          <span
                            key={j}
                            style={{
                              fontSize: '11px',
                              color: 'var(--site-muted)',
                              background: 'var(--site-tag)',
                              padding: '3px 8px',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    {entry.contentParagraphs?.map((para, j) => (
                      <p
                        key={j}
                        style={{
                          fontSize: '15px',
                          fontWeight: 300,
                          color: 'var(--site-ink)',
                          lineHeight: 1.7,
                          marginBottom:
                            j < entry.contentParagraphs.length - 1 ? '14px' : 0,
                        }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bio + Image */}
          {(aboutBio || aboutImage) && (
            <div style={{ marginBottom: '80px' }}>
              <h3
                style={{
                  ...s.subHeading,
                  marginBottom: '40px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid var(--site-rule)',
                }}
              >
                Bio
              </h3>
              <div
                className="about-bio-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: aboutImage ? '500px auto' : '1fr',
                  gap: '64px',
                  alignItems: 'start',
                }}
              >
                {aboutBio && aboutBio.length > 0 && (
                  <div
                    style={{
                      fontSize: '17px',
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: 'var(--site-ink)',
                      fontFamily: 'var(--font-sans)',
                      maxWidth: '500px',
                    }}
                  >
                    <CustomPortableText paragraphClasses="" value={aboutBio} />
                  </div>
                )}
                {aboutImage && (
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden', width: '100%', maxWidth: '400px' }}>
                    {(() => {
                      const imgUrl = urlForImage(aboutImage as any)
                        ?.width(800)
                        .height(800)
                        .fit('crop')
                        .url()
                      return imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={(aboutImage as any).alt ?? 'Lauren Brady'}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      ) : null
                    })()}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contact */}
          <div>
            <h3
              style={{
                ...s.subHeading,
                marginBottom: '40px',
                paddingBottom: '20px',
                borderBottom: '1px solid var(--site-rule)',
              }}
            >
              Contact
            </h3>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <a
                href="mailto:lauren.rachel.brady@gmail.com"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(18px, 2vw, 26px)',
                  fontWeight: 400,
                  color: 'var(--site-ink)',
                  textDecoration: 'none',
                  letterSpacing: '-0.01em',
                }}
              >
                lauren.rachel.brady@gmail.com
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <Footer />

        <ScrollUp />
      </div>
    </>
  )
}
