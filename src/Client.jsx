import { generateClient } from 'aws-amplify/data';
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

const client = generateClient();

export default client;