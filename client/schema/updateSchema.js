import { introspectionQuery } from 'graphql/utilities';
import request from 'sync-request';
import path from 'path';
import fs from 'fs';

const response = request('POST', 'http://localhost:8080/graphql', {
  json: {
    query: introspectionQuery,
  },
});

const schema = response.body.toString('utf-8');

fs.writeFileSync(
  path.join(__dirname, 'schema.json'),
  schema,
);
