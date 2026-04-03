import { CalendarIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
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
      name: 'coverImage',
      title: 'Cover Image',
      description: 'Shown in the events grid on the homepage.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Text shown at the top of the event page.',
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
          styles: [],
        }),
      ],
    }),
    defineField({
      name: 'images',
      title: 'Gallery Images',
      description: 'Images displayed in the multi-column grid below the description.',
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
      return { title, media, subtitle: 'Event' }
    },
  },
})
