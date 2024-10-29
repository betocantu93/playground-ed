import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type Project from 'playground-ed/models/project';

export default class ApplicationController extends Controller {
  @service store;
  @tracked projects: Project[] = [];

  constructor() {
    super(...arguments);
    window.store = this.store;
  }

  createProject = () => {
    const pokemon = this.store.createRecord('pokemon', {
      firstName: 'New Pokemon',
      description: 'New Pokemon Description',
    });

    const project = this.store.createRecord('projects', {
      name: 'New Project',
      description: 'New Project Description',
      pokemon,
    });

    this.projects = [...this.projects, project];
  };
}
