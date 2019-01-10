const HOST = '<engine service url needs to go here>'; // without https:// and the trailing slash
const PORT = 443;

type Endpoint = {
	method: string;
	path: string;
};

type Endpoints = {
	[key: string]: Endpoint;
};

const ENDPOINTS: Endpoints = {
	'EXECUTE_SCRIPT': {
		method: 'POST',
		path: '/executeScript'
	}
};

export default {
	HOST,
	PORT,
	ENDPOINTS
};
