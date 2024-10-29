import Model, { attr, belongsTo } from '@ember-data/model';
import type Project from './project';

export default class Reports extends Model {
  @attr name?: string;
  @attr description?: string;

  @belongsTo('projects', { async: true, inverse: null }) project: Project;
}
