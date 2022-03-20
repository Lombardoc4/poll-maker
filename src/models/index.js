// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Poll } = initSchema(schema);

export {
  Poll
};