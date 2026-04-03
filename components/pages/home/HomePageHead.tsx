import { toPlainText } from '@portabletext/react'
import { SiteMeta } from 'components/global/SiteMeta'
import { JsonLd, personSchema } from 'components/global/JsonLd'
import { HomePagePayload, SettingsPayload } from 'types'

export interface HomePageHeadProps {
  settings?: SettingsPayload
  page?: HomePagePayload
}

export default function HomePageHead({ settings, page }: HomePageHeadProps) {
  const description = page?.overview ? toPlainText(page.overview) : undefined

  return (
    <>
      <SiteMeta
        description={description}
        image={settings?.ogImage}
        title={page?.title}
      />
      <JsonLd
        schema={personSchema({
          name: page?.title,
          jobTitle: page?.eyebrow,
          description,
        })}
      />
    </>
  )
}
