export function payloadHasData(payload) {
	return (payload.data
	&& JSON.parse(payload.data.toString('utf8')) !== null)
}
