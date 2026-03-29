const links = [
  { label: 'Email', href: 'mailto:lauren@lauren-brady.com' },
  { label: 'LinkedIn', href: '#' },
]

export function Footer() {
  return (
    <footer style={{
      padding: '48px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      background: 'var(--site-bg)',
      flexWrap: 'wrap',
      gap: '24px',
    }}>
      <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', margin: 0, padding: 0, flexWrap: 'wrap' }}>
        {links.map((link, idx) => (
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
    </footer>
  )
}
