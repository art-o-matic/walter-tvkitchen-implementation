import dayjs from 'dayjs'
import { formatWalterDate } from './time'

export function payloadHasData(payload) {
	return (payload.data
	&& JSON.parse(payload.data.toString('utf8')) !== null)
}

export function getPayloadStartTime(payload) {
	return dayjs(payload.origin).add(payload.position)
}

export function srtPayloadToCaptionLines(srtPayload) {
	const srtData = srtPayload.data.toString()
	const srtStartTime = getPayloadStartTime(srtPayload)
	const lines = srtData.split('\n')
		.slice(1, -1) // The first line is the SRT timestamp and the last is empty
	return lines.map((line) => `${formatWalterDate(srtStartTime)} ${line}`)
}
