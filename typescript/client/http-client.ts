import * as https from 'https';
import { ClientRequest } from 'http';
import ServiceSettings from '../config/service-settings';

// Use only one signing method
// RSA strategy
import { RsaSignService } from '../security/rsa-sign-service';
// Shared secret strategy
// import { SharedSecretSignService } from './security/shared-secret-sign-service';

export namespace HttpClient {

	export function executeScript(
		payload: any
	): Promise<any> {

		return new Promise((resolve, reject) => {
			const signService: RsaSignService = new RsaSignService();
			const options: https.RequestOptions = {
				method: ServiceSettings.ENDPOINTS.EXECUTE_SCRIPT.method,
				host: ServiceSettings.HOST,
				port: ServiceSettings.PORT,
				path: ServiceSettings.ENDPOINTS.EXECUTE_SCRIPT.path,
				headers: signService.getHeaders(
					payload,
					ServiceSettings.ENDPOINTS.EXECUTE_SCRIPT.method,
					ServiceSettings.ENDPOINTS.EXECUTE_SCRIPT.path
				)
			};

			const request: ClientRequest = https.request(options, (response) => {
				if (response.statusCode < 200 || response.statusCode > 299) {
					console.log(response);
					reject(new Error('Status code: ' + response.statusCode));
				}
				const responseBody = [];
				response.on('data', (chunk) => responseBody.push(chunk));
				response.on('end', () => resolve(responseBody.join('')));
			});
			request.on('error', (err) => reject(err));
			request.write(payload);
			request.end();
		});
	}
}
