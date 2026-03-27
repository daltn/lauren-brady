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

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  client?: string
  role?: string
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

export interface HomeStat {
  _key?: string
  statNum: string
  statLabel: string
}

export interface HomeCapability {
  _key?: string
  label: string
  tag: string
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

export interface ToolGroup {
  _key?: string
  heading: string
  items: string[]
}

export interface AboutFact {
  _key?: string
  label: string
  value: string
}

export interface FooterLink {
  _key?: string
  label: string
  href: string
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
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  title?: string
  body?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  showcaseEvents?: ShowcaseEvent[]
  showcaseDesign?: ShowcaseDesign[]
  eyebrow?: string
  tagline?: string
  stats?: HomeStat[]
  capabilities?: HomeCapability[]
  navLinks?: NavLink[]
  experienceEntries?: ExperienceEntry[]
  approachBlocks?: ApproachBlock[]
  toolGroups?: ToolGroup[]
  clientLogos?: ClientLogo[]
  aboutImage?: Image & { alt?: string }
  aboutBio?: PortableTextBlock[]
  aboutFacts?: AboutFact[]
  footerLinks?: FooterLink[]
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
  client?: string
  role?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  video?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  artist?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}
