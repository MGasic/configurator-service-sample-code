import * as fs from 'fs';

const CLIENT_ID = 'CLIENT_ID';
const ORG_ID = 'ORG_ID';
const PRIVATE_KEY = fs.readFileSync(`${__dirname}/private_key.pem`, 'utf8');
const CLIENT_SECRET = 'CLIENT_SECRET';

export default {
	CLIENT_ID,
	ORG_ID,
	PRIVATE_KEY,
	CLIENT_SECRET
};
