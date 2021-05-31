import fs from 'fs'
import dayjs from 'dayjs'

export function loadAndParseJsonFile(path) {
	const rawData = fs.readFileSync(path)
	const data = JSON.parse(rawData)
	return data
}

export function isEmptyFile(path) {
	const stats = fs.statSync(path)
	return stats.size === 0
}

export function generateSegmentFileName(segmentPayload) {
	const segmentStartTime = dayjs(segmentPayload.origin).add(segmentPayload.position)
	const segmentData = JSON.parse(segmentPayload.data.toString('utf8'))
	return `${segmentData.title}_caption_${segmentStartTime.format('YY-MM-DD-HH-mm-ss')}.txt`
}
