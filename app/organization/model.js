import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  repositories: DS.hasMany('repository')
});
