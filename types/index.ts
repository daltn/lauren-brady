import type { Image, PortableTextBlock } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface NavLink {
  _key?: string
  label: string
  href: string
}

export interface ShowcaseProject {
  _type: string
  category?: string
  coverImage?: Image
  client?: string
  role?: string
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

export interface ExperienceEntry {
  _key?: string
  company: string
  role: string
  tags: string[]
  contentParagraphs: string[]
}

export interface ApproachBlock {
  _key?: string
  title: string
  body: string
}

export interface ClientLogo {
  _key?: string
  logo?: Image
  name?: string
  url?: string
}

export interface ShowcaseEvent {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  title?: string
}

export interface ShowcaseDesign {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  title?: string
}

export interface GalleryImage {
  _key?: string
  asset?: Image['asset']
  alt?: string
  caption?: string
}

// Page payloads

export interface HomePagePayload {
  overview?: PortableTextBlock[]
  title?: string
  eyebrow?: string
  tagline?: string
  navLinks?: NavLink[]
  experienceEntries?: ExperienceEntry[]
  approachBlocks?: ApproachBlock[]
  clientLogos?: ClientLogo[]
  aboutImage?: Image & { alt?: string }
  aboutBio?: PortableTextBlock[]
}

export interface EventItemPayload {
  _id?: string
  title?: string
  slug: string
  overview?: PortableTextBlock[]
  coverImage?: Image
  description?: PortableTextBlock[]
  images?: GalleryImage[]
}

export interface DesignItemPayload {
  _id?: string
  title?: string
  slug: string
  overview?: PortableTextBlock[]
  coverImage?: Image
  body?: PortableTextBlock[]
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  pageImage?: Image
  title?: string
  slug?: string
}

export interface ProjectPayload {
  category?: string
  client?: string
  role?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  video?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}
