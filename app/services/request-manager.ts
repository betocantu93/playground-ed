import { LegacyNetworkHandler } from '@ember-data/legacy-compat';
import type { Handler, NextFn, RequestContext } from '@ember-data/request';
import { CacheHandler } from '@ember-data/store';
import RequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';

/* eslint-disable no-console */
const TestHandler: Handler = {
  async request<T>(context: RequestContext, next: NextFn<T>) {
    console.log('TestHandler.request', context.request);
    const result = await next(Object.assign({}, context.request));
    return result;
  },
};

export default class Requests extends RequestManager {
  constructor(args?: Record<string | symbol, unknown>) {
    super(args);
    this.use([LegacyNetworkHandler, TestHandler, Fetch]);
  }
}
