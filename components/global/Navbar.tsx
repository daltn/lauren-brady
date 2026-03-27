import Link from 'next/link'
import { resolveHref } from 'lib/sanity.links'
import type { MenuItem, NavLink } from 'types'

interface NavbarProps {
  menuItems?: MenuItem[]
  navLinks?: NavLink[]
  siteName?: string
}

export function Navbar({
  menuItems,
  navLinks,
  siteName = 'Lauren Brady',
}: NavbarProps) {
  return (
    <nav
      className="site-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        mixBlendMode: 'multiply',
      }}
    >
      <a
        href="/"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--site-ink)',
          textDecoration: 'none',
        }}
      >
        {siteName}
      </a>
      <ul
        className="nav-links-list"
        style={{
          display: 'flex',
          gap: '32px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {navLinks && navLinks.length > 0
          ? navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '13px',
                    fontWeight: 400,
                    color: 'var(--site-muted)',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))
          : menuItems
              ?.filter((item) => item._type !== 'home')
              .map((item, idx) => {
                const href = resolveHref(item._type, item.slug)
                if (!href) return null
                return (
                  <li key={idx}>
                    <Link
                      href={href}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '13px',
                        fontWeight: 400,
                        color: 'var(--site-muted)',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
      </ul>
    </nav>
  )
}
