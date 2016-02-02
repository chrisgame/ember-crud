export default function() {

  this.get('/organizations', function(db, request) {
    return {
      data: db.organizations.map(attrs => ({
        type: 'organizations',
        id: attrs.id,
        attributes: attrs
      }))
    };
  }),

  this.get('/organizations/:id', function(db, request) {
    const id = request.params.id;
    return {
      data: {
        type: 'organizations',
        id: id,
        attributes: db.organizations.find(id)
      }
    };
  })
}
