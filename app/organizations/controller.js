import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['type', 'id'],
  store: Ember.inject.service('store'),

  type: null,

  actions: {
    add(type, name, id) {
      switch(type) {
        case 'organization':
          this.get('store').createRecord('organization', { name: name });
          break;
        case 'repository':
          let repo = this.get('store').peekRecord('repository', id);
          repo.get('organization.repositories').pushObject(this.get('store').createRecord('repository', { name: name }));
          break;
        case 'user':
          let user = this.get('store').peekRecord('user', id);
          user.get('repository.users').pushObject(this.get('store').createRecord('user', { name: name }));
          break;
      }
    }
  }
});
