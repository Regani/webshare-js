import ShareableJS from '@/Shareable'

if (typeof window !== 'undefined') {
    window.ShareableJS = ShareableJS
}

export type * from '@/types'

export default ShareableJS