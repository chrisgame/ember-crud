import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: 'type',
  store: Ember.inject.service('store'),

  type: null,

  actions: {
    addOrganization() {
      this.get('store').createRecord('organization');
    },
    addRepository(id) {
      let repo = this.get('store').peekRecord('repository', id);
      repo.get('organization.repositories').pushObject(this.get('store').createRecord('repository'));
    },
    addUser(id) {
      let user = this.get('store').peekRecord('user', id);
      user.get('repository.users').pushObject(this.get('store').createRecord('user'));
    }
  }
});
