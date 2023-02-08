import * as demo from 'lib/demo.data'
import { urlForImage } from 'lib/sanity.image'
import type { Image } from 'sanity'

/**
 * All the shared stuff that goes into <head> on `(personal)` routes, can be be imported by `head.tsx` files in the /app dir or wrapped in a <Head> component in the /pages dir.
 */
export function SiteMeta({
  baseTitle,
  description,
  image,
  title,
}: {
  baseTitle?: string
  description?: string
  image?: Image
  title?: string
}) {
  const metaTitle = [
    ...(title ? [title] : []),
    ...(baseTitle ? [baseTitle] : []),
  ].join(' | ')

  const imageUrl =
    image && urlForImage(image)?.width(1200).height(627).fit('crop').url()

  return (
    <>
      <title>{metaTitle || demo.title}</title>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link
        rel="icon"
        type="image/png"
        sizes="64x64"
        href="/favicon/clapboard.png"
      />
      <meta name="theme-color" content="#000" />
      {description && (
        <meta key="description" name="description" content={description} />
      )}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
    </>
  )
}
