import { resolveHref } from 'lib/sanity.links'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MenuItem } from 'types'
interface NavbarProps {
  menuItems?: MenuItem[]
}

export function Navbar({ menuItems }: NavbarProps) {
  const router = useRouter()
  const slug = router?.query?.slug

  return (
    <div className="relative sticky top-0 z-10 flex flex-wrap items-center justify-items-end gap-x-5 bg-white/80 py-[30px] px-4 backdrop-blur  md:px-16 lg:px-32">
      {menuItems &&
        menuItems.map((menuItem, idx) => {
          const href = resolveHref(menuItem?._type, menuItem?.slug)
          if (!href) {
            return null
          }
          return (
            <div key={idx} className={`${idx === 1 ? 'ml-auto' : ''}`}>
              <Link
                className={`text-lg hover:text-black md:text-xl ${
                  menuItem?._type === 'home'
                    ? 'font-extrabold text-black'
                    : 'text-gray-700'
                } ${menuItem?.slug === slug && 'underline underline-offset-2'}`}
                href={href}
              >
                {menuItem.title}
              </Link>
              {idx === 0 && (
                <div className="absolute top-[55px] text-lg text-gray-700">
                  Director
                </div>
              )}
            </div>
          )
        })}
    </div>
  )
}
