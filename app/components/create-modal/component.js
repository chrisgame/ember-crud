import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    add: function() {
      this.sendAction('add');
    },
    cancel: function() {
      this.sendAction('cancel');
    }
  }
});
