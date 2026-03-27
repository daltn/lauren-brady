import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    body,
    footer,
    overview,
    title,
    eyebrow,
    tagline,
    stats,
    capabilities,
    navLinks,
    experienceEntries,
    approachBlocks,
    toolGroups,
    clientLogos[]{
      _key,
      logo,
      name,
      url,
    },
    aboutImage,
    aboutBio,
    aboutFacts,
    footerLinks,
    showcaseProjects[]->{
      _type,
      coverImage,
      client,
      role,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    showcaseEvents[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      title,
    },
    showcaseDesign[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      title,
    },
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
    client,
    role,
    artist,
    coverImage,
    description,
    video,
    duration,
    overview,
    "slug": slug.current,
    starring,
    tags,
    title,
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
