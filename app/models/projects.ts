import Model, { attr, belongsTo } from '@ember-data/model';

export default class Projects extends Model {
  @attr name?: string;
  @attr description?: string;

  @belongsTo('pokemon', { async: false, inverse: null }) pokemon: Pokemon;
}
