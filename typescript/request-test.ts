import { HttpClient } from './client/http-client';
import * as fs from 'fs';

async function request(payload) {

	try {
		const responseBody: string = await HttpClient.executeScript(
			JSON.stringify(payload)
		);
		console.log(`Result: ${responseBody}`);
		return responseBody;
	} catch (error) {
		console.error(`Error: ${error}`);
	}
}

(async function() {
	/*
	 * Preparing payload data
	 * Example 1. Creating Product Configuration
	 */
	const newConfigurationPayload = {
		'definitionId': 'a0g1t0000009yYr',
		'containerId': 'a0b1t000000DLoG',
		'script': `function() { return { status: 'done' }; }`
	};

	const resultString = await request(newConfigurationPayload);
	const newConfigurationResult = JSON.parse(resultString);

	/*
	 * Example 2. Set Attribute value
	 */
	const attributeRef = 'Required_User_Input_0';
	const newAttributeValue = 'New value';
	const existingConfigurationPayload = {
		'configurationData': JSON.stringify(newConfigurationResult.model),
		'script': `function() {
            CS.setAttributeValue("${attributeRef}", "${newAttributeValue}");
            return { status: 'done' };
        }`,
		'persistConfiguration': true
	};

	await request(existingConfigurationPayload);

	/*
	 * Example 3. Add related product
	 */
	const payload = {
		'configurationId': 'a0e1t000000EoX3AAK',
		'script': fs.readFileSync(`${__dirname}/examples/script-example.js`, 'utf8'),
		'persistConfiguration': true
	};

	await request(payload);
})();

