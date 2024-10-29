import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import type Project from 'playground-ed/models/project';

export default class ApplicationController extends Controller {
  @service store;
  @tracked projects: Project[] = [];
  @tracked loadedProjects: Project[] = [];

  constructor() {
    super(...arguments);
    window.store = this.store;
    window.controller = this;
    this.store.findAll('projects').then((projects) => {
      this.loadedProjects = projects;
      window.loadedProjects = projects;
    });
  }

  increment = (doc: { unit: number }) => {
    doc.unit = (doc.unit || 0) + 1;
  };

  createProject = () => {
    const r = this.store._register_random_schema({
      unit: Math.floor(Math.random() * 100),
    });

    const project = this.store.createRecord('projects', {
      name: 'New Project',
      description: 'New Project Description',
      document: r,
    });

    this.projects = [...this.projects, project];
  };
}
