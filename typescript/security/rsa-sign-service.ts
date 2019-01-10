/*
 * Preparing HTTP headers using RSA strategy
 * npm library used in this example - @cloudsense/cs-security-client
 */
import * as http from 'http';
import { BaseSignService } from './base-sign-service';
import { getRsaHeaders } from '@cloudsense/cs-security-client';
import ClientSettings from '../config/client-settings';

export class RsaSignService extends BaseSignService {
	constructor() { super(); }

	getHeaders(payload: string, method: string, path: string)
		: http.OutgoingHttpHeaders {

		return {
			...this.baseHeaders,
			...getRsaHeaders(
				path,
				payload,
				{
					privateKey: ClientSettings.PRIVATE_KEY,
					id: this.clientId
				},
				method
			)
		};
	}
}
