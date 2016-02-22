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
            }))
          }
        }
      })),
    };
  }),

  this.get('/organizations/:id', function(db, request) {
    const id = request.params.id;
    return {
      data: {
        type: 'organizations',
        id: id,
        attributes: db.organizations.find(id),
        relationships: {
          repositories: {
            links: {
              self: `http://something.com/organizations/${id}/relationships/repositories`,
              related: `http://something.com/organizations/${id}/repositories`
            },
            data: db.repositories.where({ organization: id }).map(repo => ({
              type: 'repository',
              id: repo.id
            }))
          }
        }
      }
    };
  }),

  this.get('/repositories', function(db) {
    return {
      data: db.repositories.map(attrs => ({
        type: 'repositories',
        id: attrs.id,
        attributes: attrs,
        links: {
          self: `http://something.com/repositories/${attrs.id}`
        },
        relationships: {
          users: {
            links: {
              self: `http://something.com/repositories/${attrs.id}/relationships/users`,
              related: `http://something.com/repositories/${attrs.id}/users`
            },
            data: db.users.where({ repository: attrs.id }).map(user => ({
              type: 'user',
              id: user.id
            }))
          }
        }
      })),
    };
  }),

  this.get('/repositories/:id', function(db, request) {
    const id = request.params.id;
    return {
      data: {
        type: 'repositories',
        id: id,
        attributes: db.repositories.find(id),
        relationships: {
          users: {
            data: db.users.where({ repository: id }).map(user => ({
              type: 'user',
              id: user.id
            }))
          }
        }
      }
    };
  }),

  this.get('/users', function(db) {
    return {
      data: db.users.map(attrs => ({
        type: 'users',
        id: attrs.id,
        attributes: attrs,
        links: {
          self: `http://something.com/users/${attrs.id}`
        }
      })),
    };
  }),

  this.get('/users/:id', function(db, request) {
    const id = request.params.id;
    return {
      data: {
        type: 'users',
        id: id,
        attributes: db.users.find(id)
      }
    };
  })
}
