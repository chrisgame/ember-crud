import DS from 'ember-data';

export default DS.Model.extend({
  repository: DS.belongsTo('repository'),
  name: DS.attr('string')
});
