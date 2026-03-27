import { HomeIcon, ImageIcon } from '@sanity/icons'
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
      name: 'stats',
      title: 'Hero Stats',
      description: 'Up to 3 stats shown below the tagline.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'statNum', title: 'Number / Value', type: 'string' }),
            defineField({ name: 'statLabel', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'statNum', subtitle: 'statLabel' } },
        }),
      ],
    }),
    defineField({
      name: 'capabilities',
      title: 'Hero Capabilities (right column)',
      description: 'Rows of capabilities shown on the right side of the hero.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'capability',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'tag', title: 'Tag', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'tag' } },
        }),
      ],
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
      name: 'toolGroups',
      title: 'Tools & Technical',
      description: 'Tool groups shown in the Tools & Technical section.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'toolGroup',
          fields: [
            defineField({ name: 'heading', title: 'Heading', type: 'string' }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            }),
          ],
          preview: { select: { title: 'heading' } },
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
    defineField({
      name: 'aboutFacts',
      title: 'About Facts',
      description: 'Label/value pairs shown in the right column of the About section.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'aboutFact',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      description: 'Links shown in the site footer.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'URL', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        }),
      ],
    }),
    defineField({
      type: 'array',
      name: 'body',
      title: 'Body (Legacy)',
      description: 'Legacy body field. Not shown in new design.',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              { name: 'link', type: 'object', title: 'Link', fields: [{ name: 'href', type: 'url', title: 'Url' }] },
            ],
          },
          styles: [],
        }),
        defineArrayMember({ name: 'youtube', type: 'youtube' }),
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: { hotspot: true },
          preview: { select: { imageUrl: 'asset.url', title: 'caption' } },
          fields: [
            defineField({ title: 'Caption', name: 'caption', type: 'string' }),
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
          ],
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
