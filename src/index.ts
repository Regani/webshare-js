import WebShareJS from '@/WebShare'

if (typeof window !== 'undefined') {
    window.WebShareJS = WebShareJS
}

export type * from '@/types'

export default WebShareJS