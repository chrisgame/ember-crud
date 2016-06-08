export default function() {

  this.get('/organizations', function(db) {
    return {
      data: db.organizations.map(attrs => ({
        type: 'organization',
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
  });


  this.patch('/organizations/:id', function(db, request) {
    let requestBody = JSON.parse(request.requestBody);
    console.log('request body: ', requestBody);

    let includedUsers = [];
    requestBody.data.repositories.forEach(repository => {
      includedUsers.push(...repository.data.users.map(user => ({
        type: 'user',
        id: user.data.id,
        attributes: user.data.attributes,
        links: {
          self: `http://something.com/user/${user.data.id}`
        }
      })));
    });

    return {
      data: {
        type: 'organization',
        id: requestBody.data.id,
        attributes: requestBody.data.attributes,
        links: {
          self: `http://something.com/organizations/${requestBody.data.id}`
        },
        relationships: {
          repositories: {
            links: {
              self: `http://something.com/organizations/${requestBody.data.id}/relationships/repositories`,
              related: `http://something.com/organizations/${requestBody.data.id}/repositories`
            },
            data: db.repositories.where({ organization: requestBody.data.id }).map(repo => ({
              type: 'repository',
              id: repo.id
            })),
          },
          users: {
            links: {
              self: `http://something.com/organizations/${requestBody.data.id}/relationships/users`,
              related: `http://something.com/organizations/${requestBody.data.id}/repositories/${requestBody.data.id}/users`
            },
            data: db.users.where({ repository: requestBody.data.id }).map(user => ({
              type: 'user',
              id: user.id
            }))
          }
        }
      },
      included: [
        ...requestBody.data.repositories.map(repository => ({
          type: 'repository',
          id: repository.data.id,
          attributes: repository.data.attributes,
          links: {
            self: `http://something.com/repositories/${repository.data.id}`
          },
          relationships: {
            organizations: {
              links: {
                self: `http://something.com/organizations/${repository.data.id}/relationships/repositories`,
                related: `http://something.com/organizations/${repository.data.id}/repositories`
              },
              data: db.organizations.where({ organization: requestBody.data.id }).map(org => ({
                type: 'organization',
                id: org.id
              })),
            },
            users: {
              links: {
                self: `http://something.com/users/${repository.data.id}`,
                related: `http://something.com/organizations/${requestBody.data.id}/repositories/${repository.data.id}/users`
              },
              data: db.users.where({ repository: repository.data.id }).map(user => ({
                type: 'user',
                id: user.id
              }))
            }
          }
        })),
        ...includedUsers
      ]
    };
  });
}
