import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('organizations', function() {
    this.route('edit', { path: '/:id' });
  });
});

export default Router;
