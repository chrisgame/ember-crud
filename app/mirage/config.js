export default function() {

  this.get('/organizations', function(db, request) {
    return {
      data: db.organizations.map(attrs => ({
        type: 'organizations',
        id: attrs.id,
        attributes: attrs
      }))
    };
  })
}
