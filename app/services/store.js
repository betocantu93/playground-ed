import Store from '@ember-data/store';
import { service } from '@ember/service';
import {
  instantiateRecord as legacyModelinstantiateRecord,
  teardownRecord as legacyModelTeardownRecord,
} from '@ember-data/model';
import JsonApiCache from '@ember-data/json-api';
import { DelegatingSchemaService } from '@ember-data/model/migration-support';
import { SchemaService } from '@warp-drive/schema-record/schema';
import { withDefaults } from '@warp-drive/schema-record/schema';
import {
  instantiateRecord as schemaRecordInstantiateRecord,
  teardownRecord as schemaRecordTeardownRecord,
} from '@warp-drive/schema-record/hooks';

const PokemonSchema = withDefaults({
  legacy: true,
  type: 'pokemon',
  fields: [
    {
      kind: 'field',
      name: 'description',
    },
    {
      kind: 'belongsTo',
      name: 'project',
      type: 'projects',
      options: {
        async: false,
        inverse: null,
      }
    },
  ],
});

export default class StoreService extends Store {
  @service requestManager;

  createCache(storeWrapper) {
    return new JsonApiCache(storeWrapper);
  }

  createSchemaService() {
    const schema = new SchemaService();
    schema.registerResources([PokemonSchema]);
    return new DelegatingSchemaService(this, schema);
  }

  instantiateRecord(identifier, createRecordArgs) {
    if (this.schema._preferred.hasResource(identifier)) {
      return schemaRecordInstantiateRecord.call(
        this,
        this,
        identifier,
        createRecordArgs,
      );
    }

    return legacyModelinstantiateRecord.call(
      this,
      identifier,
      createRecordArgs,
    );
  }

  teardownRecord(record) {
    if (this.schema._preferred.hasResource(record)) {
      schemaRecordTeardownRecord(record);
    } else {
      legacyModelTeardownRecord(record);
    }
  }
}