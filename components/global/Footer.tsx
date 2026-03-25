import type { FooterLink } from 'types'
import type { PortableTextBlock } from 'sanity'

interface FooterProps {
  footer?: PortableTextBlock[]
  footerLinks?: FooterLink[]
  siteName?: string
}

export function Footer({ footerLinks, siteName = 'Lauren Brady' }: FooterProps) {
  return (
    <footer style={{
      padding: '48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'var(--site-bg)',
      flexWrap: 'wrap',
      gap: '24px',
    }}>
      <span style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '20px',
        fontWeight: 400,
        color: 'var(--site-ink)',
      }}>
        {siteName}
      </span>
      {footerLinks && footerLinks.length > 0 && (
        <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap' }}>
          {footerLinks.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.href}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '13px',
                  color: 'var(--site-muted)',
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </footer>
  )
}
