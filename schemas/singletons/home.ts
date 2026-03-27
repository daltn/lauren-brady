import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      description: 'Your name — shown as the large hero heading.',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      description: 'Used for search engine results (meta description). Not shown on page.',
      title: 'SEO Description',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
          marks: {
            annotations: [
              { name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'Url' }] },
            ],
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
          },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Hero Eyebrow',
      description: 'Small label above the name, e.g. "Creative Producer & Systems Designer"',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Hero Tagline',
      description: 'Brief description below the name.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      description: 'Links shown in the site navigation.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'URL or Anchor (e.g. #production)', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),
    defineField({
      name: 'experienceEntries',
      title: 'Production Experience',
      description: 'Work experience entries shown in the Production Experience section.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'experienceEntry',
          fields: [
            defineField({ name: 'company', title: 'Company / Project', type: 'string' }),
            defineField({ name: 'role', title: 'Role', type: 'string' }),
            defineField({
              name: 'tags',
              title: 'Tags',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            }),
            defineField({
              name: 'contentParagraphs',
              title: 'Content Paragraphs',
              description: 'Each item is one paragraph.',
              type: 'array',
              of: [{ type: 'text', rows: 3 }],
            }),
          ],
          preview: { select: { title: 'company', subtitle: 'role' } },
        }),
      ],
    }),
    defineField({
      name: 'showcaseProjects',
      title: 'Media — Selected Work',
      description: 'Projects shown in the Media grid.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
    defineField({
      name: 'showcaseEvents',
      title: 'Events — Featured',
      description: 'Events shown in the Events grid on the homepage.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'event' }],
        }),
      ],
    }),
    defineField({
      name: 'showcaseDesign',
      title: 'Design — Featured',
      description: 'Design items shown in the Design grid on the homepage.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'design' }],
        }),
      ],
    }),
    defineField({
      name: 'approachBlocks',
      title: 'Production Approach',
      description: 'The approach blocks shown in the Production Approach section.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'approachBlock',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    defineField({
      name: 'clientLogos',
      title: 'Clients — Logos',
      description: 'Client logos shown in the About section.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'clientLogo',
          fields: [
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({ name: 'name', title: 'Client Name', type: 'string' }),
            defineField({ name: 'url', title: 'Link URL (optional)', type: 'url' }),
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        }),
      ],
    }),
    defineField({
      name: 'aboutImage',
      title: 'About Image',
      description: 'Photo shown alongside the bio in the About section.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'aboutBio',
      title: 'About Bio',
      description: 'The bio text shown in the About section (left column).',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
          },
          styles: [],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) {
      return { subtitle: 'Home', title }
    },
  },
})
