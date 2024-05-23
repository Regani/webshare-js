import WebShareJS from '@/WebShare'
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