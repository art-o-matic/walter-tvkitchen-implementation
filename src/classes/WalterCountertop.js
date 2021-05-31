import { Countertop } from '@tvkitchen/countertop'
import { VideoHttpIngestionAppliance } from '@tvkitchen/appliance-video-http-ingestion'
import { VideoCaptionExtractorAppliance } from '@tvkitchen/appliance-video-caption-extractor'
import {
	VideoSegmentGeneratorAppliance,
	INTERVALS,
} from '@tvkitchen/appliance-video-segment-generator'
import { CaptionSrtGeneratorAppliance } from '@tvkitchen/appliance-caption-srt-generator'
import { getLatestMondayMidnight } from '../utils/time'

export class WalterCountertop extends Countertop {
	constructor({
		station,
		tunerDevice,
		logger,
	} = {}) {
		super({ logger })
		this.station = station
		this.tunerDevice = tunerDevice
		this.init()
	}

	init() {
		const url = `${this.tunerDevice.url}/auto/v${this.station.channel}`
		const origin = getLatestMondayMidnight()
		this.addAppliance(VideoHttpIngestionAppliance, { url })
		this.addAppliance(VideoCaptionExtractorAppliance)
		this.addAppliance(VideoSegmentGeneratorAppliance, {
			interval: INTERVALS.WEEK,
			startingAt: origin.toISOString(),
			segments: this.station.getProgramSegments(),
		})
		this.addAppliance(CaptionSrtGeneratorAppliance, { includeCounter: false })
	}
}
