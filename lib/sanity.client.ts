import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import {
  designBySlugQuery,
  designPaths,
  eventBySlugQuery,
  eventPaths,
  homeNavLinksQuery,
  homePageQuery,
  homePageTitleQuery,
  pagePaths,
  pagesBySlugQuery,
  projectBySlugQuery,
  projectPaths,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient } from 'next-sanity'
import type {
  DesignItemPayload,
  EventItemPayload,
  HomePagePayload,
  NavLink,
  PagePayload,
  ProjectPayload,
  SettingsPayload,
} from 'types'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const sanityClient = (token?: string) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token })
    : null
}

export async function getHomePage({
  token,
}: {
  token?: string
}): Promise<HomePagePayload | undefined> {
  return await sanityClient(token)?.fetch(homePageQuery)
}

export async function getHomePageTitle({
  token,
}: {
  token?: string
}): Promise<string | undefined> {
  return await sanityClient(token)?.fetch(homePageTitleQuery)
}

export async function getHomeNavLinks({
  token,
}: {
  token?: string
}): Promise<NavLink[] | undefined> {
  return await sanityClient(token)?.fetch(homeNavLinksQuery)
}

export async function getPageBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<PagePayload | undefined> {
  return await sanityClient(token)?.fetch(pagesBySlugQuery, { slug })
}

export async function getProjectBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<ProjectPayload | undefined> {
  return await sanityClient(token)?.fetch(projectBySlugQuery, { slug })
}

export async function getSettings({
  token,
}: {
  token?: string
}): Promise<SettingsPayload | undefined> {
  return await sanityClient(token)?.fetch(settingsQuery)
}

export async function getEventBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<EventItemPayload | undefined> {
  return await sanityClient(token)?.fetch(eventBySlugQuery, { slug })
}

export async function getDesignBySlug({
  slug,
  token,
}: {
  slug: string
  token?: string
}): Promise<DesignItemPayload | undefined> {
  return await sanityClient(token)?.fetch(designBySlugQuery, { slug })
}

export async function getProjectPaths(): Promise<string[]> {
  return await sanityClient()?.fetch(projectPaths)
}

export async function getEventPaths(): Promise<string[]> {
  return await sanityClient()?.fetch(eventPaths)
}

export async function getDesignPaths(): Promise<string[]> {
  return await sanityClient()?.fetch(designPaths)
}

export async function getPagePaths(): Promise<string[]> {
  return await sanityClient()?.fetch(pagePaths)
}
