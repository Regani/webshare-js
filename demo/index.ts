import ShareableJS, { ShareQueryData } from '../src'

const shareable = new ShareableJS({
    silent: false
})

const generateContentSelector = '#generateContent'
const shareAdditionalDataSelector = '#shareAdditionalData'

const shareButton = document.getElementById('shareButton')
const additionalDataTitleElement = document.querySelector(shareAdditionalDataSelector + ' #title')
const additionalDataTextElement = document.querySelector(shareAdditionalDataSelector + ' #text')
const additionalDataUrlElement = document.querySelector(shareAdditionalDataSelector + ' #url')

shareButton?.addEventListener(
    'click',
    async () => {
        const shareData: ShareQueryData = {
            files: [
                {
                    query: generateContentSelector,
                    title: 'Generated content'
                }
            ]
        }

        const title = additionalDataTitleElement?.textContent
        const text = additionalDataTextElement?.textContent
        const url = additionalDataUrlElement?.textContent

        if (title) {
            shareData.title = title
        }

        if (text) {
            shareData.text = text
        }

        if (url) {
            shareData.url = url
        }

        await shareable.share(shareData)
    }
)
