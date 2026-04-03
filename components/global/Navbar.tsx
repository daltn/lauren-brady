'use client'

import Link from 'next/link'
import { useState } from 'react'
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
  const [open, setOpen] = useState(false)

  const links =
    navLinks && navLinks.length > 0
      ? navLinks.map((link) => ({ label: link.label, href: link.href }))
      : menuItems
          ?.filter((item) => item._type !== 'home')
          .map((item) => {
            const href = resolveHref(item._type, item.slug)
            return href ? { label: item.title, href } : null
          })
          .filter(Boolean) ?? []

  return (
    <>
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
        <Link
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
        </Link>

        {/* Desktop nav */}
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
          {links.map((link, idx) => (
            <li key={idx}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: 'var(--site-ink)',
          }}
        >
          {open ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="3" y1="3" x2="17" y2="17" />
              <line x1="17" y1="3" x2="3" y2="17" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div
          className="nav-mobile-drawer"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            background: 'var(--site-bg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(28px, 6vw, 40px)',
                fontWeight: 400,
                color: 'var(--site-ink)',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
