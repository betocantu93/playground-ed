import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { findRecord } from '@ember-data/json-api/request';

export default class ProjectsShowRoute extends Route {
  @service store;

  async model(params) {
    const { content } = await this.store.request(findRecord('project', 1));

    return content;
  }
}
