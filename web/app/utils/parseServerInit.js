/**
 * to use Parse include this file
 * import Parse from './utils/parseServerInit';
 */

import Parse from 'parse';

const PARSE_APP_ID = process.env.PARSE_APP_ID || 'TestTaskApplTcVXkSPuZpMsSKccGIN0TLlq0hcq';

const PARSE_SERVER_URL = process.env.PARSE_SERVER_URL || '/parse';

const PARSE_SERVER_URL_DOCKER = process.env.PARSE_SERVER_URL_DOCKER || 'http://parse-server/parse';

const MASTER_KEY = process.env.MASTER_KEY || 'TestTaskAppx7WydSk6nQOTWnlNWKfJRcgB3kpvG';

Parse.serverURL = typeof window !== "undefined" ? PARSE_SERVER_URL : PARSE_SERVER_URL_DOCKER;
Parse.initialize(PARSE_APP_ID, 'jskey', MASTER_KEY);


export default Parse;
