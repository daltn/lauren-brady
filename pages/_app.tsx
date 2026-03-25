import 'styles/index.css'

import { DM_Sans, IBM_Plex_Mono } from '@next/font/google'
import { AppProps } from 'next/app'

const mono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['500', '700'],
})

const sans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-mono: ${mono.style.fontFamily};
            --font-sans: ${sans.style.fontFamily};
            --font-serif: Helvetica, Arial, sans-serif;
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  )
}
