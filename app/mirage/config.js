export default function() {

  this.get('/organizations', function(db) {
    return {
      data: db.organizations.map(attrs => ({
        type: 'organizations',
        id: attrs.id,
        attributes: attrs,
        links: {
          self: `http://something.com/organizations/${attrs.id}`
        },
        relationships: {
          repositories: {
            links: {
              self: `http://something.com/organizations/${attrs.id}/relationships/repositories`,
              related: `http://something.com/organizations/${attrs.id}/repositories`
            },
            data: db.repositories.where({ organization: attrs.id }).map(repo => ({
              type: 'repository',
              id: repo.id
            })),
          },
          users: {
            links: {
              self: `http://something.com/organizations/${attrs.id}/relationships/users`,
              related: `http://something.com/organizations/${attrs.id}/repositories/${attrs.id}/users`
            },
            data: db.users.where({ repository: attrs.id }).map(user => ({
              type: 'user',
              id: user.id
            }))
          }
        }
      })),
      included: [
        ...db.repositories.map(attrs => ({
          type: 'repository',
          id: attrs.id,
          attributes: attrs,
          links: {
            self: `http://something.com/repositories/${attrs.id}`
          },
          relationships: {
            repositories: {
              links: {
                self: `http://something.com/organizations/${attrs.id}/relationships/repositories`,
                related: `http://something.com/organizations/${attrs.id}/repositories`
              },
              data: db.repositories.where({ organization: attrs.id }).map(repo => ({
                type: 'repository',
                id: repo.id
              })),
            },
            users: {
              links: {
                self: `http://something.com/users/${attrs.id}`,
                related: `http://something.com/organizations/${attrs.id}/repositories/${attrs.id}/users`
              },
              data: db.users.where({ repository: attrs.id }).map(user => ({
                type: 'user',
                id: user.id
              }))
            }
          }
        })),
        ...db.users.map(attrs => ({
          type: 'user',
          id: attrs.id,
          attributes: attrs,
          links: {
            self: `http://something.com/user/${attrs.id}`
          }
        }))
      ]
    };
  })
}
