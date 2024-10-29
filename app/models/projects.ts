import Model, { attr, belongsTo } from '@ember-data/model';

export default class Projects extends Model {
  @attr name?: string;
  @attr description?: string;

  @belongsTo('documentable', {
    polymorphic: true,
    async: false,
    inverse: 'project',
  })
  document: any;
}
