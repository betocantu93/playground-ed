import Model, { attr } from '@ember-data/model';

export default class Projects extends Model {
  @attr name?: string;
  @attr description?: string;
}
