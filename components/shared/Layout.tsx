import { Footer } from 'components/global/Footer'
import { Navbar } from 'components/global/Navbar'
import { PreviewBanner } from 'components/preview/PreviewBanner'
import { SettingsPayload } from 'types'

const fallbackSettings: SettingsPayload = {
  menuItems: [],
  footer: [],
}

export interface LayoutProps {
  children: React.ReactNode
  settings: SettingsPayload | undefined
  preview?: boolean
  fullBleed?: boolean
}

export default function Layout({
  children,
  settings = fallbackSettings,
  preview,
  fullBleed,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--site-bg)', color: 'var(--site-ink)' }}>
      {preview && <PreviewBanner />}
      <Navbar menuItems={settings?.menuItems} />
      {fullBleed ? (
        <div className="flex-grow">{children}</div>
      ) : (
        <div className="mt-20 flex-grow px-4 md:px-16 lg:px-32">{children}</div>
      )}
      <Footer footer={settings?.footer} />
    </div>
  )
}
