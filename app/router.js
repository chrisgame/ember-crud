import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('organizations', function() {
    this.modal('create-modal', {
      withParams: ['type', 'id'],
      actions: {
        add: "add"
      }
    });
  });
});

export default Router;
