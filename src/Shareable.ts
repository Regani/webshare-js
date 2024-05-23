import { toPng } from 'html-to-image'

import Logger from '@/Logger'

import { ShareQueryData, ShareData, ShareQueryFileData } from '@/types'

interface ShareableOptions {
    silent?: boolean
}

export default class ShareableJS {
    private readonly _logger

    constructor (options?: ShareableOptions) {
        this._logger = new Logger(
            'ShareableJS',
            options?.silent
        )
    }

    public sharingSupported () {
        return navigator.share !== undefined && navigator.canShare !== undefined
    }

    public canShare (shareData: ShareData) {
        return this.sharingSupported() && navigator.canShare(shareData)
    }

    private getHtmlElement (query: string) {
        const element = document.querySelector(query)

        if (element instanceof HTMLElement) {
            return element
        }

        return null
    }

    private async buildFile (file: ShareQueryFileData) {
        this._logger.log('Generating file:', file.query)

        const element = this.getHtmlElement(file.query)

        this._logger.log('Element:', element)

        if (!element || !(element instanceof HTMLElement)) {
            this._logger.error('Element not found')

            return
        }

        this._logger.log('Element found, generating blob')

        const dataUrl = await toPng(
            element,
            file.imageOptions
        )

        const response = await fetch(dataUrl)
        const blob = await response.blob()

        this._logger.log('Blob:', blob)

        return new File(
            [ blob ],
            `${file.title}.png`,
            {
                type: 'image/png',
                lastModified: new Date().getTime()
            }
        )
    }

    public async share (data: ShareQueryData) {
        if (!this.sharingSupported()) {
            this._logger.error('Sharing not supported')

            return
        }

        const shareData: ShareData = {
            files: [],
            text: data.text,
            title: data.title,
            url: data.url
        }

        this._logger.log('Sharing data:', shareData)

        for (const file of data.files) {
            const generatedFile = await this.buildFile(file)

            if (generatedFile) {
                shareData.files.push(generatedFile)
            }
        }

        if (!this.canShare(shareData)) {
            this._logger.error('Cannot share the data')

            return
        }

        this._logger.log('Sharing data:', shareData)

        navigator.share(shareData)
            .then(() => {
                this._logger.log('Data shared')
            })
            .catch(error => {
                this._logger.error('Error sharing data:', error.message)
            })
    }
}