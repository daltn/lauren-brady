export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5f3df42a99c140eb1ac68ebd',
                  title: 'Sanity Studio',
                  name: 'lauren-brady-studio',
                  apiId: '5bda69e8-9de2-48ab-bfbf-1ddf15c8d338'
                },
                {
                  buildHookId: '5f3df42a49e7ac06db037bb1',
                  title: 'Portfolio Website',
                  name: 'lauren-brady',
                  apiId: 'c88cbd9b-54a2-41d4-881e-a95944779314'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/daltn/lauren-brady',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://lauren-brady.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
