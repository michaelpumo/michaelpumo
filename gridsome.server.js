// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(async({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
        Prismic {
          allArticles {
            edges {
              node {
                _meta {
                  uid
                }
              }
            }
          }
          allPages {
            edges {
              node {
                _meta {
                  uid
                }
              }
            }
          }
        }
      }
    `)

    const { allArticles, allPages } = data.Prismic

    allArticles.edges.forEach((article) => {
      createPage({
        path: `/article/${article.node._meta.uid}`,
        component: './src/templates/Article.vue',
        context: {
          uid: article.node._meta.uid
        }
      })
    })

    allPages.edges.forEach((page) => {
      createPage({
        path: `/${page.node._meta.uid}`,
        component: './src/templates/Page.vue',
        context: {
          uid: page.node._meta.uid
        }
      })
    })
  })
}
