import ShareableJS from '@/Shareable'

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
}

export interface ShareQueryData extends Omit<ShareData, 'files'> {
    files: Array<ShareQueryFileData>
}

declare global {
    interface Window {
        ShareableJS: typeof ShareableJS
    }
}