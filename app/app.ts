import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'playground-ed/config/environment';
import { setBuildURLConfig } from '@ember-data/request-utils';

setBuildURLConfig({
  host: 'http://localhost:3000',
});

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
