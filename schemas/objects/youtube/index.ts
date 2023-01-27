import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube',
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Video Title',
    }),
  ],
})
