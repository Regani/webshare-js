import WebShareJS, { ShareQueryData } from '../src'

const webshare = new WebShareJS({
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

        if (additionalDataTitleElement instanceof HTMLInputElement) {
            shareData.title = additionalDataTitleElement.value
        }

        if (additionalDataTextElement instanceof HTMLInputElement) {
            shareData.text = additionalDataTextElement.value
        }

        if (additionalDataUrlElement instanceof HTMLInputElement) {
            shareData.url = additionalDataUrlElement.value
        }

        console.log('Sharing data:', shareData)

        await webshare.share(shareData)
    }
)
