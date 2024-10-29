import {
  discoverEmberDataModels,
  // applyEmberDataSerializers,
} from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    // Remove discoverEmberDataModels if you do not want ember-cli-mirage to auto discover the ember models
    models: {
      ...discoverEmberDataModels(config.store),
      ...config.models,
    },
    // uncomment to opt into ember-cli-mirage to auto discover ember serializers
    // serializers: applyEmberDataSerializers(config.serializers),
    routes,
  };

  return createServer(finalConfig);
}

function routes() {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'http://localhost:3000'; // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '';

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://miragejs.com/docs/getting-started/overview/
  */

  // this.resource('projects');

  this.get('/projects', function (schema, req) {
    const projects = schema.db.projects;
    const payload = {
      data: projects.map((project) => {
        const { id, ...rest } = this.serialize(project);
        return {
          id,
          type: 'projects',
          attributes: rest,
        };
      }),
    };
    return payload;
  });

  this.get('/projects/:id', function (schema, req) {
    const { id, ...rest } = this.serialize(schema.db.projects.find(req.params.id));
    const payload = {
      data: {
        id,
        type: 'projects',
        attributes: rest,
      },
    };
    return payload;
  });

  this.post('/projects', function (schema, req) {
    debugger
    const { id, ...rest } = this.serialize(schema.db.projects.find(req.params.id));
    const payload = {
      data: {
        id,
        type: 'projects',
        attributes: rest,
      },
    };
    return payload;
  });

  this.post('/pokemons', function (schema, req) {
    const pokemon = schema.db.pokemons.create(JSON.parse(req.requestBody));
    console.log(pokemon);
    const { id, ...rest } = this.serialize(pokemon);
    const payload = {
      data: {
        id,
        type: 'pokemons',
        attributes: rest,
      },
    };
    return payload;
  });
}
