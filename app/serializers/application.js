// app/serializers/application.js
// import { underscore } from '@ember/string';
// import { singularize } from 'ember-inflector';
//eslint-disable-next-line
import DS from 'ember-data';
import { pluralize } from 'ember-inflector';

//eslint-disable-next-line
export default DS.JSONAPISerializer.extend({
  modelNameFromPayloadKey: function (key) {
    return key;
  },

  payloadKeyFromModelName: function (modelname) {
    return pluralize(modelname);
  },
});
