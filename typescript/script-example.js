async function() {

	const attributeValues = {
		'User_Input': 'OK'
	};

	const relatedProducts = [
		{
			'relatedProducts': [],
			'relatedProductName': 'Related Pro',
			'definitionId': 'a0g1t0000009xpRAAQ',
			'basketId': 'a0b1t000000DKtFAAW',
			'attributes': [{ 'name': 'User input2', 'value': 'Testing' }]
		},
		{
			'relatedProducts': [],
			'relatedProductName': 'Related Pro',
			'definitionId': 'a0g1t0000009xpRAAQ',
			'basketId': 'a0b1t000000DKtFAAW',
			'attributes': [{ 'name': 'User input2', 'value': 'Still testing' }]
		}
	];

	await setAttributesWithoutRules(attributeValues);
	return processAddOns(relatedProducts);

	async function processAddOns(addOns) {
		if (!Array.isArray(addOns) || !addOns.length) {
			return;
		}
		if (!CS || !CS.Service || !CS.Service.config) {
			return { error: 'CS Service is not initialized.'};
		}

		for (let addOn of addOns) {
			let relatedProduct = findRelatedProductById(addOn.configurationId);
			if (!relatedProduct) {
				try {
					relatedProduct = await CS.Service.addRelatedProduct(
						CS.Util.generateReference(addOn.relatedProductName, ''),
						addOn.definitionId,
						true
					);
				} catch(error) {
					console.error(error);
					continue;
				}
			}
			await setAttributes(relatedProduct.reference, addOn.attributes);
		}

		CS.Rules.rulesSuspended(false);

		return CS.Rules.evaluateAllRules();
	}

	function findRelatedProductById(configurationId) {
		if (configurationId) {
			const relatedProduct = Object.values(CS.Service.config).find((att) => {
				if (att.config && att.config.Id === configurationId) {
					return att;
				}
			});

			return relatedProduct;
		}
	}

	async function setAttributes(reference, attributes) {
		if (attributes) {
			for (let att of attributes) {
				const ref = CS.Util.generateReference(att.name, { ref: reference });
				try {
					await CS.setAttribute(ref, att.value, true);
				} catch (error) {
					console.log(error);
				}
			}
		}
	}

	async function setAttributesWithoutRules(attributeValues) {
		if (attributeValues) {
			const attributes = Object.keys(attributeValues).map(e => {
				return { name: e, value: attributeValues[e] };
			});

			return await setAttributes('', attributes);
		}
	}
}
