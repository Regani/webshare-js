import { toPng } from 'html-to-image'

import Logger from '@/Logger'

import type { Options } from 'html-to-image/lib/types'

export interface ShareData {
    files: File[]
    text?: string
    title?: string
    url?: string
}

export interface ShareQueryFileData {
    /* The title to use for the picture */
    title: string
    /* To use as querySelector to generate the picture by */
    query: string

    /* Options for the image from html-to-image library */
    imageOptions?: Options
}

export interface ShareQueryData extends Omit<ShareData, 'files'> {
    files: Array<ShareQueryFileData>
}

declare global {
    interface Window {
        WebShareJS: typeof WebShareJS
    }
}

interface WebShareOptions {
    silent?: boolean
}

class WebShareJS {
    private readonly _logger

    constructor (options?: WebShareOptions) {
        this._logger = new Logger(
            'WebShareJS',
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

        return navigator.share(shareData)
            .then(() => {
                this._logger.log('Data shared')
            })
            .catch(error => {
                this._logger.error('Error sharing data:', error.message)
            })
    }
}

if (typeof window !== 'undefined') {
    window.WebShareJS = WebShareJS
}

export default WebShareJS