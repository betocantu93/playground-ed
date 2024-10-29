import Store from 'ember-data/store';
import { service } from '@ember/service';
import {
  instantiateRecord as legacyModelinstantiateRecord,
  teardownRecord as legacyModelTeardownRecord,
} from '@ember-data/model';
import JsonApiCache from '@ember-data/json-api';
import {
  DelegatingSchemaService,
  registerDerivations,
  withDefaults as withLegacy,
} from '@ember-data/model/migration-support';
import { SchemaService } from '@warp-drive/schema-record/schema';
import {
  instantiateRecord as schemaRecordInstantiateRecord,
  teardownRecord as schemaRecordTeardownRecord,
} from '@warp-drive/schema-record/hooks';

import { faker } from '@faker-js/faker';

const DocumentableSchema = withLegacy({
  type: 'documentable',
  fields: [
    {
      kind: 'belongsTo',
      name: 'project',
      type: 'projects',
      options: {
        async: false,
        inverse: 'document',
      },
    },
  ],
});

export default class StoreService extends Store {
  @service requestManager;

  _register_random_schema(data: any) {
    let { name } = faker.science.chemicalElement();

    name = `${name.toLowerCase()}-report`;

    this.schema.registerResources([
      withLegacy({
        type: name,
        fields: [
          {
            kind: 'attribute',
            name: 'unit',
          },
          {
            kind: 'belongsTo',
            name: 'project',
            type: 'projects',
            options: {
              async: false,
              inverse: 'document',
              as: 'documentable',
              polymorphic: true,
            },
          },
        ],
      }),
    ]);

    return this.createRecord(name, data || {});
  }

  createCache(storeWrapper) {
    return new JsonApiCache(storeWrapper);
  }

  createSchemaService() {
    const schema = new SchemaService();
    registerDerivations(schema);
    schema.registerResources([DocumentableSchema]);
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
