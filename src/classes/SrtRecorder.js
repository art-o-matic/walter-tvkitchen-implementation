import { SrtGenerator } from './SrtGenerator'
import { generateSegmentFileName } from '../utils/files'
import { payloadHasData } from '../utils/payloads'

export class SrtRecorder {
	constructor({
		outDirectory = './',
		dropbox,
	} = {}) {
		this.currentSrt = null
		this.srtGenerator = new SrtGenerator(outDirectory)
		this.dropbox = dropbox
	}

	startNewRecording(segmentPayload) {
		if (this.currentSrt !== null) {
			this.finalizeCurrentRecording()
		}
		if (payloadHasData(segmentPayload)) {
			const segmentName = generateSegmentFileName(segmentPayload)
			this.currentSrt = this.srtGenerator.generateSrt(segmentName)
		}
	}

	processSrtPayload(srtPayload) {
		if (this.currentSrt !== null) {
			this.currentSrt.appendPayload(srtPayload)
		}
	}

	finalizeCurrentRecording() {
		if (!this.currentSrt.isEmpty()) {
			this.dropbox.upload(this.currentSrt.getPath())
		}
		this.currentSrt.delete()
		this.currentSrt = null
	}
}
