import { CustomPortableText } from 'components/shared/CustomPortableText'

interface HeaderProps {
  centered?: boolean
  description?: any[]
  title?: string
}
export function Header(props: HeaderProps) {
  const { title, description, centered = false } = props
  if (!description && !title) {
    return null
  }
  return (
    <div className={`${centered ? 'text-center' : 'w-5/6 lg:w-3/5'}`}>
      {/* Title */}
      {title && (
        <div className="mb-4 text-4xl font-extrabold tracking-normal md:text-5xl">
          {title}
        </div>
      )}
    </div>
  )
}
