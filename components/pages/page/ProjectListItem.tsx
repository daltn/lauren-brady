import { CustomPortableText } from 'components/shared/CustomPortableText'
import ImageBox from 'components/shared/ImageBox'
import type { ShowcaseProject } from 'types'

interface ProjectProps {
  project: ShowcaseProject
}

export function ProjectListItem(props: ProjectProps) {
  const { project } = props

  return (
    <div
      className={`flex flex-col gap-x-5 p-2 transition hover:bg-gray-50/50 xl:flex-row`}
    >
      <div className="w-full">
        <ImageBox
          image={project.coverImage}
          alt={`Cover image from ${project.title}`}
          classesWrapper="relative aspect-[16/9]"
        />
      </div>
    </div>
  )
}
