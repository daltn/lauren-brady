import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'design',
  title: 'Design',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'External Link (optional)',
      description: 'If set, the grid card links to this URL instead of the internal page.',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      description: 'Lower numbers appear first in the grid. Leave blank to sort by date.',
      type: 'number',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      title: 'SEO Description',
      description: 'Used for search engine results. Not shown on page.',
      type: 'array',
      of: [
        defineArrayMember({
          lists: [],
          marks: { decorators: [{ title: 'Italic', value: 'em' }] },
          styles: [],
          type: 'block',
        }),
      ],
      validation: (rule) => rule.max(155),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'Shown in the design grid on the homepage.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: 'Rich text content with images interspersed.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
            decorators: [
              { title: 'Italic', value: 'em' },
              { title: 'Strong', value: 'strong' },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      description: 'Images displayed in the multi-column grid below the body.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          icon: ImageIcon,
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage' },
    prepare({ title, media }) {
      return { title, media, subtitle: 'Design' }
    },
  },
})
