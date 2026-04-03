import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    title,
    eyebrow,
    tagline,
    navLinks,
    experienceEntries,
    approachBlocks,
    clientLogos[]{
      _key,
      logo,
      name,
      url,
    },
    aboutImage,
    aboutBio,
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const homeNavLinksQuery = groq`
  *[_type == "home"][0].navLinks
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    pageImage,
    title,
    showcaseProjects[]->{
      _type,
      category,
      coverImage,
      client,
      role,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    category,
    client,
    role,
    coverImage,
    description,
    video,
    overview,
    "slug": slug.current,
    tags,
    title,
  }
`

export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _type,
    category,
    coverImage,
    client,
    role,
    overview,
    "slug": slug.current,
    tags,
    title,
    url,
  }
`

export const allEventsQuery = groq`
  *[_type == "event"] | order(order asc, _createdAt desc) {
    _type,
    coverImage,
    overview,
    "slug": slug.current,
    title,
    url,
  }
`

export const allDesignQuery = groq`
  *[_type == "design"] | order(order asc, _createdAt desc) {
    _type,
    coverImage,
    overview,
    "slug": slug.current,
    title,
    url,
  }
`

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    overview,
    coverImage,
    description,
    images[]{
      _key,
      asset,
      alt,
      caption,
    },
  }
`

export const designBySlugQuery = groq`
  *[_type == "design" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    overview,
    coverImage,
    body,
  }
`

export const eventPaths = groq`
  *[_type == "event" && slug.current != null].slug.current
`

export const designPaths = groq`
  *[_type == "design" && slug.current != null].slug.current
`

export const pagePaths = groq`
  *[_type == "page" && slug.current != null].slug.current
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
