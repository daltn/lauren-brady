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
