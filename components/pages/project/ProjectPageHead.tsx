import { SiteMeta } from 'components/global/SiteMeta'
import { JsonLd, projectSchema } from 'components/global/JsonLd'
import { urlForImage } from 'lib/sanity.image'
import { ProjectPayload } from 'types'

export interface ProjectPageHeadProps {
  project: ProjectPayload | undefined
  title: string | undefined
}

export default function ProjectPageHead({ project, title }: ProjectPageHeadProps) {
  const descParts = [
    project?.role,
    project?.client ? `for ${project.client}` : null,
    project?.tags?.length ? project.tags.join(', ') : null,
  ].filter(Boolean)
  const description = descParts.length ? descParts.join(' · ') : undefined

  const imageUrl = project?.coverImage
    ? urlForImage(project.coverImage)?.width(1200).height(627).fit('crop').url() ?? null
    : null

  return (
    <>
      <SiteMeta
        baseTitle={title}
        description={description}
        image={project?.coverImage}
        title={project?.title}
      />
      <JsonLd
        schema={projectSchema({
          title: project?.title,
          slug: project?.slug,
          client: project?.client,
          role: project?.role,
          tags: project?.tags,
          imageUrl,
          creatorName: title,
        })}
      />
    </>
  )
}
