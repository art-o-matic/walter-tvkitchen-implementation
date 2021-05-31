import fs from 'fs'
import {
	isEmptyFile,
} from '../utils/files'

export class Srt {
	constructor({
		basePath = './',
		fileName,
	} = {}) {
		this.basePath = basePath
		this.fileName = fileName
		process.stdout.write(`Creating local file: ${this.getPath()}\n`)
		this.file = fs.openSync(
			`${this.getPath()}`,
			'a',
		)
	}

	appendPayload(payload) {
		fs.writeSync(this.file, payload.data)
		fs.writeSync(this.file, '\n')
	}

	getPath() {
		return `${this.basePath}/${this.fileName}`
	}

	isEmpty() {
		return isEmptyFile(this.getPath())
	}

	delete() {
		process.stdout.write(`Deleting local file: ${this.getPath()}\n`)
		return fs.unlinkSync(this.getPath())
	}
}
