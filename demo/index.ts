import WebShareJS, { ShareQueryData } from '../src'


import { toPng } from 'html-to-image'

const testButtonEl = document.getElementById('test')
const generateContentEl = document.querySelector('#generateContent')
const imageEl = document.getElementById('imageToHaveData')
console.log('generateContentEl', generateContentEl)
if (generateContentEl instanceof HTMLElement) {
    testButtonEl?.addEventListener(
        'click',
        async () => {
            console.log('on click')
            const dataUrl = await toPng(
                generateContentEl,
                {}
            )

            console.log('Data URL:', dataUrl)

            const response = await fetch(dataUrl)
            const blob = await response.blob()
            console.log('Blob:', blob)
            const file = new File(
                [ blob ],
                'prikol.png',
                {
                    type: 'image/png',
                    lastModified: new Date().getTime()
                }
            )

            console.log('File:', file)

            imageEl?.setAttribute('src', URL.createObjectURL(file))
        }
    )
}

const webshare = new WebShareJS({
    silent: true
})

const generateContentSelector = '#generateContent'
const shareAdditionalDataFormSelector = '#shareAdditionalData'

const shareAdditionalDataFormElement = document.querySelector(shareAdditionalDataFormSelector)
const additionalDataTitleElement = document.querySelector(shareAdditionalDataFormSelector + ' #title')
const additionalDataTextElement = document.querySelector(shareAdditionalDataFormSelector + ' #text')
const additionalDataUrlElement = document.querySelector(shareAdditionalDataFormSelector + ' #url')

shareAdditionalDataFormElement?.addEventListener(
    'submit',
    async (e) => {
        e.preventDefault()

        const shareData: ShareQueryData = {
            files: [
                {
                    query: generateContentSelector,
                    title: 'Generated content'
                }
            ]
        }

        if (additionalDataTitleElement instanceof HTMLInputElement && additionalDataTitleElement.value) {
            shareData.title = additionalDataTitleElement.value
        }

        if (additionalDataTextElement instanceof HTMLInputElement && additionalDataTextElement.value) {
            shareData.text = additionalDataTextElement.value
        }

        if (additionalDataUrlElement instanceof HTMLInputElement && additionalDataUrlElement.value) {
            shareData.url = additionalDataUrlElement.value
        }

        console.log('Sharing data:', shareData)

        await webshare.share(shareData)
    }
)







































