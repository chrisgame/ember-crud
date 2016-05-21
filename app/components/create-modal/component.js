import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    add: function(type, name, id) {
      this.sendAction('add', type, name, id);
      this.sendAction('dismiss');
    },
    cancel: function() {
      this.sendAction('dismiss');
    }
  }
});
