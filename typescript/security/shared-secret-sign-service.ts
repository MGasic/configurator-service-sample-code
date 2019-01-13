/*
 * Preparing HTTP headers using shared secret strategy
 * npm library used in this example - @cloudsense/cs-security-client
 */
import * as http from 'http';
import { BaseSignService } from './base-sign-service';
import { getSharedHeaders } from '@cloudsense/cs-security-client';
import ClientSettings from '../config/client-settings';

export class SharedSecretSignService extends BaseSignService {
	constructor() { super(); }

	getHeaders(payload: string, method: string, path: string)
		: http.OutgoingHttpHeaders {
		return {
			...this.baseHeaders,
			...getSharedHeaders(
				path,
				payload,
				{
					secret: ClientSettings.CLIENT_SECRET,
					id: this.clientId
				},
				method
			)
		};
	}
}
