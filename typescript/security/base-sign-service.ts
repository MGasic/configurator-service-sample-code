import * as http from 'http';
import ClientSettings from '../config/client-settings';

export abstract class BaseSignService {
	protected clientId: string;
	protected orgId: string;
	protected baseHeaders: http.OutgoingHttpHeaders;

	protected constructor() {
		this.clientId = ClientSettings.CLIENT_ID;
		this.orgId = ClientSettings.ORG_ID;
		this.baseHeaders = {
			'Organization': this.orgId,
			'Content-Type': 'application/json'
		};
	}

	abstract getHeaders(payload?: string, method?: string, path?: string)
		: http.OutgoingHttpHeaders;
}
